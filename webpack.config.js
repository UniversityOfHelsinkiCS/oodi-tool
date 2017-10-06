const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './src/')
const DIST_DIR = path.resolve(__dirname, '.')

module.exports = {
    context: __dirname,
    cache: true,
    target: 'node',
    entry:  SRC_DIR + "/client.jsx",
    module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: 'node_modules',
          loader: 'babel-loader',
          query: {
              presets: ['react', 'env', 'stage-0']
          }
        }
      ]
    },

    output: {
        path: DIST_DIR,
        filename: "/app.min.js"
    },
};
