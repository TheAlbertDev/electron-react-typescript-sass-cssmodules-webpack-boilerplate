const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === "development";

module.exports = (env, argv) => {

  return {
    mode: "development",
    entry: "./src/renderer.tsx",
    target: "electron-renderer",
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist")
      },
      compress: true,
      port: 9000
    },
    resolve: {
      alias: {
        ["@"]: path.resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
                import: false,
                modules: {
                  localIdentName: "[sha1:hash:hex:4]",
                  exportLocalsConvention: "camelCase"
                }
              },
            },
            "sass-loader",
          ],
          include: /\.module\.scss$/,
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ],
          exclude: /\.module\.scss$/,
        },
      ],
    },
    output: {
      path: __dirname + "/dist",
      filename: "renderer.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({ filename: "style.css" }),
    ],
  };
};
