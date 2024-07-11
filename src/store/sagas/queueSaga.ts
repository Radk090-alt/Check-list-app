import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {put, race, take, select, takeLatest, delay} from 'redux-saga/effects';
import {NetInfoStateType} from '@react-native-community/netinfo';
import queueSelector from '@rcd/store/selectors/queueSelector';
import {createAction} from '@rcd/utility/store';

function* checkQueue({payload}: AnyAction): SagaIterator {
  const {type} = payload;
  const {isProcessing} = yield select(queueSelector);

  if (type === NetInfoStateType.wifi && !isProcessing) {
    yield race({
      delay: delay(200),
      rehydrate: take('persist/REHYDRATE'),
    });

    yield put(createAction('queue/START_PROCESSING'));
  }
}

function* processQueue(): SagaIterator {
  const {items} = yield select(queueSelector);

  for (let index = 0; index < items.length; index++) {
    const {type, successType, failureType, payload} = items[index];

    yield put(createAction(type, payload));

    const {success} = yield race({
      success: take(successType),
      failure: take(failureType),
    });

    if (success) {
      yield put(createAction('queue/PROCESS', {item: items[index]}));
    }
  }

  yield put(createAction('queue/STOP_PROCESSING'));
}

export default function* (): SagaIterator {
  yield takeLatest('app/NETWORK_STATE_CHANGE', checkQueue);
  yield takeLatest('queue/START_PROCESSING', processQueue);
}
