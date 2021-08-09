import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pegjs from "rollup-plugin-pegjs";


export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'jq',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      pegjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: [],
    plugins: [
      pegjs(),
    ],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto'},
      { file: pkg.module, format: 'es', exports: 'auto' },
    ],
  },
];