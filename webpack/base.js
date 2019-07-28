const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new WebpackPwaManifest({
      filename: 'manifest.webmanifest',
      name: 'Phaser 3 Game Template',
      short_name: 'Phaser3GT',
      description: 'Phaser 3 game template.',
      ios: true,
      background_color: '#0f0f0f',
      theme_color: '#808080',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [192, 256, 512],
          destination: path.join('assets', 'icons')
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW(),
  ]
};
