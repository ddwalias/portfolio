<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
	let copied = $state(false);

	function copy() {
		navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<button
	onclick={copy}
	class="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded border border-[var(--color-border)] bg-black/50 text-[var(--color-muted)] backdrop-blur transition-all group-hover:opacity-100 hover:bg-[var(--color-primary)] hover:text-white sm:opacity-0"
	aria-label="Copy code"
>
	{#if copied}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
		</svg>
	{/if}
</button>
