import path from 'path';
import webpack from 'webpack';

module.exports = {
	devtool: '#inline-source-map',
	entry: [
		path.join(__dirname, 'src', 'main'),
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[name].js',
	},
	resolve: {
		alias: {
			tion2: path.resolve(__dirname, 'src'),
			tion2Static: path.resolve(__dirname, 'static'),
		},
		extensions: ['', '.js', '.jsx', '.json', '.css'],
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': { 	NODE_ENV: JSON.stringify('development') },
		}),
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
		new webpack.IgnorePlugin(/\.png|\.jpg$/),
	],
	module: {
		preLoaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'eslint-loader',
				exclude: [/node_modules/, /zoomer/],
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
				loader: 'style-loader!css-loader?modules&localIdentName=[local]--[hash:base64:5]',
				exclude: [/node_modules/],
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&localIdentName=[local]',
				include: [/node_modules/],
			},
			{
				test: /\.svg$/,
				loader: 'raw-loader',
			},
		],
	},
};
