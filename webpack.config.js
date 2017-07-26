var path = require('path');
var webpack = require('webpack');

module.exports = {
	
	devtool: 'eval-source-map',
	// 入口文件
	entry: __dirname + '/src/index.js',
	// output
	output: {
		path: __dirname + '/public',
		publicPath: 'public/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias:{
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		loaders: [
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			exclude: /node_modules/
		},{
			test: /\.js$/,
			loader: 'babel-loader?presets=es2015',
			exclude:/node_modules/,
			query:{
				presets: ['es2015'],
				plugins: ['transform-runtime','transform-vue-jsx']
				}
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase: './public',
		inline: true
	}
};