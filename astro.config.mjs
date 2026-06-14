// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://Quanzhitong.github.io',
	integrations: [sitemap()],
	output: 'static',
});
