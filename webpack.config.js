const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');

module.exports = {
    mode:'development', // 开发模式
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, './index.js')
    ],
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        port: 3000,
        hot: true,
        // contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                }],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                }, 'less-loader'],
            },
            {
                test: /\.(jpe?g|gif|png)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name][hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name][hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            options: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name][hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions:['*','.js','.json','.vue']
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './[name]_[hash:8].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename:'index.html',
            chunks:['index'], // 与入口文件对应的模块名
        }),
        new Webpack.HotModuleReplacementPlugin(),
    ]
}