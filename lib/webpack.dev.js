const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'cheap-source-map',
});