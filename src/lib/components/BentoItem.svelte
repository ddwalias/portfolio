<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		span?: string;
		className?: string;
		children: Snippet;
	}

	let { title, span = '', className = '', children }: Props = $props();
</script>

<div
	class="spotlight-border {span} {className} group relative flex h-full flex-col rounded-xl border-2 border-[var(--color-border)] bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-[0_0_20px_var(--color-primary-glow)]"
>
	<!-- HUD Corners -->

	{#if title}
		<h3 class="mb-4 font-mono text-xs font-bold tracking-wider text-[var(--color-muted)] uppercase">
			{title}
		</h3>
	{/if}

	<div class="flex-1">
		{@render children()}
	</div>
</div>
