<script lang="ts">
	import { siteConfig } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let latestPost = $derived(data.posts[0]);
	let latestDate = $derived(
		latestPost
			? new Date(latestPost.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short'
				})
			: ''
	);
</script>

<div class="section-enter flex min-h-[100dvh] flex-col items-center justify-center px-6">
	<div class="w-full max-w-lg">
		<!-- Name -->
		<h1
			class="mb-3 text-5xl font-bold tracking-tight sm:text-6xl"
			style="font-family: var(--font-serif);"
		>
			{siteConfig.author}
		</h1>
		<p class="mb-20 text-sm text-[var(--color-muted)]">
			{siteConfig.description}
		</p>

		<!-- Index -->
		<nav class="mb-16">
			<a href="/about" class="index-item">
				<span class="index-number">01</span>
				<span class="index-label">About</span>
			</a>
			<a href="/experience" class="index-item">
				<span class="index-number">02</span>
				<span class="index-label">Experience</span>
			</a>
			<a href="/blog" class="index-item">
				<span class="index-number">03</span>
				<span class="index-label">Blog</span>
			</a>
			<a href="/now" class="index-item">
				<span class="index-number">04</span>
				<span class="index-label">Now</span>
			</a>
		</nav>

		<!-- Latest post -->
		{#if latestPost}
			<div class="mb-16">
				<p class="mb-3 font-mono text-[10px] tracking-wider text-[var(--color-muted)] uppercase">
					Latest
				</p>
				<a
					href="/blog/{latestPost.slug}"
					class="group flex items-baseline justify-between gap-4 transition-colors"
				>
					<span
						class="text-sm text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-foreground)]"
					>
						{latestPost.title}
					</span>
					<span
						class="shrink-0 font-mono text-xs text-[var(--color-border)] transition-colors group-hover:text-[var(--color-muted)]"
					>
						{latestDate}
					</span>
				</a>
			</div>
		{/if}

		<!-- Status -->
		<div class="space-y-2 text-xs text-[var(--color-muted)]">
			<div class="mb-4 h-px w-8 bg-[var(--color-border)]"></div>
			<p>Currently at <span class="text-[var(--color-foreground)]">AS White Global</span></p>
			<p class="flex items-center gap-2">
				<span class="relative flex h-1.5 w-1.5">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-75 duration-[2000ms]"
					></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"
					></span>
				</span>
				Open to work
			</p>
			<a
				href="mailto:hddang219@gmail.com"
				class="inline-block transition-colors hover:text-[var(--color-primary)]"
			>
				hddang219@gmail.com
			</a>
		</div>
	</div>
</div>
