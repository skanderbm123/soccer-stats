const path = require("path");

const SRC_DIR = path.join(__dirname, "/src/");
const DIST_DIR = path.join(__dirname, "/public/");

module.exports = {
  mode: "development",
  watch: true,
  entry: `${SRC_DIR}index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: {
                filter: (url) => {
                  // Semantic-UI-CSS has an extra semi colon in one of the URL due to which CSS loader along
                  // with webpack 5 fails to generate a build.
                  // Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
                  // use: ['style-loader', 'css-loader']
                  if (url.includes("charset=utf-8;;")) {
                    return false;
                  }
                  return true;
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
