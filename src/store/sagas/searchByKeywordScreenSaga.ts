import {SagaIterator} from 'redux-saga';
import {delay, put, race, take, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';
import {AnyAction} from 'redux';
import {pathOr} from 'ramda';
import {Keyboard} from 'react-native';

function* opened() {
  //
}

function* search({payload}: AnyAction) {
  const {keyword} = payload;

  yield Keyboard.dismiss();

  yield put(createAction('searchByKeywordScreen/SET_LOADING', {isLoading: true}));
  yield put(createAction('searchByKeywordScreen/SET_KEYWORD', {keyword}));

  yield put(createAction('data/FETCH_MACHINES_REQUEST', {keyword}));

  const {success} = yield race({
    success: take('data/FETCH_MACHINES_SUCCESS'),
    failure: take('data/FETCH_MACHINES_FAILURE'),
  });

  const machineIds = pathOr([], ['payload', 'result'], success);

  yield put(createAction('searchByKeywordScreen/SET_MACHINES', {machineIds}));
  yield delay(200);
  yield put(createAction('searchByKeywordScreen/SET_LOADING', {isLoading: false}));
}

function* selectMachine({payload}: AnyAction) {
  const {machine} = payload;

  yield put(
    createAction('navigation/PUSH', {
      name: 'service/Machine',
      params: {machine},
    }),
  );
}

export default function* (): SagaIterator {
  yield takeLatest('searchByKeywordScreen/OPENED', opened);
  yield takeLatest('searchByKeywordScreen/SEARCH', search);
  yield takeLatest('searchByKeywordScreen/SELECT_MACHINE', selectMachine);
}
