import analytics from '@react-native-firebase/analytics';
import {pathOr} from 'ramda';
import {Alert, Keyboard} from 'react-native';
import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, race, take, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

function* login({payload}: AnyAction) {
  const {username, password, crm} = payload;

  Keyboard.dismiss();

  yield put(createAction('app/SET_CRM', {crm}));
  yield put(createAction('data/LOGIN_REQUEST', {username, password}));

  const {success, failure} = yield race({
    success: take('data/LOGIN_SUCCESS'),
    failure: take('data/LOGIN_FAILURE'),
  });

  if (failure) {
    const errorCode: number = pathOr(0, ['payload', 'error', 'data', 'error_code'], failure);

    const messages: Record<number, string[]> = {
      0: ['Грешка', 'Системна грешка'],
      101: ['Грешка', 'Невалидно потребителско име или парола'],
    };

    Alert.alert(messages[errorCode][0], messages[errorCode][1]);

    return yield put(createAction('loginScreen/ERROR'));
  }

  yield put(
    createAction('accessToken/SET', {
      token: pathOr(undefined, ['payload', 'access_token'], success),
      expiresIn: undefined,
    }),
  );

  yield put(createAction('data/FETCH_USER_REQUEST'));

  const {failure: userFailure} = yield race({
    success: take('data/FETCH_USER_SUCCESS'),
    failure: take('data/FETCH_USER_FAILURE'),
  });

  if (userFailure) {
    return yield put(createAction('accessToken/PURGE'));
  }

  yield analytics().logLogin({method: 'username'});

  yield put(createAction('loginScreen/SUCCESS'));
}

export default function* (): SagaIterator {
  yield takeLatest('loginScreen/SUBMIT', login);
}
