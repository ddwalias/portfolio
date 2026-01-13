<script>
	let navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Work', href: '/work' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' }
	];
</script>

<header
	class="relative z-10 mb-12 flex items-center justify-between border-b border-[var(--color-border)] py-6 backdrop-blur-sm"
>
	<a
		href="/"
		class="font-mono text-lg font-bold tracking-tight transition-colors hover:text-[var(--color-muted)]"
	>
		Portfolio
	</a>

	<nav class="scrollbar-hide -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
		<ul class="flex gap-6 whitespace-nowrap">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
