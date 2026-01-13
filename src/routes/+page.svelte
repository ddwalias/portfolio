<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import BentoItem from '$lib/components/BentoItem.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div
	class="animate-in fade-in slide-in-from-bottom-4 mb-20 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 duration-700 md:grid-cols-3"
>
	<!-- Bio - Large -->
	<BentoItem span="md:col-span-2" title="About">
		<div class="flex h-full flex-col justify-center">
			<h1 class="mb-4 text-3xl leading-tight font-bold tracking-tight text-balance">
				<span class="text-[var(--color-primary)]">Engineering precision.</span><br />
				<span class="text-[var(--color-muted)]">Design clarity.</span>
			</h1>
			<p class="max-w-prose text-base leading-relaxed font-light text-[var(--color-muted)]">
				I build clean, performant web interfaces and write about the process. Focused on simplicity,
				robust architecture, and user experience.
			</p>
		</div>
	</BentoItem>

	<!-- Role / Status -->
	<BentoItem title="Current Focus">
		<div class="flex h-full min-h-[140px] flex-col justify-between">
			<div>
				<div class="text-2xl font-bold">Senior Engineer</div>
				<div class="text-sm text-[var(--color-muted)]">@TechCorp</div>
			</div>
			<div class="mt-4 flex items-center gap-2">
				<span class="relative flex h-2.5 w-2.5">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
				</span>
				<span class="font-mono text-xs text-green-500">Available for projects</span>
			</div>
		</div>
	</BentoItem>

	<!-- Tech Stack -->
	<BentoItem title="Toolkit">
		<div class="flex flex-wrap content-start gap-2">
			{#each ['Svelte', 'TypeScript', 'Tailwind', 'Rust', 'Node.js'] as tech}
				<span
					class="rounded border border-[var(--color-border)] bg-white/5 px-2 py-1 font-mono text-xs text-[var(--color-foreground)] transition-colors hover:border-white/20"
				>
					{tech}
				</span>
			{/each}
		</div>
	</BentoItem>

	<!-- Socials -->
	<BentoItem span="md:col-span-2" title="Connect">
		<div class="flex h-full flex-wrap items-center gap-x-6 gap-y-2">
			<a
				href="https://github.com"
				class="group/link flex items-center gap-1 font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
			>
				GitHub <span class="transition-transform group-hover/link:translate-x-0.5">-></span>
			</a>
			<a
				href="https://twitter.com"
				class="group/link flex items-center gap-1 font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
			>
				Twitter <span class="transition-transform group-hover/link:translate-x-0.5">-></span>
			</a>
			<a
				href="mailto:hello@example.com"
				class="group/link flex items-center gap-1 font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-white"
			>
				Email <span class="transition-transform group-hover/link:translate-x-0.5">-></span>
			</a>
		</div>
	</BentoItem>
</div>

<section class="animate-in fade-in slide-in-from-bottom-8 delay-200 duration-1000">
	<header class="mb-8 flex items-center justify-between border-b border-[var(--color-border)] pb-2">
		<h2 class="font-mono text-sm tracking-wider text-[var(--color-muted)] uppercase">
			Recent Transmissions
		</h2>
		<a
			href="/blog"
			class="font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
			>View All -></a
		>
	</header>

	<div class="space-y-4">
		{#each data.posts as post}
			<PostCard {...post} />
		{/each}
	</div>
</section>
