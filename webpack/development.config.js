const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths.js');

let config = require('./default.config.js');

config.devtool = 'source-map';

config.plugins = [
  new cleanPlugin([paths.dist], {
    root: paths.root
  }),
  new copyPlugin([
    {
      from: `${paths.source}/index.html`,
    },
    {
      from: `${paths.source}/img/**/*`,
      to: 'img/',
      flatten: true
    },
  ]),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('development'),
    LANGUAGES: JSON.stringify(['en'])
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

config.devServer = {
  contentBase: `${paths.dist}`
};

module.exports = config;
