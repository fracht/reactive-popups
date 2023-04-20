/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
    transform: {
        '\\.[t]sx?$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'cjs',
        'mjs',
        'json',
        'node',
    ],
    collectCoverageFrom: ['<rootDir>/src/**/!(index).{ts,tsx,js,jsx,cjs,mjs}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx,cjs,mjs}'],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    transform: {
        '\\.[t]sx?$': [
            'ts-jest',
            { useESM: true, tsconfig: './tsconfig.test.json' },
        ],
    },
};
