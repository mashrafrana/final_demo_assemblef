// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const path = require('path');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const app = 'meeting';

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'styled-components': path.resolve('./node_modules/styled-components'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'amazon-chime-sdk-component-library-react': path.resolve(
        './node_modules/amazon-chime-sdk-component-library-react'
      ),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${app}-bundle.js`,
    publicPath: '/',
    libraryTarget: 'var',
    library: `app_${app}`,
  },
  node: {
    fs: 'empty',
    tls: 'empty',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: `${__dirname}/app/${app}.html`,
      filename: `${__dirname}/dist/${app}.html`,
      inject: 'head',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  devServer: {
    proxy: {
      '/rtmp': {
        target: 'http://localhost:4000',
        ws: true,
      },
      '/': {
        target: 'http://localhost:8080',
        bypass(req, _res, _proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return `/${app}.html`;
          }
        },
      },
    },
    contentBase: path.join(__dirname, 'dist'),
    index: `${app}.html`,
    compress: true,
    public: 'store-client-nestroia1.c9users.io',
    liveReload: true,
    hot: false,
    host: '0.0.0.0',
    port: 2053,
    https: true,
    historyApiFallback: true,
    writeToDisk: true,
    allowedHosts: [
      'host.com',
      'subdomain.host.com',
      'subdomain2.host.com',
      'host2.com',
    ],
    disableHostCheck: true,
  },
};
