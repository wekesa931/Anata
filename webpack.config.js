const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const dotenv = require('dotenv')
const env = require('./env')
const package = require('./package.json')
const { BugsnagBuildReporterPlugin, BugsnagSourceMapUploaderPlugin} = require('webpack-bugsnag-plugins')

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.component.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /(index|tippy)\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jp(e*)g|png|gif|)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash]-[name].[ext]',
        },
        enforce: 'pre',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/img/logo/Antara Logo@1x.png',
    }),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: 'sourcemap',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
}

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'local') {
  module.exports.plugins.push(
    new CopyPlugin({
        patterns: [
        {
          from: 'firebase-messaging-sw.js',
          to: 'firebase-messaging-sw.js'
        }
      ]
    }),
    new BugsnagBuildReporterPlugin({
        apiKey: '08051b1d342d0c2d6b7102d7e046b02d',
        appVersion: package.version
      },
      {}
    ),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: '08051b1d342d0c2d6b7102d7e046b02d',
      appVersion: package.version,
      overwrite: true
    })
  );
}