const webpackMerge = require("webpack-merge").merge;
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const path = require("path");
const sass = require("sass");

const utils = require("./utils.js");
const commonConfig = require("./webpack.common.js");

const ENV = "development";

module.exports = async options =>
  webpackMerge(await commonConfig({ env: ENV }), {
    devtool: "cheap-module-source-map", // https://reactjs.org/docs/cross-origin-errors.html
    mode: ENV,
    entry: ["./src/app/index"],
    output: {
      path: utils.root("target/classes/static/"),
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[chunkhash:8].chunk.js"
    },
    optimization: {
      moduleIds: "named"
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader",
              options: { implementation: sass }
            }
          ]
        }
      ]
    },
    devServer: {
      hot: true,
      static: {
        directory: "./target/classes/static/"
      },
      port: 9060,
      proxy: [
        {
          context: ["/rnr-portal", "/rnr-portal-sit"],
          target: `https://10.168.12.103`,
          secure: false,
          changeOrigin: options.tls
        }
      ],
      server: `http${options.tls ? "s" : ""}`,
      // https: options.tls,
      historyApiFallback: true
    },
    stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? "none" : options.stats,
    plugins: [
      process.env.JHI_DISABLE_WEBPACK_LOGS
        ? null
        : new SimpleProgressWebpackPlugin({
          format: options.stats === "minimal" ? "compact" : "expanded"
        }),
      new BrowserSyncPlugin(
        {
          https: options.tls,
          host: "localhost",
          port: 9000,
          proxy: {
            target: `http${options.tls ? "s" : ""}://localhost:9060`,
            ws: true,
            proxyOptions: {
              changeOrigin: false //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            }
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000
            }
          }
          /*
      ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
        clicks: false,
        location: false,
        forms: false,
        scroll: false
      } */
        },
        {
          reload: false
        }
      ),
      new WebpackNotifierPlugin({
        title: "RNR Portal UI",
        contentImage: path.join(__dirname, "logo-jhipster.png")
      })
    ].filter(Boolean)
  });
