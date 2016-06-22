import { takeEvery } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';

export const getState = state => state;

function* onOriginClick(arg) {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === arg.originId);
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'in', originId: arg.originId });
	yield take('MAP_ZOOM_FINISHED');
}

export function* watchOriginClick() {
	yield* takeEvery(['ORIGIN_CLICK'], onOriginClick);
}

function* onDestinationInterviewClick(arg) {
	yield onOriginClick(arg);
	yield put({ type: 'INTERVIEW_PLAY', interviewId: arg.interviewId });
}

export function* watchDestinationInterviewClick() {
	yield* takeEvery(['DESTINATION_INTERVIEW_CLICK'], onDestinationInterviewClick);
}

function* onOriginCloseClick() {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === state.origins.selectedOriginId);
	if (state.interviews.playingInterviewId) yield put({ type: 'INTERVIEW_STOP' });
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'out', originId: origin._id });
	yield take('MAP_ZOOM_FINISHED');
}

export function* watchOriginCloseClick() {
	yield* takeEvery(['ORIGIN_CLOSE'], onOriginCloseClick);
}

function* changeOriginIfNecessary(state, nextOriginId) {
	if (state.origins.selectedOriginId !== nextOriginId) {
		yield put({ type: 'ORIGIN_CLOSE' });
		yield take('MAP_ZOOM_FINISHED');
		yield put({ type: 'ORIGIN_CLICK', originId: nextOriginId });
		yield take('MAP_ZOOM_FINISHED');
	}
}

function* onStorieClick() {
	const state = yield select(getState);
	const currentStorie = state.stories.data[state.stories.currentIndex];
	const nextStorie = state.stories.data[state.stories.nextIndex];
	switch (`${currentStorie.view}_${nextStorie.view}`) {
		case 'origin_main': {
			yield put({ type: 'ORIGIN_CLOSE' });
			yield take('MAP_ZOOM_FINISHED');
			break;
		}
		case 'interview_main': {
			yield put({ type: 'ORIGIN_CLOSE' });
			yield take('MAP_ZOOM_FINISHED');
			break;
		}
		case 'egg_main': {
			yield put({ type: 'ORIGIN_CLOSE' });
			yield take('MAP_ZOOM_FINISHED');
			break;
		}
		case 'main_origin': {
			yield put({ type: 'ORIGIN_CLICK', originId: nextStorie.originId });
			yield take('MAP_ZOOM_FINISHED');
			break;
		}
		case 'origin_origin': {
			yield changeOriginIfNecessary(state, nextStorie.originId);
			break;
		}
		case 'egg_origin': {
			yield put({ type: 'EGG_CLOSE' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			break;
		}
		case 'interview_origin': {
			yield put({ type: 'INTERVIEW_STOP' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			break;
		}
		case 'main_egg': {
			yield put({ type: 'ORIGIN_CLICK', originId: nextStorie.originId });
			yield take('MAP_ZOOM_FINISHED');
			yield put({ type: 'EGG_CLICK', eggId: nextStorie.eggId });
			break;
		}
		case 'origin_egg': {
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'EGG_CLICK', eggId: nextStorie.eggId });
			break;
		}
		case 'egg_egg': {
			yield put({ type: 'EGG_CLOSE' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'EGG_CLICK', eggId: nextStorie.eggId });
			break;
		}
		case 'interview_egg': {
			yield put({ type: 'INTERVIEW_STOP' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'EGG_CLICK', eggId: nextStorie.eggId });
			break;
		}
		case 'main_interview': {
			yield put({
				type: 'DESTINATION_INTERVIEW_CLICK',
				interviewId: nextStorie.interviewId,
				originId: nextStorie.originId,
			});
			yield take('MAP_ZOOM_FINISHED');
			break;
		}
		case 'origin_interview': {
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'INTERVIEW_CLICK', interviewId: nextStorie.interviewId });
			break;
		}
		case 'egg_interview': {
			yield put({ type: 'EGG_CLOSE' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'INTERVIEW_CLICK', interviewId: nextStorie.interviewId });
			break;
		}
		case 'interview_interview': {
			yield put({ type: 'INTERVIEW_STOP' });
			yield changeOriginIfNecessary(state, nextStorie.originId);
			yield put({ type: 'INTERVIEW_CLICK', interviewId: nextStorie.interviewId });
			break;
		}
		default: break;
	}
	yield put({ type: 'STORIE_ANIMATION_END' });
}

export function* watchStorieClick() {
	yield* takeEvery(['STORIE_CLICK'], onStorieClick);
}
