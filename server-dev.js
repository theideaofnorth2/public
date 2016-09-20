import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev.babel.js';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	stats: {
		chunks: false,
		colors: true,
	},
	publicPath: config.output.publicPath,
}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen(8081, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:8081');
});
