<script lang="ts">
	import { siteConfig } from '$lib/config';

	interface Props {
		title?: string;
		description?: string;
	}

	let { title = siteConfig.title, description = siteConfig.description }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
