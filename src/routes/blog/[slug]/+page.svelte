<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	const { title, date } = data.meta;

	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	let headings = $state([]);
	let activeId = $state('');

	onMount(() => {
		const elements = document.querySelectorAll('.prose h2, .prose h3');
		headings = Array.from(elements).map((el) => ({
			id: el.id,
			text: el.innerText,
			level: el.tagName === 'H2' ? 2 : 3
		}));

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

<article class="animate-in fade-in slide-in-from-bottom-4 duration-700">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
	>
		&larr; Back to Transmissions
	</a>

	<header class="mb-10 border-b border-[var(--color-border)] pb-8">
		<time class="mb-3 block font-mono text-xs tracking-wider text-[var(--color-muted)] uppercase"
			>{formattedDate}</time
		>
		<h1 class="text-3xl leading-tight font-bold tracking-tight text-balance text-white md:text-4xl">
			{title}
		</h1>
	</header>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
		<div class="prose prose-lg prose-invert min-w-0">
			<svelte:component this={data.content} />
		</div>

		<!-- Table of Contents Sidebar -->
		<aside class="hidden lg:block">
			<div class="sticky top-12">
				<h4
					class="mb-4 font-mono text-xs font-bold tracking-wider text-[var(--color-muted)] uppercase"
				>
					On this page
				</h4>
				<ul class="space-y-2 border-l border-[var(--color-border)]">
					{#each headings as heading}
						<li>
							<a
								href="#{heading.id}"
								class="block border-l-2 -ml-[1px] px-4 py-1 text-sm transition-all duration-200
                                {activeId === heading.id
									? 'border-[var(--color-primary)] text-[var(--color-primary)]'
									: 'border-transparent text-[var(--color-muted)] hover:text-white'}"
								style="padding-left: {heading.level === 3 ? '1.5rem' : '1rem'}"
								onclick={() => (activeId = heading.id)}
							>
								{heading.text}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</aside>
	</div>
</article>
