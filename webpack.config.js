"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function() {
    let webpackConfig = {
        resolve: {
            extensions: [".js", ".jsx", ".json"]
        },
        entry: {
            app: ['./src/client/index.js']
        },
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'application.js',
            publicPath: ""
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options:  {
                            presets: ["es2015", "react"]
                        }
                    }]
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "react"]
                        }
                    }]
                },
                {
                    test: /\.less/,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: { minimize: true }
                        },
                        "less-loader"
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    exclude: /node_modules/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            name: "img/[name]-[hash:6].[ext]",
                            limit: 50000
                        }
                    }]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/client/index.html",
                inject: "body"
            })
        ]
    };

    return webpackConfig;
};
