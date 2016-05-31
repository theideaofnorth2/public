import { watchApp } from './app';
import { watchMapAnimation } from './animation';
import { loadConfig } from './config';

export default function *rootSaga() {
	yield [
		watchApp(),
		watchMapAnimation(),
		loadConfig(),
	];
}
