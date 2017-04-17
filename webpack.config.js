const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {},
    resolve: {},
    devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      port: 3001,
      hot: false,
      watchContentBase: true,
      noInfo: true
    },
    devtool: '#eval-source-map'
}

// if (process.env.NODE_ENV === 'development') {
//     module.exports.devtool = '#source-map'
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         // new webpack.DefinePlugin({
//         //     'process.env': {
//         //         NODE_ENV: '"production"'
//         //     }
//         // }),
//         // new webpack.optimize.UglifyJsPlugin({
//         //     sourceMap: true,
//         //     compress: {
//         //         warnings: false
//         //     }
//         // }),
//         // new webpack.LoaderOptionsPlugin({
//         //     minimize: true,
//         //     debug: false
//         // }),
//         new HtmlWebpackPlugin({
//             template: './src/index.html',
//             filename: './index.html',
//             minify: {
//               "collapseWhitespace": true,
//               "removeComments": true
//             }
//         })
//     ])
// }
