import { siteConfig } from '$lib/config';

export const prerender = true;

export async function GET() {
    // Hardcoded for now, ideal would be to import posts
    const posts = [
        {
            title: 'Building Robust APIs with SvelteKit',
            slug: 'technical-guide',
            description: 'A deep dive into building type-safe APIs using SvelteKit loaders and actions.',
            date: '2023-10-24'
        }
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>${siteConfig.title}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        <language>en-us</language>
        ${posts
            .map(
                (post) => `
        <item>
            <title>${post.title}</title>
            <link>${siteConfig.url}/blog/${post.slug}</link>
            <guid>${siteConfig.url}/blog/${post.slug}</guid>
            <description>${post.description}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`
            )
            .join('')}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
