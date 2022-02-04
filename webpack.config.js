const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const path = require('path')

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  // entry: {
  //   index: './src/index.tsx',
  // },
  entry: ["babel-polyfill", "./src/index.tsx"],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // modules: ['node_modules'],
    alias: {
      entities: path.resolve(__dirname, './src/entities/'),
      features: path.resolve(__dirname, './src/features/'),
      shared: path.resolve(__dirname, './src/shared/'),
      pages: path.resolve(__dirname, './src/pages/'),
      assets: path.resolve(__dirname, './src/assets/'),
      widgets: path.resolve(__dirname, './src/widgets/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, exclude: [/node_modules/], use: ['style-loader', { loader: 'css-loader' }, 'to-string-loader'] },
    ],
  },


  plugins: [
    new HtmlWebpackPlugin({
      title: 'statinst️',
      template: 'src/index.html',
    }),
  ],

};

if (isProd) {
  config.optimization = {
    minimizer: [
      new TerserWebpackPlugin(),
    ],
  };
} else {
  // for more information, see https://webpack.js.org/configuration/dev-server
  config.devServer = {
    port: 8080,
    https: true,
    open: true,
    hot: true,
    compress: true,
    // stats: 'errors-only',
    overlay: true,
    historyApiFallback: true,
  };
}

module.exports = config;
