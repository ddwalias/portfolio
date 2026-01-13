<script>
	import { goto } from '$app/navigation';

	let open = $state(false);
	let query = $state('');
	let selectedIndex = $state(0);

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'Work', href: '/work' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/#connect' }
	];

	let filteredLinks = $derived(
		links.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
	);

	function handleKeydown(e) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			open = !open;
		}

		if (!open) return;

		if (e.key === 'Escape') {
			open = false;
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % filteredLinks.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + filteredLinks.length) % filteredLinks.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const link = filteredLinks[selectedIndex];
			if (link) {
				goto(link.href);
				open = false;
			}
		}
	}

	$effect(() => {
		if (!open) {
			query = '';
			selectedIndex = 0;
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm transition-all"
		onclick={() => (open = false)}
	>
		<div
			class="animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl duration-200"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="flex items-center border-b border-[var(--color-border)] px-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="mr-3 text-[var(--color-muted)]"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" x2="16.65" y1="21" y2="16.65"></line>
				</svg>
				<input
					bind:value={query}
					class="flex-1 bg-transparent py-4 text-sm placeholder-[var(--color-muted)] focus:outline-none"
					placeholder="Type a command or search..."
					autofocus
				/>
				<kbd
					class="hidden rounded border border-[var(--color-border)] bg-[#1e1e1e] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)] sm:inline-block"
				>
					ESC
				</kbd>
			</div>

			<div class="max-h-[60vh] overflow-y-auto p-2">
				{#if filteredLinks.length === 0}
					<div class="py-10 text-center text-sm text-[var(--color-muted)]">No results found.</div>
				{:else}
					{#each filteredLinks as link, i}
						<button
							class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors
                            {i === selectedIndex
								? 'bg-[var(--color-primary)] text-white'
								: 'text-[var(--color-foreground)] hover:bg-[#1e1e1e]'}"
							onclick={() => {
								goto(link.href);
								open = false;
							}}
							onmouseenter={() => (selectedIndex = i)}
						>
							<span>{link.label}</span>
							{#if i === selectedIndex}
								<span class="text-xs opacity-70">Jump to</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>

			<div class="border-t border-[var(--color-border)] bg-[#1e1e1e]/50 px-4 py-2">
				<div class="flex gap-2 text-[10px] text-[var(--color-muted)]">
					<span>Navigation</span>
				</div>
			</div>
		</div>
	</div>
{/if}
