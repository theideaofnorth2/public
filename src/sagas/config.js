import { call, put } from 'redux-saga/effects';
import { baseUri } from 'tion2/utils/tools';

const apiUri = `${baseUri}/api/`;

export function* loadConfig() {
	yield put({ type: 'CONFIG_FETCH' });
	const configResponse = yield call(fetch, apiUri);
	const config = yield configResponse.json();
	yield put({ type: 'CONFIG_READY', data: config });
}
