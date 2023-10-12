const typescript = require('@rollup/plugin-typescript');

const config = [
    {
        input: 'dist/app.js',
        output: {
            file: 'lockstep-api.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['axios', 'os', 'url'],
        plugins: [typescript({ module: 'CommonJS' })],
    }
];
module.exports = config;