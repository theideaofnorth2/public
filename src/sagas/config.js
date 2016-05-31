import { call, put } from 'redux-saga/effects';

export function *loadConfig() {
	yield put({ type: 'CONFIG_FETCH' });
	const configResponse = yield call(fetch, 'http://theideaofnorth2.com/api/');
	const config = yield configResponse.json();
	yield put({ type: 'CONFIG_READY', data: config });
}
