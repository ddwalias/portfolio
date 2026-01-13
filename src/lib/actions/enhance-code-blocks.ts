import { mount, unmount } from 'svelte';
import type { Action } from 'svelte/action';
import CopyButton from '$lib/components/CopyButton.svelte';

export const enhanceCodeBlocks: Action = (node: HTMLElement) => {
    const preElements = node.querySelectorAll('pre');

    const components: ReturnType<typeof mount>[] = [];

    preElements.forEach((pre) => {
        // Ensure relative positioning for absolute button
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }
        // Add group class for hover effect
        pre.classList.add('group');

        const text = pre.textContent || '';

        // Mount the component
        const component = mount(CopyButton, {
            target: pre,
            props: { text }
        });

        components.push(component);
    });

    return {
        destroy() {
            components.forEach((comp) => {
                unmount(comp);
            });
        }
    };
};
