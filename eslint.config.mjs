import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.node } },
    {
        ...pluginJs.configs.recommended,
        rules: {
            semi: ['error', 'never'],
            indent: ['error', 4],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'space-in-parens': ['error', 'never'],
            'comma-spacing': ['error', { before: false, after: true }],
            'quotes': ['error', 'single'],
        },
    },
]
