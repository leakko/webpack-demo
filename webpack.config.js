const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const commonConfig = merge([
    { entry: ['./src'] },
    parts.page({ title: "Demo" })
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    { entry: [ 'webpack-plugin-serve/client' ] },
    parts.devServer()
])

const getConfig = (mode) => {
    switch (mode) {
        case "production":
            return merge(commonConfig, productionConfig, { mode });
            break;
        case "development":
            return merge(commonConfig, developmentConfig, { mode })
            break;
        default:
            throw new Error(`Trying to use unknown mode: ${mode}`)
            break;
    }
}

module.exports = getConfig(mode)