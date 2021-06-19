const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: false,
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        })
    ],
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist")
    },
    target: "web",
});