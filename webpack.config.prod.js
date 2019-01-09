const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname)
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["./index.js", "./index.js.map"]),
    new HappyPack({
      loaders: ["babel-loader"]
    }),
    new UglifyJSPlugin({ sourceMap: true })
  ],

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  }
};
