<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="relative flex min-h-screen flex-col bg-[var(--color-background)] font-sans text-[var(--color-foreground)] selection:bg-white/20"
>
	<!-- Background Grid with Vignette Mask -->
	<div
		class="pointer-events-none fixed inset-0 z-0 opacity-50"
		style="background-image: var(--pattern-grid); background-size: 40px 40px; mask-image: radial-gradient(circle at center, black 40%, transparent 100%);"
	></div>

	<main class="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-12">
		<Header />
		{@render children()}
		<Footer />
	</main>
</div>
