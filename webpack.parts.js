const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');

exports.devServer = () => ({
    watch: true,
    plugins: [
        new WebpackPluginServe({
            port: parseInt(process.env.PORT) || 8080,
            static: './dist',
            liveReload: true,
            waitForBuild: true,
            host: '127.0.0.1'
        })
    ]
})

exports.page = ({title}) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({
            context: { title }
        })
    ]
})

exports.loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/, use: ["style-loader", "css-loader"]
            }
        ]
    }
})
