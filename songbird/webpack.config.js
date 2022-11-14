const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const pages = ['main', 'quiz', 'results'];

module.exports = {
	entry: pages.reduce((config, page) => {
		config[page] = `./src/pages/${page}.js`;
		return config;
	}, {}),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].bundle.js',
	},
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
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'songbird',
			template: path.resolve(__dirname, './src/template.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
	],
};
