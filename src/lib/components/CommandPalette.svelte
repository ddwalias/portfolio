<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navLinks } from '$lib/config';

	let isOpen = $state(false);
	let search = $state('');
	let selectedIndex = $state(0);

	let filtered = $derived(
		navLinks.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
	);

	function toggle() {
		isOpen = !isOpen;
		if (isOpen) {
			search = '';
			selectedIndex = 0;
		}
	}

	function navigate(href: string) {
		isOpen = false;
		goto(href);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			toggle();
		}
		if (!isOpen) return;
		if (e.key === 'Escape') {
			isOpen = false;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % filtered.length;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
		}
		if (e.key === 'Enter' && filtered[selectedIndex]) {
			navigate(filtered[selectedIndex].href);
		}
	}

	function autofocus(node: HTMLElement) {
		node.focus();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if isOpen}
	<!-- Backdrop -->
	<button
		class="fixed inset-0 z-[100] h-full w-full cursor-default border-none bg-black/60 backdrop-blur-sm outline-none"
		onclick={() => (isOpen = false)}
		aria-label="Close command palette"
		tabindex="-1"
	></button>

	<!-- Palette -->
	<div
		class="fixed top-1/4 left-1/2 z-[101] w-full max-w-md -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/40"
	>
		<div class="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="text-[var(--color-muted)]"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</svg>
			<input
				use:autofocus
				bind:value={search}
				type="text"
				placeholder="Where to?"
				class="flex-1 bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]"
			/>
			<kbd
				class="rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
				>esc</kbd
			>
		</div>

		<ul class="max-h-64 overflow-y-auto p-2">
			{#each filtered as item, i}
				<li>
					<button
						onclick={() => navigate(item.href)}
						class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors
						{i === selectedIndex
							? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
							: 'text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]'}"
					>
						<span class="font-mono text-[10px] tracking-wider uppercase opacity-50"> / </span>
						{item.label}
					</button>
				</li>
			{/each}
			{#if filtered.length === 0}
				<li class="px-3 py-6 text-center text-sm text-[var(--color-muted)]">Nothing here.</li>
			{/if}
		</ul>
	</div>
{/if}
