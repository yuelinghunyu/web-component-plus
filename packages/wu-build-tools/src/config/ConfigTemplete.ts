import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import url from '@rollup/plugin-url';
import { RollupOptions } from "rollup";
import { ConfigTempleteProps, PathConfig } from "./type";


const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
const defaults = { compilerOptions: { declaration: true } };
class ConfigTemplete {

    public config: RollupOptions[] = []

    constructor(options: ConfigTempleteProps) {
        this.init(options);
    }

    public init(options: ConfigTempleteProps) {
        const { path, args } = options;
        const { inputPath, outputPath, tsconfig } = path;
        this.config = [
            {
                input: inputPath,
                plugins: [
                    terser(),
                    url({
                        include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff']
                    }),
                    nodeResolve(),
                    commonjs(),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    postcss({ extensions: [ '.css', 'scss' ],plugins: [ autoprefixer() ], extract: false }),
                    typescript({
                        tsconfig: tsconfig, // 导入本地ts配置
                        tsconfigDefaults: defaults,
                        tsconfigOverride: {
                            compilerOptions: {
                                declaration: true
                            }
                        },
                         // @ts-ignore
                        extensions
                        
                    }),
                    json(),
                    replace({
                        preventAssignment: true
                    })
                ],
                output: [
                    { name: args.name, file: `${outputPath}/index.umd.js`, format: 'umd' },
                    { file: `${outputPath}/index.cjs.js`, format: 'cjs' },
                    { file: `${outputPath}/index.esm.js`, format: 'es' }
        
                ]
            }
        ]
    }
}

export { ConfigTemplete }