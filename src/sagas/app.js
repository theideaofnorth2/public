import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

const conditions = {};

export function *initApp(arg) {
	conditions[arg.type] = true;
	if (conditions.MAP_READY && conditions.CONFIG_READY) {
		yield put({ type: 'APP_READY' });
	}
}

export function *watchApp() {
	yield* takeEvery(['MAP_READY', 'CONFIG_READY'], initApp);
}
