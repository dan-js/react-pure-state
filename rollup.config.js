import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [
        {
            file: "lib/index.js",
            format: "cjs",
        },
        {
            file: "lib/index.min.js",
            format: "iife",
            name: "RSS",
            globals: {
                react: "React",
                "prop-types": "PropTypes",
            },
            plugins: [terser()],
        },
    ],
    external: ["react", "react-dom", "prop-types"],
    plugins: [resolve(), babel()],
};
