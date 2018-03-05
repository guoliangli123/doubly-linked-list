var webpack = require('webpack');
var path = require('path');


function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname,'./dist/'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'doubly-link-list',
      libraryTarget: 'umd'
    },
    node: {
      process: false
    },
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
      }]
    }
  };

  if (uglify) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    );
  }
  return config;
}

module.exports = generateConfig;