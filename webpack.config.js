const { mode } = require('webpack-nano/argv');
const { WebpackPluginServe } = require("webpack-plugin-serve");
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');

module.exports = {
    watch: mode === 'development',
    entry: ['./src', 'webpack-plugin-serve/client'],
    mode,
    plugins: [
        new MiniHtmlWebpackPlugin({
            context: {
                title: "Demo"
            }
        }),
        new WebpackPluginServe({
            port: parseInt(process.env.PORT) || 8080,
            static: './dist',
            liveReload: true,
            waitForBuild: true,
            host: '127.0.0.1'
        })
    ],
    target: 'web',
}