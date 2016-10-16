import { call, put } from 'redux-saga/effects';
import { apiUri } from 'tion2/utils/tools';

export default function* loadConfig() {
	yield put({ type: 'CONFIG_FETCH' });
	const configResponse = yield call(window.fetch, apiUri);
	const config = yield configResponse.json();
	yield put({ type: 'CONFIG_READY', data: config });
}
