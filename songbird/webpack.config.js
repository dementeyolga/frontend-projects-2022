const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const pages = ['main', 'quiz', 'gallery'];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/scripts/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
  },
  mode: 'development',
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/pages/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ),
  module: {
    rules: [
      // Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp3)$/i,
        type: 'asset/resource',
      },
      // SCSS, CSS
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      //Audio
      {
        test: /\.(ogg|mp4|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          sources: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'source',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'video',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
              },
            ],
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: './dist',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
