import { takeEvery, delay } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';

export const getState = state => state;

function* onInterviewSelectionClick(arg) {
	yield put({ type: 'INTERVIEW_SELECTION', interviewId: arg.interviewId });
}

export function* watchInterviewSelectionClick() {
	yield* takeEvery(['INTERVIEW_CLICK'], onInterviewSelectionClick);
}

function* onInterviewUnselectionClick() {
	yield put({ type: 'INTERVIEW_UNSELECTION' });
}

export function* watchInterviewUnselectionClick() {
	yield* takeEvery(['INTERVIEW_UNSELECTION_CLICK'], onInterviewUnselectionClick);
}

function* onEggClick(arg) {
	yield put({ type: 'EGG_SELECTION', eggId: arg.eggId });
}

export function* watchEggClick() {
	yield* takeEvery(['EGG_CLICK'], onEggClick);
}

function* fromMainToOrigin(arg) {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === arg.originId);
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'in', originId: arg.originId, zoom: origin.zoom });
	yield take('MAP_ZOOM_FINISHED');
	yield put({ type: 'ORIGIN_SELECTION', originId: arg.originId });
}

export function* watchOriginClick() {
	yield* takeEvery(['ORIGIN_CLICK'], fromMainToOrigin);
}

function* fromMainToInterview(arg) {
	yield fromMainToOrigin(arg);
	if (arg.eggId) yield put({ type: 'EGG_SELECTION', eggId: arg.eggId });
	yield put({ type: 'INTERVIEW_SELECTION', interviewId: arg.interviewId });
}

export function* watchDestinationInterviewClick() {
	yield* takeEvery(['DESTINATION_INTERVIEW_CLICK'], fromMainToInterview);
}

function* fromOriginToMain() {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === state.origins.selectedOriginId);
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'ORIGIN_UNSELECTION' });
	yield put({ type: 'MAP_ZOOM', direction: 'out', originId: origin._id });
	yield take('MAP_ZOOM_FINISHED');
}

function* onExitClick(arg) {
	if (arg.interviewId) yield put({ type: 'INTERVIEW_UNSELECTION' });
	else if (arg.eggId) yield put({ type: 'EGG_UNSELECTION' });
	else yield fromOriginToMain();
}

export function* watchExitClick() {
	yield* takeEvery(['EXIT_CLICK'], onExitClick);
}

function* changeOriginAndEggIfNecessary(currentStorie, nextStorie) {
	if (currentStorie.eggId && currentStorie.eggId !== nextStorie.eggId) {
		yield put({ type: 'EGG_UNSELECTION' });
	}
	if (currentStorie.originId !== nextStorie.originId) {
		yield fromOriginToMain();
		yield fromMainToOrigin({ originId: nextStorie.originId });
	}
	if (nextStorie.eggId && currentStorie.eggId !== nextStorie.eggId) {
		yield put({ type: 'EGG_SELECTION', eggId: nextStorie.eggId });
	}
}

function* onStorieClick(arg) {
	const state = yield select(getState);
	const currentStorieIndex = state.stories.data.filter(s => !s.future).length - 1;
	const currentStorie = state.stories.data[currentStorieIndex];
	const nextStorie = state.stories.data[arg.index];
	if (arg.mode) yield put({ type: 'EXPLORATION_SELECTION', mode: 'tour' });
	yield put(Object.assign({}, arg, { type: 'STORIE_SELECTION' }));
	switch (`${currentStorie.view}_${nextStorie.view}`) {
		case 'origin_main': {
			yield fromOriginToMain();
			break;
		}
		case 'interview_main': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			if (currentStorie.eggId) yield put({ type: 'EGG_UNSELECTION' });
			yield fromOriginToMain();
			break;
		}
		case 'egg_main': {
			yield put({ type: 'EGG_UNSELECTION' });
			yield fromOriginToMain();
			break;
		}
		case 'main_origin': {
			yield fromMainToOrigin({ originId: nextStorie.originId });
			break;
		}
		case 'origin_origin': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'egg_origin': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'interview_origin': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'main_egg': {
			yield fromMainToOrigin({ originId: nextStorie.originId });
			yield put({ type: 'EGG_SELECTION', eggId: nextStorie.eggId });
			break;
		}
		case 'origin_egg': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'egg_egg': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'interview_egg': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			break;
		}
		case 'main_interview': {
			yield fromMainToInterview(nextStorie);
			break;
		}
		case 'origin_interview': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: nextStorie.interviewId });
			break;
		}
		case 'egg_interview': {
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: nextStorie.interviewId });
			break;
		}
		case 'interview_interview': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(currentStorie, nextStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: nextStorie.interviewId });
			break;
		}
		default: break;
	}
}

export function* watchStorieClick() {
	yield* takeEvery(['STORIE_CLICK'], onStorieClick);
}

function* onExplorationClick(arg) {
	const state = yield select(getState);
	if (state.app.home) {
		yield put(Object.assign({}, arg, { type: 'EXPLORATION_SELECTION' }));
		yield put({ type: 'EXPLORATION_ANIMATION_NON_DESCRIPTIVE' });
		yield delay(400);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_SPLIT' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_OPEN' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_CENTERED' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_FINISHED' });
	} else {
		const message = arg.mode === 'interactive' ? 'Leave guided tour?' : 'Leave interactive mode?';
		if (window.confirm(message)) {
			if (arg.mode === 'tour') {
				yield onStorieClick.call(null, { index: 0, mode: 'tour' });
			} else {
				yield put({ type: 'EXPLORATION_SELECTION', mode: 'interactive' });
			}
		}
	}
}

export function* watchExplorationClick() {
	yield* takeEvery(['EXPLORATION_CLICK'], onExplorationClick);
}
