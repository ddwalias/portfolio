import { siteConfig, navLinks } from '$lib/config';

export async function GET() {
    const pages = navLinks.map((link) => link.href);

    // In a real app, you'd fetch blog posts here too
    // const posts = await fetchPosts();
    // posts.forEach(post => pages.push(`/blog/${post.slug}`));

    // Adding hardcoded blog post for now since we don't have a fetchPosts utility here yet
    pages.push('/blog/technical-guide');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
            .map(
                (page) => `
    <url>
        <loc>${siteConfig.url}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>`
            )
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
