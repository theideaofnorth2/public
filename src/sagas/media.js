import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { lastPastIndex } from 'tion2/reducers/selectors/stories';
import { storieTransition } from './animation';

const getState = state => state;
const getNextIndex = (state, direction) => {
	const indexDiff = direction === 'previous' ? -1 : 1;
	return Math.min(
		state.stories.data.length - 1,
		Math.max(0, lastPastIndex(state) + indexDiff)
	);
};

function* onTourMediaEnd() {
	const state = yield select(getState);
	const currentStorie = state.stories.data[lastPastIndex(state)];
	const nextIndex = getNextIndex(state, 'next');
	const nextStorie = state.stories.data[nextIndex];
	yield put({ type: 'STORIE_SELECTION', index: nextIndex });
	yield storieTransition(currentStorie, nextStorie);
}

function* onInteractiveMediaEnd() {
	const state = yield select(getState);
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
}

function* onMediaEnd() {
	const state = yield select(getState);
	if (state.exploration.mode === 'tour') return yield onTourMediaEnd();
	return yield onInteractiveMediaEnd();
}

export function* watchMediaEnd() {
	yield* takeEvery(['AUDIO_END', 'VIDEO_END'], onMediaEnd);
}
