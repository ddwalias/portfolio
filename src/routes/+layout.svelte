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
	import SEO from '$lib/components/SEO.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let mouseX = $state(0);
	let mouseY = $state(0);
	let easterEggActive = $state(false);

	// Konami code
	const konamiCode = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];
	let konamiIndex = $state(0);

	function handleKonami(e: KeyboardEvent) {
		if (e.key === konamiCode[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === konamiCode.length) {
				easterEggActive = true;
				konamiIndex = 0;
				setTimeout(() => {
					easterEggActive = false;
				}, 3000);
			}
		} else {
			konamiIndex = 0;
		}
	}

	onMount(() => {
		const lenis = new Lenis();
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => lenis.destroy();
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
	onkeydown={handleKonami}
/>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SEO />
<CommandPalette />

{#if easterEggActive}
	<div class="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center">
		<p class="animate-pulse font-mono text-sm text-[var(--color-primary)]">You found it.</p>
	</div>
{/if}

<div
	class="relative min-h-screen bg-[var(--color-background)]"
	style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"
>
	<!-- Subtle cursor glow -->
	<div
		class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, var(--color-primary-glow), transparent 40%);"
	></div>

	<Header />

	<main class="relative z-10">
		{@render children()}
	</main>
</div>
