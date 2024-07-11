import {pathOr} from 'ramda';
import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {delay, put, race, take, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';
import {Alert} from 'react-native';

function* opened({payload}: AnyAction): SagaIterator {
  yield put(
    createAction('createFormScreen/SET_LOADING', {
      isLoading: true,
    }),
  );

  const {type} = payload;
  yield put(createAction('data/FETCH_FORM_REQUEST', {type}));

  const {success} = yield race({
    success: take('data/FETCH_FORM_SUCCESS'),
    failure: take('data/FETCH_FORM_FAILURE'),
  });

  const form = pathOr([], ['payload', 'fields'], success);

  yield put(createAction('createFormScreen/SET_FORM', {form}));

  yield put(
    createAction('createFormScreen/SET_LOADING', {
      isLoading: false,
    }),
  );
}

function* submit({payload}: AnyAction): SagaIterator {
  yield put(
    createAction('createFormScreen/SET_LOADING', {
      isLoading: true,
    }),
  );

  const {type, data} = payload;
  yield put(createAction('data/SUBMIT_FORM_REQUEST', {type, data}));

  const {success} = yield race({
    success: take('data/SUBMIT_FORM_SUCCESS'),
    failure: take('data/SUBMIT_FORM_FAILURE'),
  });

  if (success) {
    yield put(createAction('navigation/NAVIGATE', {name: 'forms/Success'}));
  } else {
    Alert.alert('Сървърна грешка');
  }

  yield delay(200);
  yield put(
    createAction('createFormScreen/SET_LOADING', {
      isLoading: false,
    }),
  );
}

export default function* (): SagaIterator {
  yield takeLatest('createFormScreen/OPENED', opened);
  yield takeLatest('createFormScreen/SUBMIT', submit);
}
