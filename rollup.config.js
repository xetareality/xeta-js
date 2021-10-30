import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

export default  {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundles/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/bundles/bundle.esm.min.js',
      format: 'esm',
      plugins: [terser()],
      sourcemap: true,
      intro: 'const global = window;'
    },
    {
      file: 'dist/bundles/bundle.umd.js',
      format: 'umd',
      name: 'Xeta',
      sourcemap: true
    },
    {
      file: 'dist/bundles/bundle.umd.min.js',
      format: 'umd',
      name: 'Xeta',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    resolve({ extensions }),
    babel({babelHelpers: 'runtime', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'}),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/js-sha256/src/sha256.js': ['sha256']
      }}),
  ]
}