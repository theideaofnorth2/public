import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

const getState = state => state;

function* onMediaEnd() {
	const state = yield select(getState);
	if (state.exploration.mode === 'tour') {
		return yield put({
			type: 'TOURER_CLICK',
			direction: 'next',
		});
	}
	if (state.interviews.selectedInterviewId) {
		yield put({
			type: 'EXIT_INTERVIEW_CLICK',
			eggId: state.eggs.selectedEggId,
			originId: state.origins.selectedOriginId,
		});
	} else if (state.eggs.selectedEggId) {
		yield put({
			type: 'EXIT_EGG_CLICK',
			originId: state.origins.selectedOriginId,
		});
	}
	return true;
}

export function* watchMediaEnd() {
	yield* takeEvery(['AUDIO_END', 'VIDEO_END'], onMediaEnd);
}
