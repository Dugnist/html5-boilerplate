const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MinifyPlugin = require('babel-minify-webpack-plugin');

const CONFIG = {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'app.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        minify: {
          "collapseWhitespace": true,
          "minifyCSS": true,
          "removeComments": true
        }
      }),
      new HtmlReplaceWebpackPlugin([
        {
          pattern: '<script type="text/javascript" src="../build/app.js"></script>',
          replacement: ''
        },
        {
          pattern: '<link rel="stylesheet" href="./css/app.css">',
          replacement: ''
        }
      ]),
      new ExtractTextPlugin('css/app.css'),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }),
      new CopyWebpackPlugin([{
        from: 'src/images/',
        to: 'images/'
      }, {
        from: 'src/*.txt',
        to: './[name].[ext]',
        toType: 'template'
      }]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        optipng: { optimizationLevel: 3 },
        jpegtran: { progressive: true },
        gifsicle: { optimizationLevel: 1 },
        svgo: {},
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      port: 3001,
      hot: false,
      watchContentBase: true,
      noInfo: true
    },
    devtool: '#source-map'
}

if(process.env.NODE_ENV === 'production') {

  CONFIG.output.publicPath = './';
  CONFIG.output.filename = 'js/app.js';
  CONFIG.plugins.push(new MinifyPlugin());
  CONFIG.module.rules.push({
    test: [/\.js$/],
    exclude: [/node_modules/],
    loader: 'babel-loader',
    options: { presets: ['env'] }
  });

}

module.exports = CONFIG;
