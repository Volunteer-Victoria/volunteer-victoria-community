const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

// TODO where I got to with this:
// mode: production just doesn't even start up
// mode: development starts up, but swagger UI doesn't work when deployed as a lamdba
// swagger UI works fine locally if I start it up with main.ts though

module.exports = {
  entry: "./dist/raw/lambda.js",
  output: {
    path: path.resolve(__dirname, "dist/webpacked"),
    filename: "lambda.js",
    library: {
      type: "commonjs2",
    },
  },
  mode: "development",
  target: "node",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  // Webpack wasn't able to find these modules, but we don't seem to need them - I blame NestJS.
  // These are only here to fix webpack errors. Feel free to remove if you are including them in the build.
  externals: {
    "@nestjs/microservices": "@nestjs/microservices",
    "@nestjs/websockets": "@nestjs/websockets",
    "@nestjs/microservices/microservices-module":
      "@nestjs/microservices/microservices-module",
    "@nestjs/websockets/socket-module": "@nestjs/websockets/socket-module",
    "class-transformer/storage": "class-transformer/storage",
    "cache-manager": "cache-manager",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          // Copy static asset files so that they can be served from output directory as swagger-ui-dist does not work
          // with webpack.
          from: path.resolve(__dirname, "../../node_modules/swagger-ui-dist/"),
          to: "./node_modules/swagger-ui-dist",
        },
      ],
    }),
  ],
};
