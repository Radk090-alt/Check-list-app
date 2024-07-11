import {pathOr} from 'ramda';
import {AnyAction} from 'redux';
import RNFS from 'react-native-fs';
import {normalize} from 'normalizr';
import {SagaIterator} from 'redux-saga';
import ImageResizer from 'react-native-image-resizer';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';

// Utility
import {createAction} from '@rcd/utility/store';

// API
import {get, post, put as putRequest, deleteRequest} from '@rcd/api';
import checklistSchema from '@rcd/api/schemas/Checklist';

function* fetch({payload}: AnyAction) {
  try {
    const {machine} = payload;

    const response = yield get(`/api/machinechecklist/id/${machine}`);

    response.machine = machine;

    yield put(createAction('data/FETCH_CHECKLIST_SUCCESS', normalize(response, checklistSchema)));
  } catch (error) {
    yield put(createAction('data/FETCH_CHECKLIST_FAILURE', {error}));
  }
}

function* updateChecklist({payload}: AnyAction) {
  try {
    const {answer, comment, machineId, checklistId, stepId} = payload;

    const response = yield post(`/api/machinechecklist/id/${machineId}`, {
      answer,
      comment,
      step_id: stepId,
      checklist_id: checklistId,
    });

    yield put(createAction('data/UPDATE_CHECKLIST_SUCCESS', response));
  } catch (error) {
    yield put(createAction('data/UPDATE_CHECKLIST_FAILURE', {error}));
  }
}

function* uploadPhoto({payload}: AnyAction) {
  try {
    const {photo, step, checklist} = payload;

    const {photo: photoUri} = photo;

    if (photoUri === null) {
      return;
    }

    let filepath = photoUri.split('//')[1];

    const {type} = yield NetInfo.fetch();

    // if (type !== NetInfoStateType.wifi) {
      const {path} = yield ImageResizer.createResizedImage(
        photoUri,
        800,
        800,
        'JPEG',
        80,
        0,
        RNFS.TemporaryDirectoryPath,
      );
      filepath = path;
    // }

    const base64 = yield RNFS.readFile(filepath, 'base64');

    const response = yield post(`/api/machinechecklist/id/${checklist.machine.id}/upload/photos`, {
      photo: base64,
      photo_order: photo.order,
      step_id: step.id,
      checklist_id: checklist.checklist_id,
    });

    const newPhoto = {
      ...photo,
      oldId: photo.photo_id,
      photo_id: pathOr(undefined, ['photo_id'], response),
      photo: pathOr(undefined, ['photo'], response),
    };

    // if (type !== NetInfoStateType.wifi) {
    //   yield put(
    //     createAction('queue/ADD', {
    //       type: 'data/UPLOAD_PHOTO_REQUEST',
    //       successType: 'data/UPLOAD_PHOTO_SUCCESS',
    //       failureType: 'data/UPLOAD_PHOTO_FAILURE',
    //       payload: {photo: newPhoto, step, checklist},
    //     }),
    //   );
    // }

    yield put(createAction('data/UPLOAD_PHOTO_SUCCESS', {step, photo: newPhoto}));
  } catch (error) {
    yield put(createAction('data/UPLOAD_PHOTO_FAILURE', {error}));
  }
}

function* updatePhoto({payload}: AnyAction) {
  try {
    const {photo, machineId, photoId, order} = payload;

    const response = yield putRequest(`/api/machinechecklist/id/${machineId}/photos/${photoId}`, {
      photo,
      photo_order: order,
    });

    yield put(createAction('data/UPDATE_PHOTO_SUCCESS', response));
  } catch (error) {
    yield put(createAction('data/UPDATE_PHOTO_FAILURE', {error}));
  }
}

function* deletePhoto({payload}: AnyAction) {
  try {
    const {photo, step} = payload;

    if (photo.photo_id) {
      yield deleteRequest(`/api/machinechecklist/photo/${photo.photo_id}`);
    }

    yield put(createAction('data/DELETE_PHOTO_SUCCESS', {photo, step}));
  } catch (error) {
    yield put(createAction('data/DELETE_PHOTO_FAILURE', {error}));
  }
}

function* finishChecklist({payload}: AnyAction) {
  try {
    const {checklistId} = payload;

    const response = yield post(`/api/checklist/finish/${checklistId}`);

    yield put(createAction('data/FINISH_CHECKLIST_SUCCESS', response));
  } catch (error) {
    yield put(createAction('data/FINISH_CHECKLIST_FAILURE', {error}));
  }
}

export default function* (): SagaIterator {
  yield takeLatest('data/FETCH_CHECKLIST_REQUEST', fetch);
  yield takeLatest('data/UPDATE_CHECKLIST_REQUEST', updateChecklist);
  yield takeEvery('data/UPLOAD_PHOTO_REQUEST', uploadPhoto);
  yield takeLatest('data/UPDATE_PHOTO_REQUEST', updatePhoto);
  yield takeLatest('data/DELETE_PHOTO_REQUEST', deletePhoto);
  yield takeLatest('data/FINISH_CHECKLIST_REQUEST', finishChecklist);
}
