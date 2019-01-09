const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/test.js",
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  plugins: [new HtmlWebpackPlugin()],
  watch: true,
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
