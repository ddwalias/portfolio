<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
</script>

<svelte:head>
	<title>Experience | Duy Dang</title>
</svelte:head>

<div class="section-enter mx-auto max-w-2xl px-6 pt-24 pb-20">
	<h1 class="mb-2 text-2xl font-semibold tracking-tight">Experience</h1>
	<div class="mb-10 h-px w-8 bg-[var(--color-border)]"></div>

	<div class="divide-y divide-[var(--color-border)]">
		<ExperienceCard
			role="Software Engineer"
			company="AS White Global"
			date="Aug 2024 — Present"
			active={true}
			skills={['ASP.NET', 'React', 'TypeScript', 'SQL Server']}
		>
			<p>
				Full-stack for an Australian company - building an internal tools platform for managing
				insurance claims and contracts.
			</p>
		</ExperienceCard>

		<ExperienceCard
			role="Open Source Contributor"
			company="Various"
			date="2025 - Present"
			active={true}
			skills={['Rust']}
		>
			<p>Contributing to open source projects - mainly focusing on Rust ecosystem.</p>
		</ExperienceCard>

		<ExperienceCard
			role="Software Engineer"
			company="SmartOSC"
			date="Aug 2022 — Aug 2024"
			skills={['Sitecore', 'ASP.NET', 'React', 'TypeScript', 'SQL Server']}
		>
			<p>
				Outsourcing for clients - e-commerce and fintech. CMS development for enterprise clients.
			</p>
		</ExperienceCard>
	</div>
</div>

<div class="mx-auto max-w-2xl px-6">
	<footer class="border-t border-[var(--color-border)] py-8">
		<div class="flex items-center justify-between text-xs text-[var(--color-muted)]">
			<p>© {new Date().getFullYear()} Duy Dang</p>
		</div>
	</footer>
</div>
