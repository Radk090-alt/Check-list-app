import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

function* logout(): SagaIterator {
  yield put(createAction('data/RESET'));
  yield put(createAction('accessToken/PURGE'));

  yield put(createAction('profileScreen/LOGGED_OUT'));
  yield put(createAction('app/LOGGING_OUT'));
}

export default function* (): SagaIterator {
  yield takeLatest('profileScreen/LOGOUT', logout);
}
