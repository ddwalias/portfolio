<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
	<h1 class="font-mono text-9xl font-bold tracking-tighter text-[var(--color-primary)] opacity-80">
		404
	</h1>
	<p class="mt-4 font-mono text-xl text-[var(--color-muted)]">Signal Lost.</p>
	<p class="mt-2 text-[var(--color-muted)]">
		The requested transmission at <code class="rounded bg-white/10 px-1 py-0.5"
			>{$page.url.pathname}</code
		> could not be established.
	</p>

	<a
		href="/"
		class="mt-8 rounded-full border border-[var(--color-border)] px-6 py-2 font-mono text-sm transition-colors hover:bg-white/10 hover:text-white"
	>
		Return to Source ->
	</a>
</div>
