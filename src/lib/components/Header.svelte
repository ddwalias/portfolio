<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config';

	function isHome(): boolean {
		return $page.url.pathname === '/';
	}
</script>

<!-- Only show header on subpages, not homepage -->
{#if !isHome()}
	<header class="fixed top-0 left-0 z-50 w-full">
		<div class="flex items-center justify-between px-6 py-5 sm:px-8">
			<a
				href="/"
				class="font-mono text-xs tracking-wider text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-foreground)]"
			>
				← {siteConfig.author}
			</a>
		</div>
	</header>
{/if}
