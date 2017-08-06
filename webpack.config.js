const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config = {
  development: {
    baseHref: '/',
    outputPath: 'plugin/build'
  },
  production: {
    baseHref: '/',
    outputPath: 'plugin/build'
  }
};
const { baseHref, outputPath } = config[env];

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.DefinePlugin({
    CONFIG: JSON.stringify({
      baseHref
    })
  }),
  new CopyWebpackPlugin([
    { from: 'images', to: 'images' }
  ])
];
if (env === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  // this is the path to your source files
  context: path.join(__dirname, 'src'),
  // this is the first file to be executed
  entry: {
    app: './App.jsx'
  },
  plugins,
  module: {
    // this loader uses babel to transpile our JS code
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0'
          ]
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                modules: true,
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  // the JS file that's compiled from the JSX files
  output: {
    filename: '[name].js',
    path: path.join(__dirname, outputPath)
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};
