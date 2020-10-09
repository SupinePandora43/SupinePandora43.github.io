const base = require("./webpack.config")
const bundleanal = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
module.exports = Object.assign(base, {
    /*plugins: [
        new bundleanal({ reportFilename: "../bundle/bundle.html" })
    ]*/
})
