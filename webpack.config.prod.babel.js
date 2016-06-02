import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'main'),
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[name].js',
		publicPath: '',
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
		}),
		new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') },
		}),
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
		new webpack.IgnorePlugin(/\.png|\.jpg$/),
	],
	resolve: {
		alias: {
			tion2: path.resolve(__dirname, 'src'),
			tion2Static: path.resolve(__dirname, 'static'),
		},
		extensions: ['', '.js', '.jsx', '.json', '.css'],
	},
	module: {
		preLoaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
		loaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'babel',
				exclude: /node_modules/,
			},
			{
				test: /\.json$/,
				loader: 'json',
				exclude: [/node_modules/],
			},
			{
				test: /\.woff$|\.ttf$/,
				loader: 'file-loader?name=[name].[ext]',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&localIdentName=[local]--[hash:base64:5]'
				),
				exclude: [/node_modules/],
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&localIdentName=[local]'
				),
				include: [/node_modules/],
			},
			{
				test: /\.svg$/,
				loader: 'raw-loader',
			},
		],
	},
};
