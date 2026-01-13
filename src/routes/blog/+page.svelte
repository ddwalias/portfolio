<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="mb-12 text-4xl font-bold tracking-tight">Blog</h1>

<div class="space-y-2">
	{#each data.posts as post}
		<PostCard {...post} />
	{/each}
</div>
