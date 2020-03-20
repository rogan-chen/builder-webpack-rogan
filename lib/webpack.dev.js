const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        filename: 'js/[name].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development'),
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'cheap-source-map',
});
