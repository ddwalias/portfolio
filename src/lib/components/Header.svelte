<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Work', href: '/work' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' }
	];

	let showHeader = true;
	let lastScrollY = 0;

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Show header if scrolling up or at the very top
			if (currentScrollY < lastScrollY || currentScrollY < 50) {
				showHeader = true;
			}
			// Hide header if scrolling down and past threshold
			else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
				showHeader = false;
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Helper to check if link is active
	function isActive(href) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}
</script>

<header
	class="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[var(--color-border)] bg-black/50 p-1.5 px-3 shadow-lg shadow-black/20 backdrop-blur-md transition-transform duration-300 {showHeader
		? 'translate-y-0'
		: '-translate-y-[200%]'}"
>
	<nav>
		<ul class="flex items-center gap-1">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="relative block rounded-full px-4 py-2 font-mono text-xs font-medium transition-all duration-300 {isActive(
							item.href
						)
							? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[0_0_10px_rgba(6,182,212,0.2)]'
							: 'text-[var(--color-muted)] hover:bg-white/5 hover:text-white'}"
					>
						{item.label}
						{#if isActive(item.href)}
							<span
								class="absolute -bottom-1 left-1/2 h-px w-1/2 -translate-x-1/2 bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"
							></span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
