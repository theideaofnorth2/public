import { takeEvery } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';

export const getState = state => state;

export function* animationIn(arg) {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === arg.origin);
	const interview = arg.interview;
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'in', origin: origin._id });
	yield take('MAP_ZOOM_FINISHED');
	yield put({ type: 'INTERVIEW_PLAY', interview });
}

export function* watchAnimationIn() {
	yield* takeEvery(['ORIGIN_CLICK', 'DESTINATION_INTERVIEW_CLICK'], animationIn);
}

export function* animationOut() {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === state.origins.selectedOrigin);
	yield put({ type: 'INTERVIEW_STOP' });
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'out', origin: origin._id });
	yield take('MAP_ZOOM_FINISHED');
}

export function* watchAnimationOut() {
	yield* takeEvery(['ORIGIN_CLOSE'], animationOut);
}
