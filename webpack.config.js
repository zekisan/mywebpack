'use strict';

const path    = require('path'),
      webpack = require('webpack'),
      vendorPaths = /\/(frontend\/javascripts\/vendor|node_modules)\//;

let config = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  //context: path.join(__dirname, 'app/frontend/javascripts'),
  // the main entry point for our application's frontend JS
  entry: './app/frontend/javascripts/entry.js',
  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: 'bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets'
  },
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js', '.jsx'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    modulesDirectories: ['node_modules']
  },
  module:{
    preLoaders: [
      { test: /\.jsx?$/, exclude: vendorPaths, loader: 'babel-loader' }
    ],
    loaders: [
      { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-bootstrap'), loader: 'expose?ReactBoostrap' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.png$/, loader: "url?limit=100000" },
      { test: /\.(jpg|gif)$/, loader: "file" },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
    // we need this plugin to teach webpack how to find module entry points for bower files,
    // as these may not have a package.json file
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

module.exports = config;