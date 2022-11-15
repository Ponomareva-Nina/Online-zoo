// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    index: './src/index.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js',
    assetModuleFilename: './assets/[name][ext]',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/template.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: './assets/images' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: './assets/images/[file][ext]',
        },
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin({
      filename: './style.css',
    }));
  } else {
    config.mode = 'development';
  }
  return config;
};
