<script>
	const year = new Date().getFullYear();
</script>

<footer
	class="mt-20 flex items-center justify-between border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]"
>
	<div>
		&copy; {year} Your Name.
	</div>
	<div class="flex gap-4">
		<a
			href="https://twitter.com"
			target="_blank"
			rel="noopener noreferrer"
			class="transition-colors hover:text-[var(--color-foreground)]">Twitter</a
		>
		<a
			href="https://github.com"
			target="_blank"
			rel="noopener noreferrer"
			class="transition-colors hover:text-[var(--color-foreground)]">GitHub</a
		>
	</div>
</footer>
