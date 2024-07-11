import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

// API
import {get, post} from '@rcd/api';

function* fetch({payload}: AnyAction) {
  try {
    const {type} = payload;

    const response = yield get(`/apiv1/sale/${type}`);

    yield put(createAction('data/FETCH_FORM_SUCCESS', response));
  } catch (error) {
    yield put(createAction('data/FETCH_FORM_FAILURE', {error}));
  }
}

function* submit({payload}: AnyAction) {
  try {
    const {type, data} = payload;

    const response = yield post(`/apiv1/sale/${type}`, data);

    yield put(createAction('data/SUBMIT_FORM_SUCCESS', response));
  } catch (error) {
    yield put(createAction('data/SUBMIT_FORM_FAILURE', {error}));
  }
}

export default function* (): SagaIterator {
  yield takeLatest('data/FETCH_FORM_REQUEST', fetch);
  yield takeLatest('data/SUBMIT_FORM_REQUEST', submit);
}
