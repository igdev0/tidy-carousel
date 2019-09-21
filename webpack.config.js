const path = require('path');
const webpack = require('webpack');

const config = {
	name: 'client',
	mode: process.env.NODE_ENV || 'development',
	entry: ['babel-polyfill', './dev/index'],
	output: {
		publicPath: './dist',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	performance: {
	 maxEntrypointSize: 512000,
	 maxAssetSize: 512000
 },
 	plugins: [
   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
   new webpack.optimize.ModuleConcatenationPlugin(),
   new webpack.NoEmitOnErrorsPlugin()
 ],
	module: {
		rules: [
			{
				test: /\.scss/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
					{loader: "sass-loader", options: {includePaths: ["./dev/scss", './dev/sass']}}
				]
			},
			{
		        test: /\.(png|jpg|gif)$/i,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              fallback: 'responsive-loader',
		            },
		          },
		        ],
		    }
		]
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		writeToDisk: true,
		port: 3000
	}
}

module.exports = config;
