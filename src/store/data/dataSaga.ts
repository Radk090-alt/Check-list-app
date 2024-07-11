import {SagaIterator} from 'redux-saga';
import {spawn} from 'redux-saga/effects';

import userSaga from './sagas/userSaga';
import categoriesSaga from './sagas/categoriesSaga';
import machinesSaga from './sagas/machinesSaga';
import checklistSaga from './sagas/checklistSaga';
import formsSaga from './sagas/formsSaga';

export default function* apiSaga(): SagaIterator {
  yield spawn(userSaga);
  yield spawn(categoriesSaga);
  yield spawn(machinesSaga);
  yield spawn(checklistSaga);
  yield spawn(formsSaga);
}
