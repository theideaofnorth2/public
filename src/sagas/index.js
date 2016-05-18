import { watchApp } from './app';
import { loadConfig } from './config';

export default function *rootSaga() {
	yield [
		watchApp(),
		loadConfig(),
	];
}
