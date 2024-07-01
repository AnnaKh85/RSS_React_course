module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}', '*.ts', '*.tsx', '*.js', '*.jsx', '*.ts', '*.tsx', '*.js', '*.jsx', '*.html'],
            rules: {
                "react/prop-types": "off",
            },
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],

    plugins: ['react', '@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier', "react-compiler"],
    rules: {
        'react/react-in-jsx-scope': 'off',
        "react-compiler/react-compiler": "error",
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'lf',
            },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',

        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'warn',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
    },
};
