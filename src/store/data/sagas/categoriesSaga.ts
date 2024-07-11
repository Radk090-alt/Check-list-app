import {AnyAction} from 'redux';
import {normalize} from 'normalizr';
import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

// API
import {get} from '@rcd/api';
import categorySchema from '@rcd/api/schemas/Category';

function* fetch({payload}: AnyAction) {
  try {
    const {parent_id} = payload;

    const response = yield get('/api/categories', {
      parent_id,
    });

    yield put(
      createAction(
        'data/FETCH_CATEGORIES_SUCCESS',
        normalize(response, [categorySchema]),
      ),
    );
  } catch (error) {
    yield put(createAction('data/FETCH_CATEGORIES_FAILURE', {error}));
  }
}

export default function* (): SagaIterator {
  yield takeLatest('data/FETCH_CATEGORIES_REQUEST', fetch);
}
