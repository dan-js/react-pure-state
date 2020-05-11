/* eslint-env node */

const isTest = process.env.NODE_ENV === "test";

module.exports = {
    presets: [
        [
            "@babel/env",
            {
                modules: isTest ? "commonjs" : false,
            },
        ],
        "@babel/preset-react",
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
};
