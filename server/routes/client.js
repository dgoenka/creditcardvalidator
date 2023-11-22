'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../../webpack.dev');


const { publicPath, path: outputPath } = webpackConfig.output;

const router = module.exports = express.Router();

if (process.env.NODE_ENV === 'production') {
  // Serve already-compiled webpack content from the dist folder.
  router.use(publicPath, express.static(outputPath));
}
else {
  const compiler = webpack(webpackConfig);

  // Compile webpack content dynamically and serve it from express.
  router.use(webpackDevMiddleware(compiler));

  // Use hot module loading.
  router.use(webpackHotMiddleware(compiler));
}
