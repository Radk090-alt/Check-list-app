import {eventChannel} from 'redux-saga';
import {put, take} from 'redux-saga/effects';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {createAction} from '@rcd/utility/store';

export default function* () {
  const channel = eventChannel((emitter) => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      emitter(createAction('app/NETWORK_STATE_CHANGE', {...state}));
    });

    return () => {
      unsubscribe();
    };
  });

  while (true) {
    const isConn = yield take(channel);
    yield put(isConn);
  }
}
