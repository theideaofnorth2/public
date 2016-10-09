import { takeEvery, delay } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { lastPastIndex } from 'tion2/reducers/selectors/stories';

export const getState = state => state;

function* onEggSelection(arg) {
	const state = yield select(getState);
	const egg = state.eggs.data.find(e => e._id === arg.eggId);
	yield put({ type: 'PLAYER_EGG', egg });
}

export function* watchEggSelection() {
	yield* takeEvery(['EGG_SELECTION'], onEggSelection);
}

function* onInterviewSelection(arg) {
	const state = yield select(getState);
	const interview = state.interviews.data.find(i => i._id === arg.interviewId);
	const themes = state.themes.data;
	yield put({ type: 'PLAYER_INTERVIEW', interview, themes });
}

export function* watchInterviewSelection() {
	yield* takeEvery(['INTERVIEW_SELECTION'], onInterviewSelection);
}

function* onInterviewSelectionClick(arg) {
	yield put({ type: 'INTERVIEW_SELECTION', interviewId: arg.interviewId });
}

export function* watchInterviewSelectionClick() {
	yield* takeEvery(['INTERVIEW_CLICK'], onInterviewSelectionClick);
}

function* onExitInterviewClick() {
	yield put({ type: 'INTERVIEW_UNSELECTION' });
}

export function* watchInterviewUnselectionClick() {
	yield* takeEvery(['EXIT_INTERVIEW_CLICK'], onExitInterviewClick);
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

export function* watchExitClick() {
	yield* takeEvery(['EXIT_ORIGIN_CLICK'], fromOriginToMain);
}

function* changeOriginAndEggIfNecessary(fromStorie, toStorie) {
	if (fromStorie.eggId && fromStorie.eggId !== toStorie.eggId) {
		yield put({ type: 'EGG_UNSELECTION' });
	}
	if (fromStorie.originId !== toStorie.originId) {
		yield fromOriginToMain();
		yield fromMainToOrigin({ originId: toStorie.originId });
	}
	if (toStorie.eggId && fromStorie.eggId !== toStorie.eggId) {
		yield put({ type: 'EGG_SELECTION', eggId: toStorie.eggId });
	}
}

function* storieTransition(fromStorie, toStorie) {
	switch (`${fromStorie.view}_${toStorie.view}`) {
		case 'origin_main': {
			yield fromOriginToMain();
			break;
		}
		case 'interview_main': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			if (fromStorie.eggId) yield put({ type: 'EGG_UNSELECTION' });
			yield fromOriginToMain();
			break;
		}
		case 'egg_main': {
			yield put({ type: 'EGG_UNSELECTION' });
			yield fromOriginToMain();
			break;
		}
		case 'main_origin': {
			yield fromMainToOrigin({ originId: toStorie.originId });
			break;
		}
		case 'origin_origin': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'egg_origin': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'interview_origin': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'main_egg': {
			yield fromMainToOrigin({ originId: toStorie.originId });
			yield put({ type: 'EGG_SELECTION', eggId: toStorie.eggId });
			break;
		}
		case 'origin_egg': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'egg_egg': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'interview_egg': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			break;
		}
		case 'main_interview': {
			yield fromMainToInterview(toStorie);
			break;
		}
		case 'origin_interview': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: toStorie.interviewId });
			break;
		}
		case 'egg_interview': {
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: toStorie.interviewId });
			break;
		}
		case 'interview_interview': {
			yield put({ type: 'INTERVIEW_UNSELECTION' });
			yield changeOriginAndEggIfNecessary(fromStorie, toStorie);
			yield put({ type: 'INTERVIEW_SELECTION', interviewId: toStorie.interviewId });
			break;
		}
		default: break;
	}
}

function* onStorieClick(arg) {
	const state = yield select(getState);
	const currentStorie = state.stories.data[lastPastIndex(state)];
	const nextStorie = state.stories.data[arg.index];
	yield put(Object.assign({}, arg, { type: 'STORIE_SELECTION' }));
	yield storieTransition(currentStorie, nextStorie);
}

export function* watchStorieClick() {
	yield* takeEvery(['STORIE_CLICK'], onStorieClick);
}

function* onExplorationClick(arg) {
	const state = yield select(getState);
	const message = arg.mode === 'interactive' ? 'Leave guided tour?' : 'Leave interactive mode?';
	if (state.app.view !== 'waiting' && state.app.view !== 'home' &&
		!window.confirm(message)
	) return false;
	const currentStorie = state.stories.data[lastPastIndex(state)];
	const firstStorie = state.stories.data[0];
	yield put(Object.assign({}, arg, { type: 'EXPLORATION_SELECTION' }));
	if (state.app.view === 'waiting' || state.app.view === 'home') {
		yield put({ type: 'EXPLORATION_ANIMATION_START' });
		yield delay(400);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_SPLIT' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_OPEN' });
		yield delay(300);
		yield put({ type: 'EXPLORATION_MOUSE_LEAVE' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_NON_CENTERED' });
		yield delay(1000);
		yield put({ type: 'EXPLORATION_ANIMATION_FINISHED' });
	}
	if (arg.mode === 'tour') yield storieTransition(currentStorie, firstStorie);
	return true;
}

export function* watchExplorationClick() {
	yield* takeEvery(['EXPLORATION_CLICK'], onExplorationClick);
}

function* onTourerClick(arg) {
	const state = yield select(getState);
	const currentStorie = state.stories.data[lastPastIndex(state)];
	const indexDiff = arg.direction === 'previous' ? -1 : 1;
	const nextIndex = Math.min(
		state.stories.data.length - 1,
		Math.max(0, lastPastIndex(state) + indexDiff)
	);
	const nextStorie = state.stories.data[nextIndex];
	yield put(Object.assign({}, { type: 'STORIE_SELECTION', index: nextIndex }));
	yield storieTransition(currentStorie, nextStorie);
}

export function* watchTourerClick() {
	yield* takeEvery(['TOURER_CLICK'], onTourerClick);
}
