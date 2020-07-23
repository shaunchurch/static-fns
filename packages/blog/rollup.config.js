import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "index.ts",

  output: [
    { file: "dist/bundle.cjs.js", format: "cjs" },
    { file: "dist/bundle.es.js", format: "es" },
    { file: "dist/bundle.umd.js", format: "umd", name: "static-fns" },
  ],

  // plugins: [nodeResolve(), commonjs(), typescript()],
  plugins: [typescript()],
};
