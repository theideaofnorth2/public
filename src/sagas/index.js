import {
	watchOriginClick,
	watchDestinationInterviewClick,
	watchOriginCloseClick,
	watchStorieClick,
} from './animation';
import { watchApp } from './app';
import { loadConfig } from './config';

export default function *rootSaga() {
	yield [
		watchApp(),
		watchOriginClick(),
		watchDestinationInterviewClick(),
		watchOriginCloseClick(),
		watchStorieClick(),
		loadConfig(),
	];
}
