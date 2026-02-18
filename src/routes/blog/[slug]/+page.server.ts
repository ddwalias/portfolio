import fs from 'fs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const filePath = `src/lib/posts/${params.slug}.md`;

    if (!fs.existsSync(filePath)) {
        throw error(404, 'Post not found');
    }

    // Optional: Calculate reading time here if desired in the future, 
    // but for now we just verify existence as per user state.

    return {};
};

export const entries: EntryGenerator = () => {
    const paths = import.meta.glob('/src/lib/posts/*.md');

    return Object.keys(paths).map((path) => {
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';
        return { slug };
    });
};
