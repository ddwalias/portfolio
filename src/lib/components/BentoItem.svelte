<script>
	let { title, class: className = '', children, span = 'col-span-1' } = $props();
</script>

<div
	class="spotlight-border {span} {className} group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary-glow)]"
>
	{#if title}
		<h3 class="mb-4 font-mono text-xs font-bold tracking-wider text-[var(--color-muted)] uppercase">
			{title}
		</h3>
	{/if}

	<div class="flex-1">
		{@render children()}
	</div>
</div>
