import {SagaIterator} from 'redux-saga';
import {AnyAction} from 'redux';
import {put, select, take, takeLatest} from 'redux-saga/effects';
import {createAction} from '@rcd/utility/store';
import photosFlowSelector from '@rcd/store/selectors/photosFlowSelector';

function* photoTaken({payload}: AnyAction) {
  const {photo} = payload;

  yield put(
    createAction('navigation/PUSH', {
      name: 'camera/Preview',
      params: {photo},
    }),
  );
}

function* approvePhotos({payload}: AnyAction) {
  const {photos} = payload;
  const {step, checklist} = yield select(photosFlowSelector);

  for (const photo of photos) {
    yield put(createAction('data/UPLOAD_PHOTO_REQUEST', {photo, step, checklist}));
  }

  yield put(
    createAction('navigation/NAVIGATE', {
      name: 'service/Main',
      params: {
        screen: 'service/Check',
      },
    }),
  );
}

function* deletePhoto({payload}: AnyAction) {
  const {photo, step} = payload;

  yield put(createAction('data/DELETE_PHOTO_REQUEST', {photo, step}));
  yield put(createAction('navigation/POP'));
}

function* approvePhoto({payload}: AnyAction) {
  const {photo} = payload;
  const {step, checklist} = yield select(photosFlowSelector);

  yield put(createAction('data/UPLOAD_PHOTO_REQUEST', {photo, step, checklist}));
  yield take('data/UPLOAD_PHOTO_SUCCESS');

  const {photo: nextPhoto} = yield select(photosFlowSelector);

  if (!nextPhoto) {
    return yield put(
      createAction('navigation/NAVIGATE', {
        name: 'service/Main',
        params: {
          screen: 'service/Check',
        },
      }),
    );
  }

  yield put(createAction('navigation/POP'));
}

export default function* (): SagaIterator {
  yield takeLatest('photosFlow/PHOTO_TAKEN', photoTaken);
  yield takeLatest('photosFlow/DELETE_PHOTO', deletePhoto);
  yield takeLatest('photosFlow/APPROVE_PHOTO', approvePhoto);
  yield takeLatest('photosFlow/APPROVE_PHOTOS', approvePhotos);
}
