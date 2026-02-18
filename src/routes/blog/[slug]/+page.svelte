<script lang="ts">
	import { onMount } from 'svelte';
	import { enhanceCodeBlocks } from '$lib/actions/enhance-code-blocks';
	import type { PageData } from './$types';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let { data }: { data: PageData } = $props();
	let { title, date } = $derived(data.meta);
	let Content = $derived(data.content);

	let formattedDate = $derived(
		new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	let headings = $state<Heading[]>([]);
	let activeId = $state('');

	onMount(() => {
		const elements = document.querySelectorAll('.prose h2, .prose h3');
		headings = Array.from(elements).map((el) => {
			const element = el as HTMLElement;
			return {
				id: element.id,
				text: element.innerText,
				level: element.tagName === 'H2' ? 2 : 3
			};
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '-100px 0px -66% 0px' }
		);

		elements.forEach((el) => observer.observe(el));
		return () => elements.forEach((el) => observer.unobserve(el));
	});
</script>

<div class="section-enter mx-auto max-w-5xl px-6 pt-24 pb-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
	>
		← Back
	</a>

	<header class="mb-10 max-w-2xl border-b border-[var(--color-border)] pb-8">
		<time class="mb-3 block font-mono text-xs tracking-wider text-[var(--color-muted)] uppercase"
			>{formattedDate}</time
		>
		<h1 class="text-2xl leading-tight font-semibold tracking-tight text-balance">
			{title}
		</h1>
	</header>

	<!-- Mobile TOC (top, collapsible) -->
	{#if headings.length > 0}
		<details class="mt-0 mb-8 lg:hidden">
			<summary
				class="cursor-pointer font-mono text-xs tracking-wider text-[var(--color-muted)] uppercase"
			>
				On this page
			</summary>
			<ul class="mt-3 space-y-1 border-l border-[var(--color-border)] pl-3">
				{#each headings as heading}
					<li>
						<a
							href="#{heading.id}"
							class="block py-0.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
							style="padding-left: {heading.level === 3 ? '0.75rem' : '0'}"
						>
							{heading.text}
						</a>
					</li>
				{/each}
			</ul>
		</details>
	{/if}

	<div class="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
		<!-- Article -->
		<div class="prose min-w-0 prose-invert" use:enhanceCodeBlocks>
			<Content />
		</div>

		<!-- Side TOC (desktop) -->
		{#if headings.length > 0}
			<aside class="hidden lg:block">
				<div class="sticky top-24">
					<h4
						class="mb-4 font-mono text-[10px] font-bold tracking-wider text-[var(--color-muted)] uppercase"
					>
						On this page
					</h4>
					<ul class="space-y-1.5 border-l border-[var(--color-border)]">
						{#each headings as heading}
							<li>
								<a
									href="#{heading.id}"
									class="-ml-px block border-l border-transparent py-0.5 text-xs transition-colors duration-200
									{activeId === heading.id
										? 'border-[var(--color-primary)] text-[var(--color-primary)]'
										: 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}"
									style="padding-left: {heading.level === 3 ? '1.25rem' : '0.75rem'}"
								>
									{heading.text}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</aside>
		{/if}
	</div>
</div>

<div class="mx-auto max-w-5xl px-6">
	<footer class="border-t border-[var(--color-border)] py-8">
		<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
			<p>© {new Date().getFullYear()} Duy Dang</p>
			<p class="handwritten">Built by hand.</p>
		</div>
	</footer>
</div>
