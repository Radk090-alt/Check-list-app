import analytics from '@react-native-firebase/analytics';
import {StatusBar} from 'react-native';
import {SagaIterator} from 'redux-saga';
import {AnyAction} from 'redux';
import {all, call, delay, put, race, select, take, takeLatest} from 'redux-saga/effects';

// Selectors
import accessTokenSelector from '@rcd/store/selectors/accessTokenSelector';

// Utility
import {createAction} from '@rcd/utility/store';
import {api} from '@rcd/api/client';
import appSelector from '../selectors/appSelector';

function* initApp() {
  yield StatusBar.setHidden(true, 'fade');

  const animationDelay = 1000;

  yield all([call(setupApp), delay(animationDelay)]);

  yield put(createAction('app/INITIALIZE_APPLICATION_FINISH'));

  yield StatusBar.setHidden(false, 'fade');
}

function* setupApp(): SagaIterator {
  const {token} = yield select(accessTokenSelector);
  const {crm} = yield select(appSelector);

  if (!token) {
    return;
  }

  yield put(createAction('app/SET_CRM', {crm}));
  yield delay(100);
  yield put(createAction('data/FETCH_USER_REQUEST'));

  const {failure} = yield race({
    success: take('data/FETCH_USER_SUCCESS'),
    failure: take('data/FETCH_USER_FAILURE'),
  });

  if (failure) {
    return yield put(createAction('accessToken/PURGE'));
  }
}

function* appOpen() {
  yield analytics().logAppOpen();
}

function* setCrm({payload}: AnyAction) {
  const {crm} = payload;

  yield (api.defaults.baseURL = crm);
}

export default function* (): SagaIterator {
  yield takeLatest('app/INITIALIZE_APPLICATION_START', initApp);
  yield takeLatest('app/STATE_CHANGE_ACTIVE', appOpen);
  yield takeLatest('app/SET_CRM', setCrm);
}
