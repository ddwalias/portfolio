<script>
	let { title, date, excerpt, slug } = $props();

	// Format date nicely
	let formattedDate = $derived(
		new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<a href={`/blog/${slug}`} class="group mb-6 block">
	<article
		class="spotlight-border rounded-xl border border-[var(--color-border)] p-5 transition-all duration-300 hover:bg-white/[0.02] hover:shadow-[0_0_15px_var(--color-primary-glow)]"
	>
		<div class="mb-3 flex items-center justify-between">
			<time datetime={date} class="font-mono text-xs text-[var(--color-muted)]">
				{formattedDate}
			</time>
			<span
				class="font-mono text-xs text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100"
			>
				Read Post ->
			</span>
		</div>

		<h2
			class="mb-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--color-primary)]"
		>
			{title}
		</h2>

		<p class="line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
			{excerpt}
		</p>
	</article>
</a>
