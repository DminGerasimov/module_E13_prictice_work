const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isProduction = process.env.NODE_ENV == "development";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
      path: path.resolve(__dirname, "dist"),
      filename: "super.js",
    },
    stats: {
        children: false,
        modules: false,
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        open: {
            app: {
                name: 'firefox',
            },
        },
        port: 'auto',
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.pug",
            filename: "index.html",
        }),
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
  module: {
    rules: [
      {
          test: /\.pug$/i,
          loader: "pug-loader",
          options: {
              pretty: true
          }
      },
      {
        test: /\.css$/i,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                  esModule: true,
              },
          },
              "css-loader"],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
        },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
