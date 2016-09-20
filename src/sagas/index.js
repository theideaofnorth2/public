import {
	watchOriginClick,
	watchEggClick,
	watchDestinationInterviewClick,
	watchInterviewSelection,
	watchInterviewSelectionClick,
	watchInterviewUnselectionClick,
	watchExitClick,
	watchStorieClick,
	watchTourerClick,
	watchExplorationClick,
} from './animation';
import { watchApp } from './app';
import { loadConfig } from './config';
import { launchIntroduction } from './introduction';

export default function *rootSaga() {
	yield [
		watchApp(),
		watchOriginClick(),
		watchDestinationInterviewClick(),
		watchInterviewSelection(),
		watchInterviewSelectionClick(),
		watchInterviewUnselectionClick(),
		watchEggClick(),
		watchExitClick(),
		watchStorieClick(),
		watchTourerClick(),
		watchExplorationClick(),
		loadConfig(),
		launchIntroduction(),
	];
}
