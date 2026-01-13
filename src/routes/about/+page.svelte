<script>
	const skills = [
		{ category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'SQL'] },
		{ category: 'Frontend', items: ['SvelteKit', 'React', 'Tailwind CSS', 'Three.js'] },
		{ category: 'Backend', items: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'] },
		{ category: 'Tools', items: ['Git', 'Figma', 'Linux', 'Vite'] }
	];
</script>

<svelte:head>
	<title>About | Portfolio</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
	<h1 class="mb-8 text-4xl font-bold tracking-tight text-white">About</h1>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
		<!-- Main Content -->
		<div class="prose prose-lg prose-invert min-w-0">
			<p class="lead text-xl text-[var(--color-muted)]">
				I'm a software engineer passionate about building high-performance, user-centric web
				applications. I thrive at the intersection of design and engineering.
			</p>

			<h2>My Journey</h2>
			<p>
				My coding journey began with a curiosity for how things work on the web. Over the years,
				I've honed my skills in modern frontend frameworks and scalable backend systems. I believe
				in writing clean, maintainable code and solving real-world problems through technology.
			</p>

			<p>
				Currently, I'm focused on exploring the potential of <strong>Svelte 5</strong> and 
				<strong>minimalist design systems</strong>. I love experimenting with new tools and sharing
				what I learn with the community.
			</p>
			
			<h2>Beyond Code</h2>
			<p>
				When I'm not at the keyboard, you can find me:
			</p>
			<ul>
				<li>📸 Taking photos of urban landscapes</li>
				<li>☕ Exploring local coffee shops</li>
				<li>📚 Reading about design patterns and architecture</li>
				<li>🎮 Gaming (currently into sci-fi RPGs)</li>
			</ul>
		</div>

		<!-- Sidebar / Info Card -->
		<aside class="space-y-8">
			<!-- Profile Image Placeholder -->
			<div class="group relative aspect-square overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[#1e1e1e]">
				<div class="absolute inset-0 flex items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
					<span class="font-mono text-xs">PROFILE_IMG_PLACEHOLDER</span>
				</div>
                <!-- Spotlight overlay for profile -->
                <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                     style="background: radial-gradient(circle at center, var(--color-primary-glow), transparent 70%)">
                </div>
			</div>

			<!-- Skills List -->
			<div class="space-y-6">
				{#each skills as group}
					<div>
						<h3 class="mb-3 font-mono text-xs font-bold tracking-wider text-[var(--color-muted)] uppercase">
							{group.category}
						</h3>
						<div class="flex flex-wrap gap-2">
							{#each group.items as skill}
								<span
									class="cursor-default rounded border border-[var(--color-border)] bg-black/20 px-2 py-1 font-mono text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
            
            <!-- Connect link -->
             <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-primary)]/5 p-6 backdrop-blur-sm">
                <h3 class="mb-2 text-sm font-bold text-white">Let's Connect</h3>
                <p class="mb-4 text-xs text-[var(--color-muted)]">
                    Interested in working together or just want to say hi?
                </p>
                <a href="/#connect" class="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
                    Send a message ->
                </a>
            </div>
		</aside>
	</div>
</div>
