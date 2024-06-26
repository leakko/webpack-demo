const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tailwindcss = require("tailwindcss");

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

exports.extractCSS = ({options = {}, loaders = []} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader, options}, 'css-loader'].concat(loaders),
                sideEffects: true
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
})

exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: {
          plugins: [
            require('tailwindcss')()
          ],
        },
    },
})

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [require('autoprefixer')()]
        }
    }
})

exports.loadImages = ({ limit } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: limit
                    }
                }
            }
        ]
    }
})
