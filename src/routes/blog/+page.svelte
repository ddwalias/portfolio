<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Duy Dang</title>
</svelte:head>

<div class="section-enter mx-auto max-w-2xl px-6 pt-24 pb-20">
	<h1 class="mb-2 text-2xl font-semibold tracking-tight">Blog</h1>
	<div class="mb-10 h-px w-8 bg-[var(--color-border)]"></div>

	<div class="divide-y divide-[var(--color-border)]">
		{#each data.posts as post}
			<PostCard {...post} />
		{/each}
	</div>
</div>

<div class="mx-auto max-w-2xl px-6">
	<footer class="border-t border-[var(--color-border)] py-8">
		<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
			<p>© {new Date().getFullYear()} Duy Dang</p>
		</div>
	</footer>
</div>
