import {
	watchOriginClick,
	watchEggClick,
	watchDestinationInterviewClick,
	watchInterviewSelectionClick,
	watchInterviewUnselectionClick,
	watchExitClick,
	watchStorieClick,
} from './animation';
import { watchApp } from './app';
import { loadConfig } from './config';

export default function *rootSaga() {
	yield [
		watchApp(),
		watchOriginClick(),
		watchDestinationInterviewClick(),
		watchInterviewSelectionClick(),
		watchInterviewUnselectionClick(),
		watchEggClick(),
		watchExitClick(),
		watchStorieClick(),
		loadConfig(),
	];
}
