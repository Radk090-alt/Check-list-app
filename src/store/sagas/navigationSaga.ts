import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {call, takeLatest} from 'redux-saga/effects';

import {back, navigate, push, pop} from '@rcd/utility/navigation';

function* handleNavigate({payload}: AnyAction) {
  const {name, params} = payload;

  yield call(navigate, {name, params});
}

function* handlePush({payload}: AnyAction) {
  const {name, params} = payload;

  yield call(push, {name, params});
}

function* handlePop({payload}: AnyAction) {
  const {times} = payload;

  yield call(pop, times);
}

function* handleBack() {
  yield call(back);
}

export default function* (): SagaIterator {
  yield takeLatest('navigation/NAVIGATE', handleNavigate);
  yield takeLatest('navigation/PUSH', handlePush);
  yield takeLatest('navigation/BACK', handleBack);
  yield takeLatest('navigation/POP', handlePop);

}
