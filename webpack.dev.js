const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'client/index.jsx'),
  ],
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new ReactRefreshPlugin({ overlay: { sockIntegration: 'whm' } }),
  ],
  stats: 'minimal',
});
