module.exports = {
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true
            }
        }
    ],
    spaaceBeforeFunctionParen: true,
}