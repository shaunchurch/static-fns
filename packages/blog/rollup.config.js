import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "index.ts",
    output: [
      {
        dir: "./dist/es",
        format: "es",
      },
    ],
    // plugins: [nodeResolve(), commonjs(), typescript()],
    plugins: [typescript({ declarationDir: "./dist/es", outDir: "./dist/es" })],
  },
  {
    input: "index.ts",
    output: [
      {
        //file: "dist/bundle.es.js",
        dir: "./dist/cjs",
        format: "cjs",
      },
    ],
    // plugins: [nodeResolve(), commonjs(), typescript()],
    plugins: [
      typescript({ declarationDir: "./dist/cjs", outDir: "./dist/cjs" }),
    ],
  },
];
