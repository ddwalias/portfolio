import { mount, unmount } from 'svelte';
import CopyButton from '$lib/components/CopyButton.svelte';

export function enhanceCodeBlocks(node) {
    const preElements = node.querySelectorAll('pre');

    const components = [];

    preElements.forEach((pre) => {
        // Ensure relative positioning for absolute button
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }
        // Add group class for hover effect
        pre.classList.add('group');

        const text = pre.textContent || '';

        // Create a container for the button if needed, or append directly
        // Ideally we append to the pre if it creates a block context

        const buttonContainer = document.createElement('div');
        // We don't need a container if we use absolute positioning on the button and relative on the pre

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
                // Svelte 5 mount returns an object with $destroy? No, mount returns the instance exports?
                // Wait, Svelte 5 'mount' API returns the component instance. 
                // To unmount, we use 'unmount(component)'.
                unmount(comp);
            });
        }
    };
}
