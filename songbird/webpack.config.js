const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const pages = ['main', 'quiz', 'results'];

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
		new MiniCssExtractPlugin(),
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
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			// SCSS, CSS
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
