import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/web-vitals-sdk.umd.js',
            format: 'umd',
            name: 'WebVitalsSDK',
            sourcemap: true,
            globals: {
                react: 'React',
            },
        },
        {
            file: 'dist/web-vitals-sdk.esm.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        terser(),
    ],
    external: ['react'], // Prevent bundling React
};