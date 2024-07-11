import {SagaIterator} from 'redux-saga';
import {spawn} from 'redux-saga/effects';

import dataSaga from './data/dataSaga';
import accessTokenSaga from './sagas/accessTokenSaga';
import appSaga from './sagas/appSaga';
import checkScreenSaga from './sagas/checkScreenSaga';
import loginScreenSaga from './sagas/loginScreenSaga';
import machineScreenSaga from './sagas/machineScreenSaga';
import navigationSaga from './sagas/navigationSaga';
import networkSaga from './sagas/networkSaga';
import photosFlowSaga from './sagas/photosFlowSaga';
import profileScreenSaga from './sagas/profileScreenSaga';
import queueSaga from './sagas/queueSaga';
import searchByCategoryScreen from './sagas/searchByCategoryScreenSaga';
import searchByKeywordScreen from './sagas/searchByKeywordScreenSaga';
import searchByTextRecognitionScreen from './sagas/searchByTextRecognitionScreenSaga';
import serviceScreenSaga from './sagas/serviceScreenSaga';
import createFormScreenSaga from './sagas/createFormScreenSaga';

export default function* rootSaga(): SagaIterator {
  yield spawn(dataSaga);
  yield spawn(appSaga);
  yield spawn(accessTokenSaga);
  yield spawn(loginScreenSaga);
  yield spawn(navigationSaga);
  yield spawn(profileScreenSaga);
  yield spawn(searchByCategoryScreen);
  yield spawn(searchByKeywordScreen);
  yield spawn(searchByTextRecognitionScreen);
  yield spawn(serviceScreenSaga);
  yield spawn(machineScreenSaga);
  yield spawn(checkScreenSaga);
  yield spawn(photosFlowSaga);
  yield spawn(createFormScreenSaga);

  yield spawn(networkSaga);
  yield spawn(queueSaga);
}
