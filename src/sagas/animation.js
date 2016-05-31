import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

const conditions = {};

function *animateMap(arg) {
	console.log('arg', arg);
	conditions[arg.type] = true;
	if (conditions.MAP_READY && conditions.CONFIG_READY) {
		yield put({ type: 'MAP_ANIMATION_START' });
	}
}

export function *watchMapAnimation() {
	yield* takeEvery(['ORIGIN_CLICK'], animateMap);
}
