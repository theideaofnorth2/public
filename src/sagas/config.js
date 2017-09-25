import { call, put } from 'redux-saga/effects';
import { getApiUri } from 'tion2/utils/tools';
import { store } from 'tion2/store';

export default function* loadConfig() {
  yield put({ type: 'CONFIG_FETCH' });
  const isLight = store.getState().app.isLight;
  const configResponse = yield call(window.fetch, getApiUri(isLight));
  const config = yield configResponse.json();
  yield put({ type: 'CONFIG_READY', data: config });
}
