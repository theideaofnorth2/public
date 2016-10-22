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

function* onTourerClick(arg) {
	const state = yield select(getState);
	const currentStorie = state.stories.data[lastPastIndex(state)];
	const nextIndex = getNextIndex(state, arg.direction);
	const nextStorie = state.stories.data[nextIndex];
	yield put({ type: 'STORIE_SELECTION', index: nextIndex });
	yield storieTransition(currentStorie, nextStorie);
}

export function* watchTourerClick() {
	yield* takeEvery(['TOURER_CLICK'], onTourerClick);
}
