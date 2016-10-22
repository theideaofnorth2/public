import {
	watchOriginClick,
	watchEggClick,
	watchDestinationInterviewClick,
	watchEggSelection,
	watchInterviewSelection,
	watchInterviewSelectionClick,
	watchInterviewUnselectionClick,
	watchExitClick,
	watchStorieClick,
	watchExplorationClick,
} from './animation';
import { watchTourerClick } from './tour';
import { watchMediaEnd } from './media';
import watchApp from './app';
import loadConfig from './config';
import launchIntroduction from './introduction';

export default function* rootSaga() {
	yield [
		watchApp(),
		watchOriginClick(),
		watchDestinationInterviewClick(),
		watchEggSelection(),
		watchInterviewSelection(),
		watchInterviewSelectionClick(),
		watchInterviewUnselectionClick(),
		watchEggClick(),
		watchExitClick(),
		watchStorieClick(),
		watchTourerClick(),
		watchMediaEnd(),
		watchExplorationClick(),
		loadConfig(),
		launchIntroduction(),
	];
}
