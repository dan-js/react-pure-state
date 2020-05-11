/* eslint-env node */

module.exports = {
    env: {
        es6: true,
        browser: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier/react",
    ],
    parser: "babel-eslint",
    plugins: ["prettier", "jest"],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        semi: "error",
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                useTabs: false,
            },
        ],
    },
    settings: {
        react: {
            version: "16.13",
        },
    },
};
