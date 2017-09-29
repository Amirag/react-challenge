const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contentHash].css'
});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      title: 'React Challenge',
      filename: './index.html',
      template: './client/index.ejs',
      hash: false,
      cache: true,
      showError: true
    })
  ]
});
