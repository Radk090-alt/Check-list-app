import {AnyAction} from 'redux';
import {normalize} from 'normalizr';
import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

// API
import {get} from '@rcd/api';
import machineSchema from '@rcd/api/schemas/Machine';

function* fetch({payload}: AnyAction) {
  try {
    const {keyword, category_id} = payload;

    const response = yield get('/api/machines', {
      search: keyword,
      category_id,
    });

    yield put(createAction('data/FETCH_MACHINES_SUCCESS', normalize(response, [machineSchema])));
  } catch (error) {
    yield put(createAction('data/FETCH_MACHINES_FAILURE', {error}));
  }
}

function* find({payload}: AnyAction) {
  try {
    const {machineId} = payload;

    const response = yield get(`/api/machines/id/${machineId}`);

    yield put(createAction('data/FETCH_MACHINE_SUCCESS', normalize(response, machineSchema)));
  } catch (error) {
    yield put(createAction('data/FETCH_MACHINE_FAILURE', {error}));
  }
}

export default function* (): SagaIterator {
  yield takeLatest('data/FETCH_MACHINES_REQUEST', fetch);
  yield takeLatest('data/FETCH_MACHINE_REQUEST', find);
}
