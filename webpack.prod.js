const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    entry: "./src/client/index.js",
    mode: "production",
    output: {
        libraryTarget: "var",
        library: "Client"
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            favicon: "./src/client/img/favicon.ico"
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW()
    ],
    module: {
        rules: [
            {
                test: "/.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
