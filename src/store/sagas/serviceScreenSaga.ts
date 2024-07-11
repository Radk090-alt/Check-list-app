import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, takeLatest} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';

function* search({payload}: AnyAction) {
  const {param} = payload;

  yield put(createAction('navigation/NAVIGATE', {name: 'Search', params: {by: param}}));
}

function* openChecklist({payload}: AnyAction) {
  const {checklist} = payload;

  yield put(
    createAction('navigation/NAVIGATE', {
      name: 'app/Service',
      params: {
        screen: 'service/Main',
        params: {
          screen: 'service/Machine',
          params: {
            machine: checklist.machine,
          },
        },
      },
    }),
  );

  yield put(
    createAction('navigation/PUSH', {
      name: 'app/Service',
      params: {
        screen: 'service/Main',
        params: {
          screen: 'service/Check',
          params: {
            machine: checklist.machine,
          },
        },
      },
    }),
  );
}

export default function* (): SagaIterator {
  yield takeLatest('serviceScreen/OPEN_CHECKLIST', openChecklist);
  yield takeLatest('serviceScreen/SEARCH_PRESSED', search);
}
