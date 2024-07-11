import moment from 'moment';
import {pathOr} from 'ramda';
import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {actionChannel, put, race, select, take} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

// Selectors
import accessTokenSelectors from '@rcd/store/selectors/accessTokenSelector';

export default function* checkToken(): SagaIterator {
  const regex = /^api\/((?!REFRESH_TOKEN).*)_REQUEST/;
  const channel = yield actionChannel(({type}: AnyAction) => regex.test(type));

  while (true) {
    yield take(channel);

    const {token, expires} = yield select(accessTokenSelectors);
    const nextFiveMinutes = moment().add(5, 'minutes');

    if (!token || !expires || moment(expires).isSameOrAfter(nextFiveMinutes)) {
      continue;
    }

    yield put(createAction('data/REFRESH_TOKEN_REQUEST'));

    const {success, failure} = yield race({
      success: take('data/REFRESH_TOKEN_SUCCESS'),
      failure: take('data/REFRESH_TOKEN_FAILURE'),
    });

    if (failure) {
      yield put(createAction('accessToken/PURGE'));

      return yield put(createAction('navigation/NAVIGATE', {name: 'auth'}));
    }

    yield put(
      createAction('accessToken/SET', {
        token: pathOr(undefined, ['payload', 'token', 'access_token'], success),
        expiresIn: pathOr(undefined, ['payload', 'token', 'expires_in'], success),
      }),
    );
  }
}
