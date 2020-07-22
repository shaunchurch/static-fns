import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "index.ts",
    output: {
      name: "static-fns",
      // file: pkg.browser,
      dir: "./lib",
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript({ outDir: "./lib" }),
      json(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "index.ts",
    external: ["ms"],
    output: [
      {
        // file: pkg.main,
        dir: "./lib",
        format: "cjs",
      },
      {
        // file: pkg.module,
        dir: "./lib",
        format: "es",
      },
    ],
  },
];

// export default {
//   input: "index.ts",
//   output: [
//     {
//       file: "index.js",
//       format: "cjs",
//     },
//     {
//       file: "index.es.js",
//       format: "esm",
//     },
//   ],
//   plugins: [
//     nodeResolve(),
//     commonjs({
//       include: [
//         "node_modules/@static-fns/**",
//         "node_modules/rss/**",
//         "node_modules/isomorphic-unfetch/**",
//       ],
//     }),
//     typescript(),
//   ],
// };
