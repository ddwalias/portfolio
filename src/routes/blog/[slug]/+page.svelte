<script>
	let { data } = $props();

	const { title, date } = data.meta;

	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<article>
	<header class="mb-10 text-center">
		<time class="mb-2 block text-sm text-[var(--color-muted)]">{formattedDate}</time>
		<h1 class="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h1>
	</header>

	<div class="prose prose-invert prose-lg mx-auto">
		<svelte:component this={data.content} />
	</div>
</article>
