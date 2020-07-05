import commonjs from 'rollup-plugin-commonjs'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json';

const pkg = require('./package.json')

const libraryName = 'typescript-super-set'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['lodash'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs()
  ],
}
