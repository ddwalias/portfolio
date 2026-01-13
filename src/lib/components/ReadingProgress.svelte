<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		const updateProgress = () => {
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (scrollHeight <= 0) {
				progress = 0;
				return;
			}
			progress = (window.scrollY / scrollHeight) * 100;
		};

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();

		return () => window.removeEventListener('scroll', updateProgress);
	});
</script>

<div class="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent">
	<div
		class="h-full bg-gradient-to-r from-[var(--color-primary)] to-purple-500 transition-all duration-100 ease-out"
		style="width: {progress}%"
	></div>
</div>
