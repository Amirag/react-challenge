const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contentHash].css'
});

module.exports = {
  entry: {
    app: './client/index.js',
    vendor: [
      'axios',
      'react-dom',
      'react-redux',
      'redux-promise',
      'flux-standard-action',
      'lodash.isarray',
      'lodash.keysin',
      'lodash.isarguments',
      'lodash.isplainobject',
    ]
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'client/app/'),
      Functions: path.resolve(__dirname, 'client/functions/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new BundleAnalyzerPlugin(),
    extractSass
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      }
    }, {
      test: /\.(scss|sass)$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true/*,
            includePaths: [
              './client/style.scss'
            ]*/
          }
        }]
      })
    }]
  }
};
