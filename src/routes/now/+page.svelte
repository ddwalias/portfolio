<svelte:head>
	<title>Now | Duy Dang</title>
</svelte:head>

<div class="section-enter mx-auto max-w-2xl px-6 pt-24 pb-20">
	<h1 class="mb-2 text-2xl font-semibold tracking-tight">Now</h1>
	<p class="mb-1 font-mono text-xs text-[var(--color-muted)]">Updated February 2026</p>
	<div class="mb-10 h-px w-8 bg-[var(--color-border)]"></div>

	<div class="prose prose-invert">
		<h2>Building</h2>
		<ul>
			<li>Internal dashboard at work with ASP.NET Core + React + SQL Server</li>
			<li>A data structure library in Rust</li>
			<li>This portfolio — you're looking at it!</li>
		</ul>

		<h2>Thinking about</h2>
		<ul>
			<li>How AI will change the way we build software (and how to adapt)</li>
			<li>Getting better at writing — not code, actual words</li>
		</ul>
	</div>
</div>

<div class="mx-auto max-w-2xl px-6">
	<footer class="border-t border-[var(--color-border)] py-8">
		<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
			<p>© {new Date().getFullYear()} Duy Dang</p>
		</div>
	</footer>
</div>
