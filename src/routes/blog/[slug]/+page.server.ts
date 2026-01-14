import fs from 'fs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const filePath = `src/lib/posts/${params.slug}.md`;

    if (!fs.existsSync(filePath)) {
        throw error(404, 'Post not found');
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const words = content.split(/\s+/g).length;
    const minutes = Math.ceil(words / 200);

    return {
        readingTime: `${minutes} min read`
    };
};
