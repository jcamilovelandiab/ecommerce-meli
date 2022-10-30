const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
		publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
	devServer: {
		historyApiFallback: true
	},
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader",// Translates CSS into CommonJS
          "sass-loader"// Compiles Sass to CSS
        ]
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      }
    ]
  }
}
