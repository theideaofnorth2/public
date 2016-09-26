import { take, put, fork, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* playIntroduction() {
	try {
		while (true) {
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_ORIGIN_SHOW' });
			yield delay(500);
			yield put({ type: 'INTRODUCTION_ORIGIN_UNTRANSLATE' });
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_TEXT1_SHOW' });
			yield delay(3000);
			yield put({ type: 'INTRODUCTION_TEXT1_HIDE' });
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_TEXT2_SHOW' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_IMAGE_SHOW' });
			yield delay(500);
			yield put({ type: 'INTRODUCTION_MAP_UNTRANSLATE' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_DISTANCE_GROW' });
			yield delay(2500);
			yield put({ type: 'INTRODUCTION_DESTINATION_SHOW' });
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_TEXT2_HIDE' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_MAP_ELEMENTS_HIDE' });
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_TEXT3_SHOW' });
			yield delay(1000);
			yield put({ type: 'INTRODUCTION_IMAGE_ROTATE' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_TEXT3_HIDE' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_TEXT4_SHOW' });
			yield delay(4000);
			yield put({ type: 'INTRODUCTION_TEXT4_HIDE' });
			yield delay(2000);
			yield put({ type: 'INTRODUCTION_END' });
		}
	} finally {
		if (yield cancelled()) {
			console.log('cancelled');
		}
	}
}

export function* launchIntroduction() {
	const introductionTask = yield fork(playIntroduction);
	yield take('INTRODUCTION_SKIP');
	yield cancel(introductionTask);
}
