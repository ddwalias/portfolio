<script lang="ts">
	interface Props {
		title: string;
		date: string;
		excerpt: string;
		slug: string;
	}

	let { title, date, excerpt, slug }: Props = $props();
	console.log(title);

	let formattedDate = $derived(
		new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short'
		})
	);
</script>

<a href={`/blog/${slug}`} class="group block py-4 transition-all duration-200">
	<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
		<time datetime={date} class="shrink-0 font-mono text-xs text-[var(--color-muted)] sm:w-20">
			{formattedDate}
		</time>

		<div class="min-w-0 flex-1">
			<h3
				class="text-base font-semibold tracking-tight transition-colors group-hover:text-[var(--color-primary)]"
			>
				{title}
			</h3>
			<p class="mt-1 line-clamp-1 text-sm text-[var(--color-muted)]">
				{excerpt}
			</p>
		</div>
	</div>
</a>
