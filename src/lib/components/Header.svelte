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

	<nav>
		<ul class="flex gap-6">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
