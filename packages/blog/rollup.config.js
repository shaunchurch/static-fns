import typescript from "@rollup/plugin-typescript";
// import commonjs from "rollup-plugin-commonjs";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
    },
    {
      file: "lib/index.es.js",
      format: "esm",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      include: [
        "node_modules/@static-fns/**",
        "node_modules/rss/**",
        "node_modules/isomorphic-unfetch/**",
      ],
    }),
    typescript(),
  ],
};
