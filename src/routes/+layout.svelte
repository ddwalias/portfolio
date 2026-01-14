<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import type { Navigation } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	});

	onNavigate((navigation: Navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:window
	onmousemove={(e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}}
/>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SEO />
<CommandPalette />

<div
	class="relative flex min-h-screen flex-col bg-[var(--color-background)] font-sans text-[var(--color-foreground)] selection:bg-white/20"
	style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"
>
	<div
		class="pointer-events-none fixed inset-0 z-0 opacity-100 transition-opacity duration-500"
		style="
			background-image: var(--pattern-dots);
			background-size: 24px 24px;
			mask-image: radial-gradient(circle 300px at {mouseX}px {mouseY}px, black 0%, transparent 100%);
			-webkit-mask-image: radial-gradient(circle 300px at {mouseX}px {mouseY}px, black 0%, transparent 100%);
		"
	></div>

	<main class="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 pt-28 pb-12">
		<Header />
		{@render children()}
		<Footer />
	</main>
</div>
