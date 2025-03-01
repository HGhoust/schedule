import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'

const vitePWA = VitePWA({
	registerType: 'autoUpdate',
	outDir: 'dist/',
	manifest: {
		name: 'Schedule',
		short_name: 'Schedule',
		description: 'An application for your study schedule',
		theme_color: '#ffffff',
		icons: [
			{
				src: '/icons/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable any',
			},
			{
				src: '/icons/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable any',
			},
		],
	},
})

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools(), vitePWA],
	base: '/',
	build: {
		assetsDir: 'assets',
		outDir: 'dist',
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name][extname]',
			},
			input: 'index.html',
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
