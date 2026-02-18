<script lang="ts">
	interface Props {
		role: string;
		company: string;
		date: string;
		active?: boolean;
		skills?: string[];
		children: import('svelte').Snippet;
	}

	let { role, company, date, active = false, skills = [], children }: Props = $props();
</script>

<div class="group relative py-6 transition-colors hover:text-[var(--color-foreground)]">
	<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
		<span class="shrink-0 font-mono text-xs text-[var(--color-muted)] sm:w-28">{date}</span>
		<div class="min-w-0 flex-1">
			<h3 class="text-base font-medium">
				{role}
				<span class="font-normal text-[var(--color-muted)]">· {company}</span>
				{#if active}
					<span class="ml-2 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"></span>
				{/if}
			</h3>
			<div class="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
				{@render children()}
			</div>
			{#if skills.length > 0}
				<div class="mt-3 flex flex-wrap gap-1.5">
					{#each skills as skill}
						<span
							class="font-mono text-[10px] text-[var(--color-muted)] before:mr-1 before:content-['·']"
						>
							{skill}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
