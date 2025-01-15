import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/index.ts'],
	target: 'node20',
	format: ['cjs', 'esm'],
	experimentalDts: true,
	define: {
		'import.meta.vitest': 'undefined',
	},
	clean: true,
	treeshake: true,
});
