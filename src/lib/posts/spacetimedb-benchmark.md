---
title: SpacetimeDB Is Fast — But Their Benchmark Doesn't Prove It
date: 2026-03-11
excerpt: SpacetimeDB claims 1,000x faster performance, but their keynote-2 benchmark conflates language overhead, transport protocols, and storage models. I built a fairer benchmark — and SpacetimeDB still wins.
---

Last month, SpacetimeDB released this banger of [a video](https://youtu.be/C7gJ_UxVnSk). Cool marketing, I like it. But as a developer, I somehow can't believe the benchmark numbers they're showing at the end of the video. Node.js + Postgres can only do 4,000 TPS? Something's not right.

I've been using Postgres for years, and I've never seen it perform that poorly. I've also never seen a benchmark that compares a database to a backend. It's like comparing apples to oranges.

So I dug into the benchmark code and found a few things that I think are unfair, and in the end I built [a fairer benchmark](https://github.com/ddwalias/spacetimedb-bench) to prove my point.

## The original benchmark

![original benchmark](/spacetimedb-original-benchmark.png)

The keynote-2 benchmark compares SpacetimeDB, an integrated database and backend platform, against Node.js + PostgreSQL, Supabase, Convex, and CockroachDB using a bank-transfer scenario. On the surface, this sounds reasonable. But let's dig into the code to understand what is actually being measured.

### Rust Client vs. Node.js Script

Looking through the code, we see a big red flag.

```rust
async function runBenchmark(system: ConnectorKey): Promise<BenchResult | null> {
  if (system === 'spacetimedbRustClient') {
    return await runBenchmarkStdb();
  } else {
    return await runBenchmarkOther(system);
  }
}
```

SpacetimeDB benchmark client is different from the rest. In fact, SpacetimeDB benchmark client is a compiled rust client, while all of the other uses an in-process Node.js script. This isn't just comparing backend + database, it's comparing the entire client-side stack too.

Rust's async runtime, memory management, and compiled binary performance give it a massive advantage in raw throughput before the request even hits the server. A fair benchmark would have to use **the same client language** for all targets.

### WebSocket vs. HTTP

SpacetimeDB uses a **persistent WebSocket connection** — one handshake, then a stream of binary messages. The competitors use **HTTP** — a new TCP connection (or at best, a keep-alive reuse) with full HTTP headers on every request.

SpacetimeDB actually has an HTTP mode. However, they clearly didn't do that. I wonder why.

### Warmup Asymmetry

The SpacetimeDB benchmark includes a **warmup phase** for the Rust client — JIT optimization, connection pooling, and memory allocation all happen before measurement begins. The Node.js benchmarks have **no equivalent warmup period**.

### Single Query ≠ Transaction

```typescript
await client.query('BEGIN');

const rowsResult = await client.query<{ id: number; balance: string }>({
    name: PREPARED.transferSelectForUpdate.name,
    text: PREPARED.transferSelectForUpdate.text,
    values: [fromId, toId],
});
const rows = rowsResult.rows;

if (rows.length !== 2) {
    throw new Error('account_missing');
}

const [first, second] = rows;
const fromRow = first.id === fromId ? first : second;
const toRow = first.id === fromId ? second : first;
const fromBalance = BigInt(fromRow.balance);

if (fromBalance >= delta) {
    const toBalance = BigInt(toRow.balance);

    await client.query({
    name: PREPARED.transferUpdateBalance.name,
    text: PREPARED.transferUpdateBalance.text,
    values: [(fromBalance - delta).toString(), fromId],
    });

    await client.query({
    name: PREPARED.transferUpdateBalance.name,
    text: PREPARED.transferUpdateBalance.text,
    values: [(toBalance + delta).toString(), toId],
    });
}

await client.query('COMMIT');
```

SpacetimeDB reducers run an **atomic transaction** by design: read two rows, validate, update two rows — all in one single atomic call.

```typescript
export const transfer = spacetimedb.reducer(
  { from: t.u32(), to: t.u32(), amount: t.u32() },
  (ctx, { from, to, amount: amt }) => {
    const accounts = ctx.db.account;
    const byId = accounts.id;

    const fromRow = byId.find(from)!;
    const toRow = byId.find(to)!;

    const amount = BigInt(amt);
    if (fromRow.balance < amount) {
      throw new SenderError('insufficient_funds');
    }

    byId.update({
      id: from,
      balance: fromRow.balance - amount,
    });

    byId.update({
      id: to,
      balance: toRow.balance + amount,
    });
  },
);
```

However, for the postgres RPC server, they have to execute multiple network hops in order to start a transaction, validates, runs two `UPDATE` statements, and commits. There are really unneccessary and can be done with a single network hops.

## A Fairer Benchmark

Well, I really not sastisfy with the number they're showing in the original benchmark. However my guts told me that SpacetimeDB should still be faster than the traditional server + database infrastructure. So I built a benchmark to verify it.

My benchmark controls for these variables by organizing comparisons into **groups that share the same language and transport protocol**:

| Group | Targets |
|-------|---------|
| **I. TypeScript + HTTP** | Node.js + Postgres, SpacetimeDB (TS reducer), Bun + Postgres |
| **II. TypeScript + WebSocket** | Node.js + Postgres, SpacetimeDB (TS reducer), Bun + Postgres |
| **III. Rust + HTTP** | Rust + Postgres, SpacetimeDB (Rust reducer) |
| **IV. Rust + WebSocket** | Rust + Postgres, SpacetimeDB (Rust reducer) |

### What's the same across all targets

- **Same Rust benchmark runner** for every target — no client-side language bias
- **Same bank-transfer scenario** — 100K accounts, Zipf-distributed selection, balance check + two updates
- **Same concurrency level** — identical number of concurrent connections
- **Same machine** — all services run in Docker on the same host
- SpacetimeDB uses both **TypeScript and Rust modules**, compared against servers in the **matching language**
- PostgreSQL competitors use the exact same **single-statement transfer query** (CTE with `SELECT FOR UPDATE` + `UPDATE`)

### What we're actually measuring

Each group isolates one variable: **the database/server architecture**. Within a group, the language overhead and transport protocol are identical. The only difference is whether your data lives in SpacetimeDB or PostgreSQL behind a thin server.

## The Results

Here are the results with **16 concurrent connections** over **10 seconds**:

| Target | TPS | Mean | p50 | p99 | Max |
|--------|-----|------|-----|-----|-----|
| **TypeScript + HTTP** | | | | | |
| node-http | 10,193 | 1.56ms | 1.43ms | 3.91ms | 53ms |
| stdb-ts-http | 26,099 | 0.61ms | 0.50ms | 1.97ms | 212ms |
| bun-http | 10,732 | 1.49ms | 1.43ms | 2.83ms | 5ms |
| **TypeScript + WebSocket** | | | | | |
| node-ws | 5,676 | 1.24ms | 1.03ms | 3.13ms | 48ms |
| stdb-ts-ws | 51,870 | 0.31ms | 0.22ms | 1.69ms | 125ms |
| bun-ws | 7,351 | 1.15ms | 1.08ms | 2.81ms | 17ms |
| **Rust + HTTP** | | | | | |
| rust-http | 21,112 | 0.75ms | 0.73ms | 1.65ms | 4ms |
| stdb-rust-http | 29,598 | 0.54ms | 0.52ms | 0.94ms | 3ms |
| **Rust + WebSocket** | | | | | |
| rust-ws | 20,578 | 0.78ms | 0.75ms | 1.22ms | 4ms |
| stdb-rust-ws | 61,399 | 0.26ms | 0.24ms | 0.50ms | 41ms |

## What the Numbers Actually Say

**SpacetimeDB is genuinely fast.** In every comparison group, it outperforms the traditional architecture. But the story is more nuanced than "1,000x faster":

- **TypeScript + HTTP**: SpacetimeDB is **~2.5x** faster than Node.js/Bun + Postgres
- **TypeScript + WebSocket**: SpacetimeDB is **~7–9x** faster than Node.js/Bun + Postgres
- **Rust + HTTP**: SpacetimeDB is **~1.4x** faster than Rust + Postgres
- **Rust + WebSocket**: SpacetimeDB is **~3x** faster than Rust + Postgres

The advantage is real, particularly over WebSocket where SpacetimeDB's architecture truly shines — no network hop to a separate database means dramatically lower latency. But the gap shrinks significantly when you use the same language and transport protocol for the comparison.

### Why the WebSocket advantage is larger

SpacetimeDB's WebSocket numbers are disproportionately better because its architecture eliminates the biggest bottleneck: **the network round-trip between application server and database**. Over HTTP, both sides pay similar overhead. Over WebSocket, SpacetimeDB's co-located compute model means it only pays the cost of an in-memory function call, while the traditional stack still has to round-trip to PostgreSQL.

### The Rust vs. TypeScript gap

When SpacetimeDB runs a **Rust reducer**, the advantage over a Rust+Postgres server is modest (~1.4x over HTTP). This tells us something important: **when the application layer is already fast (compiled Rust), the bottleneck shifts to database I/O** — which is where SpacetimeDB's in-memory architecture gives its irreducible advantage.

When running a **TypeScript reducer**, SpacetimeDB's advantage is larger because it eliminates both the language overhead gap *and* the database network hop.

## The Durability Question

The elephant in the room: **SpacetimeDB operates in-memory**, while PostgreSQL persists to disk. This benchmark runs Postgres with `synchronous_commit=off` to be as charitable as possible, but WAL writes still happen, and `fsync` is still on.

SpacetimeDB does write commitlogs, but the hot path is memory. If you need ACID durability guarantees on every commit, the performance comparison shifts. This is a legitimate architectural tradeoff, not a flaw — but the original benchmark doesn't acknowledge it.

## Try It Yourself

The entire benchmark is open source and runs with a single `docker compose up`:

```bash
# Start everything
docker compose up -d

# Publish SpacetimeDB modules & init Postgres
docker compose --profile setup up spacetimedb-setup

# Run all benchmarks
cargo run --release -- --group all --seconds 10 --concurrency 16
```

The benchmark runner is written in Rust and uses the [rlt](https://github.com/wfxr/rlt) load testing library for accurate percentile measurements.

**Repository**: [github.com/ddwalias/spacetimedb-bench](https://github.com/ddwalias/spacetimedb-bench)

## Conclusion

SpacetimeDB's architecture offers genuine advantages — eliminating the application-to-database network hop is a real performance win, especially for latency-sensitive workloads. But claiming "1,000x faster" based on a benchmark that compares a Rust WebSocket client against a Node.js HTTP script is like benchmarking a Ferrari against a bicycle and claiming cars are 100x faster than all other vehicles.

**A fair benchmark still shows SpacetimeDB winning** — by 1.4x to 9x depending on the comparison group. That's a compelling story on its own. It doesn't need the unfair framing.
