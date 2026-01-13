<script>
	let { role, company, date, active = false, skills = [], children } = $props();
</script>

<div class="group relative py-6 pl-8 first:pt-0 last:pb-0 sm:pl-32">
	<!-- Timeline Line -->
	<div
		class="absolute top-0 bottom-0 left-2 w-px bg-[var(--color-border)] group-last:bottom-auto group-last:h-6 sm:left-0"
	></div>

	<!-- Date (Left side on desktop) -->
	<time
		class="absolute top-8 left-0 hidden w-24 text-right font-mono text-xs text-[var(--color-muted)] sm:block"
	>
		{date}
	</time>

	<!-- Dot -->
	<div
		class="absolute top-8 left-[5px] h-1.5 w-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] transition-colors group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] sm:left-[-3px] {active
			? 'border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]'
			: ''}"
	></div>

	<div
		class="spotlight-border flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_var(--color-primary-glow)]"
	>
		<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
			<h3 class="text-lg font-bold tracking-tight text-white">
				{role}
			</h3>
			<span class="font-mono text-sm text-[var(--color-muted)]">
				{company}
			</span>
		</div>

		<!-- Date (Mobile only) -->
		<time class="mb-2 block font-mono text-xs text-[var(--color-muted)] sm:hidden">
			{date}
		</time>

		<div class="max-w-prose text-sm leading-relaxed text-[var(--color-muted)]">
			{@render children()}
		</div>

		{#if skills.length > 0}
			<div class="mt-2 flex flex-wrap gap-2">
				{#each skills as skill}
					<span
						class="rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
					>
						{skill}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
