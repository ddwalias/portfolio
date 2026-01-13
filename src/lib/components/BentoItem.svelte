<script>
	let { title, class: className = '', children, span = 'col-span-1' } = $props();
</script>

<div
	class="{span} {className} group relative flex flex-col overflow-hidden border border-[var(--color-border)] bg-black/20 p-6 backdrop-blur-sm transition-all hover:border-white/40"
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
