const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './assets/js/index.js',
	output: {
		filename: 'js/script.js',
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new BrowserSyncPlugin({
			server: {baseDir: ['public'] },
			open: false
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new HtmlWebpackPlugin({
			template: './assets/pug/index.pug',
			inject: true
		})
	],
	resolve: {
        alias: {
            "./dependencyLibs/inputmask.dependencyLib": "./dependencyLibs/inputmask.dependencyLib.jquery"
        }
    },
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.pug$/,
				loaders: [ 'pug-loader' ]
			},
			{
				test: /\.(svg|png|jpe?g)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: 'img/[name].[ext]'
					}
				}],
			},
			{
				test: /\.ttf$/,
				use: [ {
					loader: 'file-loader',
					options:{
						name: '/fonts/[name].[ext]'
					}
				}],

			}
			
		]
	}
}