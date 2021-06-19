const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/scripts/script.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.html$/i,
                use: [
                    "html-loader",
                ],
            }
        ],
    },
}