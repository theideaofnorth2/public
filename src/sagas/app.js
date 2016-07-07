import { takeEvery } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

export function* initApp() {
	yield [take('MAP_READY'), take('CONFIG_READY'), take('ZOOMERS_MOUNTED')];
	yield put({ type: 'APP_READY' });
}

export function* watchApp() {
	yield* takeEvery(['CONFIG_FETCH'], initApp);
}
