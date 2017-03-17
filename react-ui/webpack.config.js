var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'react-ui.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: APP_DIR,
				loader: 'babel-loader',
				query:
				{
					presets: ['es2015', 'react']
				}
			},
			{
		  	test: /\.css$/,
		  	loader: "style-loader!css-loader"
		  }
		]
	}
};

module.exports = config;
