import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, race, take, takeLatest} from 'redux-saga/effects';
import {createAction} from '@rcd/utility/store';
import {pathOr} from 'ramda';

function* opened() {
  //
}

function* search({payload}: AnyAction) {
  const {keyword} = payload;

  yield put(createAction('searchByTextRecognitionScreen/SET_LOADING', {isLoading: true}));
  yield put(createAction('data/FETCH_MACHINES_REQUEST', {keyword}));

  const {success} = yield race({
    success: take('data/FETCH_MACHINES_SUCCESS'),
    failure: take('data/FETCH_MACHINES_FAILURE'),
  });

  const id = pathOr<number | undefined>(undefined, ['payload', 'result', '0'], success);

  if (id) {
    const machine = pathOr(undefined, ['payload', 'entities', 'machines', id], success);

    yield put(createAction('searchByTextRecognitionScreen/SET_LOADING', {isLoading: false}));

    yield put(
      createAction('navigation/PUSH', {
        name: 'service/Machine',
        params: {machine},
      }),
    );
  }
}

export default function* (): SagaIterator {
  yield takeLatest('searchByTextRecognitionScreen/OPENED', opened);
  yield takeLatest('searchByTextRecognitionScreen/SEARCH', search);
}
