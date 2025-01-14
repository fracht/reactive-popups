import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/index.ts'],
	target: 'es2020',
	format: ['cjs', 'esm'],
	experimentalDts: true,
	define: {
		'import.meta.vitest': 'undefined',
	},
	clean: true,
});
