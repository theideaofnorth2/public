import { watchApp } from './app';
import { watchAnimationIn, watchAnimationOut } from './animation';
import { loadConfig } from './config';

export default function *rootSaga() {
	yield [
		watchApp(),
		watchAnimationIn(),
		watchAnimationOut(),
		loadConfig(),
	];
}
