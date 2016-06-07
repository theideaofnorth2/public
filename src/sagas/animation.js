import { takeEvery } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';

export const getState = state => state;

export function* animationIn(arg) {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === arg.originId);
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'in', originId: arg.originId });
	yield take('MAP_ZOOM_FINISHED');
	if (arg.interviewId) yield put({ type: 'INTERVIEW_PLAY', interviewId: arg.interviewId });
}

export function* watchAnimationIn() {
	yield* takeEvery(['ORIGIN_CLICK', 'DESTINATION_INTERVIEW_CLICK'], animationIn);
}

export function* animationOut() {
	const state = yield select(getState);
	const origin = state.origins.data.find(o => o._id === state.origins.selectedOriginId);
	if (state.interviews.playingInterviewId) yield put({ type: 'INTERVIEW_STOP' });
	yield put({ type: 'MAP_CENTER', center: { lat: origin.lat, lng: origin.lng } });
	yield take('MAP_CENTER_FINISHED');
	yield put({ type: 'MAP_ZOOM', direction: 'out', originId: origin._id });
	yield take('MAP_ZOOM_FINISHED');
}

export function* watchAnimationOut() {
	yield* takeEvery(['ORIGIN_CLOSE'], animationOut);
}
