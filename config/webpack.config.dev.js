const path = require('path');
const { merge } = require('webpack-merge');
const defaultConfig = require('../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = merge(defaultConfig, {
  // Environment mode
  mode: 'development',
  devServer: {
    compress: true,
    https: true,
    hot: true,
    host: 'videochatfiagent-vipprofserdevteam01',
    open: true,
    port: 8000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
});