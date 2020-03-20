const path = require('path');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // stats: 'errors-only',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'main.html',
            chunks: ['verdors', 'main'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        },
        new webpack.BannerPlugin('make 2020-03 by Rogan'),
        new PurgecssPlugin({
            paths: () => glob.sync(`${path.join(__dirname, 'dist')}/**/*`, { nodir: true }),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader?cacheDirectory=true',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    overrideBrowserslist: [
                                        'defaults',
                                        'not ie < 11',
                                        'last 2 versions',
                                        '> 1%',
                                        'iOS 7',
                                        'last 3 iOS versions',
                                    ],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    overrideBrowserslist: [
                                        'defaults',
                                        'not ie < 11',
                                        'last 2 versions',
                                        '> 1%',
                                        'iOS 7',
                                        'last 3 iOS versions',
                                    ],
                                }),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'resource/',
                        },
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65,
                    //         },
                    //         optipng: {
                    //             enabled: false,
                    //         },
                    //         pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4,
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75,
                    //         },
                    //     },
                    // },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'resource/',
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader',
            },
        ],
    },
};
