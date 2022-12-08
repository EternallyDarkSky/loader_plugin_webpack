const BannerWebpackPlugin = require("./plugins/pluginAPI/BannerWebpackPlugin")
const cleanWebpackPlugin = require("./plugins/pluginAPI/cleanWebpackPlugin")
const AnalyzeWebpackPlugin = require("./plugins/pluginAPI/AnalyzeWebpackPlugin")
const inlineChunkWebpackPlugin = require("./plugins/pluginAPI/inlineChunkWebpackPlugin")

const path = require("path")
const webpack = require('webpack')
const htmlwebpackplugin = require('html-webpack-plugin')
const MiNiCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "./[name].js",
        path: path.resolve(__dirname, './dist'),
        // clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: './loaders/loaderAPI/babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    },
                    // "./loaders/test-loader1.js", 
                    // {
                    //     loader: "./loaders/loaderAPI/banner-loader",
                    //     options: {
                    //         author: "EternallyDarkSky"
                    //     }
                    // },
                    // "./loaders/test-loader1 .js", 
                    // "./loaders/loaderAPI/clear-log-loader.js", // 清除打印
                    // "./loaders/test-loader1.js",// 打印原始内容
                ]
            },
            {
                test: /\.(jpg|jpe?g|gif|webp)$/,
                loader: "./loaders/loaderAPI/file-loader",
                type: "javascript/auto", // 阻止webpack 默认处理资源文件
            },
            {
                test: /\.css$/i,
                use: [
                    MiNiCssExtractPlugin.loader,
                    "css-loader"
                    // "./loaders/loaderAPI/style-loader",
                    // "css-loader"
                ],
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new htmlwebpackplugin({
            template: "./public/index.html"
        }),
        new BannerWebpackPlugin({
            author: "ming"
        }),
        // CSS 文件提取
        new MiNiCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].css"
        }),
        new cleanWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new inlineChunkWebpackPlugin()
    ],
    mode: "production",
    optimization: {
        // splitCode
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs:{
                    test:/[\\/]node_modules[\\/]/,
                    name:"libs-chunk-our",
                    priority:20
                },
            },
        },
        // networkCache
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
    },
}