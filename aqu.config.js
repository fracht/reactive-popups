const sharedOpts = {
    dtsBundleGeneratorOptions: {
        libraries: {
            importedLibraries: ['react'],
            allowedTypesLibraries: [],
        },
    },
};

const entries = [
    {
        format: 'esm',
        outfile: './dist/index.mjs',
        declaration: 'none',
    },
    {
        format: 'cjs',
        cjsMode: 'development',
        outfile: './dist/index.cjs',
    },
];

module.exports = entries.map((entry) => ({
    ...entry,
    sharedOpts,
}));
