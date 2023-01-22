const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const dotenv = require('dotenv')
const env = require('./env')
const package = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const universalPlugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/assets/img/logo/Antara Logo@1x.png',
  }),
  new webpack.DefinePlugin({
    'process.env': env,
  }),
  new NodePolyfillPlugin(),
]

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      zlib: require.resolve('browserify-zlib'),
      fs: false,
      net: false,
      path: false,
      process: false,
    },
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
  ...(process.env.NODE_ENV !== 'production' && {
    plugins: [...universalPlugins],
  }),
  ...(process.env.NODE_ENV === 'production' && {
    plugins: [
      ...universalPlugins,
      new CopyPlugin({
        patterns: [
          {
            from: 'firebase-messaging-sw.js',
            to: 'firebase-messaging-sw.js',
          },
        ],
      }),
      new SentryWebpackPlugin({
        org:  process.env.SENTRY_PROJECT_ORG,
        project:  process.env.SENTRY_PROJECT_NAME,
        include: "./dist",
        authToken: process.env.SENTRY_API_KEY,
      })
    ],
  }),
  devtool: 'source-map',
  devServer: {
    port: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    historyApiFallback: true,
    static: './',
    hot: true,
    static:  {
        watch: false,
        directory: './',
        publicPath: '/',
    }
  },
}
