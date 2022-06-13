const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
};
