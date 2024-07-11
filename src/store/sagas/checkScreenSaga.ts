import {AnyAction} from 'redux';
import {pathOr} from 'ramda';
import {SagaIterator} from 'redux-saga';
import {call, delay, put, race, select, take, takeLatest} from 'redux-saga/effects';
import {createAction} from '@rcd/utility/store';
import checkScreenSelector from '@rcd/store/selectors/checkScreenSelector';

function* setMachine({payload}: AnyAction) {
  const {machine} = payload;

  yield put(createAction('checkScreen/SET_LOADING', {isLoading: true}));
  yield put(createAction('data/FETCH_CHECKLIST_REQUEST', {machine: machine?.id}));

  const {success} = yield race({
    success: take('data/FETCH_CHECKLIST_SUCCESS'),
    failure: take('data/FETCH_CHECKLIST_FAILURE'),
  });

  const checklistId = pathOr(undefined, ['payload', 'result'], success);

  yield put(createAction('checkScreen/SET_LOADING', {isLoading: false}));
  yield put(createAction('checkScreen/SET_CHECKLIST', {checklistId}));
}

function* addPhotos() {
  const {stepId, checklist} = yield select(checkScreenSelector);

  yield put(
    createAction('navigation/NAVIGATE', {
      name: 'service/Camera',
      params: {
        screen: 'camera/Capture',
        params: {
          stepId,
          checklistId: checklist.checklist_id,
        },
      },
    }),
  );
}

function* openPhoto({payload}: AnyAction) {
  const {photo, checklist, stepIndex} = payload;

  yield put(
    createAction('navigation/NAVIGATE', {
      name: 'service/Modals',
      params: {
        screen: 'modals/EditPhoto',
        params: {photo, step: checklist.steps[stepIndex]},
      },
    }),
  );
}

function* updateStep({payload}: AnyAction) {
  const {checklist, step, answer, comment} = payload;

  yield put(
    createAction('data/UPDATE_CHECKLIST_REQUEST', {
      answer: answer || '',
      comment: comment || '',
      machineId: checklist.machine.id,
      checklistId: checklist.checklist_id,
      stepId: step.id,
    }),
  );
}

function* nextStep() {
  const {stepIndex, checklist} = yield select(checkScreenSelector);

  if (stepIndex + 1 === checklist.steps.length) {
    return yield call(finishCheck);
  }

  yield put(createAction('checkScreen/SET_STEP', {step: stepIndex + 1}));
}

function* previousStep() {
  const {stepIndex} = yield select(checkScreenSelector);

  yield put(createAction('checkScreen/SET_STEP', {step: stepIndex - 1}));
}

function* finishCheck() {
  const {checklist} = yield select(checkScreenSelector);

  yield put(createAction('navigation/NAVIGATE', {name: 'service/CheckSuccess'}));

  yield put(createAction('checkScreen/SET_LOADING', {isLoading: true}));

  yield put(
    createAction('data/FINISH_CHECKLIST_REQUEST', {
      checklistId: checklist.checklist_id,
    }),
  );

  const {success} = yield race({
    success: take('data/FINISH_CHECKLIST_SUCCESS'),
    failure: take('data/FINISH_CHECKLIST_FAILURE'),
  });

  yield delay(500);

  yield put(createAction('checkScreen/SET_LOADING', {isLoading: false}));

  const pdf = pathOr(undefined, ['payload', 'pdf'], success);

  yield put(createAction('checkScreen/FINISH', {pdf}));
}

export default function* (): SagaIterator {
  yield takeLatest('checkScreen/SET_MACHINE', setMachine);
  yield takeLatest('checkScreen/ADD_PHOTOS', addPhotos);
  yield takeLatest('checkScreen/OPEN_PHOTO', openPhoto);
  yield takeLatest('checkScreen/UPDATE_STEP', updateStep);
  yield takeLatest('checkScreen/NEXT_STEP', nextStep);
  yield takeLatest('checkScreen/PREVIOUS_STEP', previousStep);
}
