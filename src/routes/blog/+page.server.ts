import type { PageServerLoad } from './$types';

interface MarkdownFile {
    metadata: {
        title: string;
        date: string;
        excerpt: string;
        [key: string]: any;
    };
}

export const load: PageServerLoad = async () => {
    const paths = import.meta.glob<MarkdownFile>('/src/lib/posts/*.md', { eager: true });
    console.log(paths);
    const posts = Object.entries(paths).map(([path, file]) => {
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';
        return {
            ...file.metadata,
            slug
        };
    });

    console.log(posts);

    // Sort by date desc
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
        posts
    };
};
