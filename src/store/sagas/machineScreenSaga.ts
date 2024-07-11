import {AnyAction} from 'redux';
import {Alert, Linking} from 'react-native';
import {SagaIterator} from 'redux-saga';
import {put, race, select, take, takeLatest} from 'redux-saga/effects';
import {call} from 'ramda';
import {createAction} from '@rcd/utility/store';
import checkScreenSelector from '@rcd/store/selectors/checkScreenSelector';
import {Machine} from '@rcd/entities';

function* opened({payload}: AnyAction) {
  const {machine} = payload;

  yield put(createAction('machineScreen/SET_LOADING', {isLoading: true}));

  yield put(createAction('data/FETCH_MACHINE_REQUEST', {machineId: machine?.id}));

  yield race({
    success: take('data/FETCH_MACHINE_SUCCESS'),
    failure: take('data/FETCH_MACHINE_FAILURE'),
  });

  yield put(createAction('machineScreen/SET_LOADING', {isLoading: false}));
}

function* check({payload}: AnyAction) {
  const {machine} = payload;
  const {checklist} = yield select(checkScreenSelector);

  if (checklist && checklist.machine.id !== machine.id) {
    const confirm = yield call(confirmExistingChecklist, checklist.machine);

    if (!confirm) {
      return;
    }

    if (confirm === 'open_old') {
      return yield put(
        createAction('navigation/PUSH', {
          name: 'service/Main',
          params: {
            screen: 'service/Check',
            params: {machine: checklist.machine},
          },
        }),
      );
    }
  }

  yield put(createAction('checkScreen/SET_MACHINE', {machine}));

  yield put(
    createAction('navigation/PUSH', {
      name: 'service/Check',
    }),
  );
}

function* makeCall({payload}: AnyAction) {
  const {party} = payload;

  yield Linking.openURL(`tel:${party.phone}`);
}

function confirmExistingChecklist(machine: Machine) {
  return new Promise((resolve, _reject) => {
    Alert.alert(
      'Незавършен чеклист',
      `Има незавършена проверка за машина ${machine.title.trim()}. Ако продължите, ще загубите данните.`,
      [
        {text: 'Отказ', onPress: () => resolve(false), style: 'cancel'},
        {text: 'Продължи с нов чеклист', onPress: () => resolve(true)},
        {
          text: `Отвори чеклист за ${machine.title}`,
          onPress: () => resolve('open_old'),
        },
      ],
      {cancelable: false},
    );
  });
}

export default function* (): SagaIterator {
  yield takeLatest('machineScreen/OPENED', opened);
  yield takeLatest('machineScreen/CHECK', check);
  yield takeLatest('machineScreen/MAKE_CALL', makeCall);
}
