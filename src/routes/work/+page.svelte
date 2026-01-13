<script>
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
</script>

<section class="animate-in fade-in slide-in-from-bottom-4 duration-700">
	<header class="mb-12">
		<h1 class="mb-4 text-3xl font-bold tracking-tight">Work Experience</h1>
		<p class="max-w-xl text-[var(--color-muted)]">
			My professional path, focusing on building scalable systems and intuitive interfaces.
		</p>
	</header>

	<div class="space-y-0">
		<ExperienceCard
			role="Senior Front-End Engineer"
			company="TechCorp"
			date="2022 — Present"
			active={true}
			skills={['SvelteKit', 'TypeScript', 'Rust', 'WebGL']}
		>
			<p>
				Leading the frontend infrastructure team. Migrated core product from legacy framework to
				SvelteKit, verifying 40% performance improvement. Designed internal design system used by
				15+ squads.
			</p>
		</ExperienceCard>

		<ExperienceCard
			role="Software Engineer"
			company="Creative Solutions"
			date="2020 — 2022"
			skills={['React', 'Next.js', 'Node.js', 'AWS']}
		>
			<p>
				Full-stack development for high-traffic e-commerce clients. Implemented server-side
				rendering pipelines and headless CMS integrations. Mentored junior developers and introduced
				automated testing practices.
			</p>
		</ExperienceCard>

		<ExperienceCard
			role="Junior Developer"
			company="StartUp Inc"
			date="2018 — 2020"
			skills={['Vue.js', 'Firebase', 'Sass']}
		>
			<p>
				Early employee. Built MVP for mobile-first social platform. Handled everything from UI
				implementation to database rules and deployment scripts.
			</p>
		</ExperienceCard>
	</div>
</section>
