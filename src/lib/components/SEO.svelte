<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
	}

	let { title = 'Portfolio', description = 'A technical minimalist portfolio.' }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
