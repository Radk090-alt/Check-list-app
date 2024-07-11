import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

// API
import {get, post} from '@rcd/api';

// Entities
import {User} from '@rcd/entities';

function* login({payload}: AnyAction) {
  try {
    const {username, password} = payload;

    interface LoginResponse {
      user: User;
      access_token: string;
    }

    const {user, access_token}: LoginResponse = yield post('/api/login', {
      username,
      password,
    });

    yield put(createAction('data/LOGIN_SUCCESS', {user, access_token}));
  } catch (error) {
    yield put(createAction('data/LOGIN_FAILURE', {error}));
  }
}

function* fetch() {
  try {
    interface FetchResponse {
      user: User;
    }

    const {user}: FetchResponse = yield get('/api/me');

    yield put(createAction('data/FETCH_USER_SUCCESS', {user}));
  } catch (error) {
    yield put(createAction('data/FETCH_USER_FAILURE', {error}));
  }
}

export default function* (): SagaIterator {
  yield takeLatest('data/LOGIN_REQUEST', login);
  yield takeLatest('data/FETCH_USER_REQUEST', fetch);
}
