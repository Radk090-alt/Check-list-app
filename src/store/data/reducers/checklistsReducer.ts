import {filter, findIndex, indexOf, lensProp, omit, path, pathOr, pipe, prop, propOr, set} from 'ramda';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

// Entities
import {Checklist, Photo, Step} from '@rcd/entities';

type State = {
  entities: Record<string, Checklist>;
  stepEntities: Record<string, Step>;
  photoEntities: Record<string, Photo>;
  isLoading: boolean;
};

const initialState: State = {
  entities: {},
  stepEntities: {},
  photoEntities: {},
  isLoading: false,
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'data/FETCH_CHECKLIST_REQUEST': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'data/FETCH_CHECKLIST_SUCCESS': {
      return update(state, {
        entities: {
          $merge: pathOr({}, ['entities', 'checklists'], payload),
        },
        stepEntities: {
          $merge: pathOr({}, ['entities', 'steps'], payload),
        },
        photoEntities: {
          $merge: pathOr({}, ['entities', 'photos'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/FETCH_CHECKLIST_FAILURE': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/UPDATE_CHECKLIST_REQUEST': {
      return update(state, {
        stepEntities: {
          [prop('stepId', payload)]: {
            answer: {
              $set: propOr(null, 'answer', payload),
            },
            comment: {
              $set: propOr(null, 'comment', payload),
            },
          },
        },
      });
    }
    case 'data/UPDATE_CHECKLIST_SUCCESS': {
      return update(state, {
        entities: {
          $merge: pathOr({}, ['entities', 'checklists'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/UPDATE_CHECKLIST_FAILURE': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/UPLOAD_PHOTO_REQUEST': {
      return update(state, {
        photoEntities: {
          [pathOr<string>('0', ['photo', 'photo_id'], payload)]: {
            $set: propOr(null, 'photo', payload),
          },
        },
      });
    }
    case 'data/UPLOAD_PHOTO_SUCCESS': {
      const stepId = pathOr<string>('0', ['step', 'id'], payload);
      const photo = pathOr<Photo | undefined>(undefined, ['photo'], payload);
      const newPhoto = omit(['oldId'], photo) as Photo;
      const photoId = pathOr<string>('0', ['photo', 'photo_id'], payload);
      const photoIndex = indexOf(pathOr(undefined, ['photo', 'oldId'], payload), state.stepEntities[stepId].photos);

      return update(state, {
        stepEntities: {
          [stepId]: {
            photos: {
              $splice: [[photoIndex, 1, photoId]],
            },
          },
        },
        photoEntities: {
          $unset: [pathOr('0', ['photo', 'oldId'], payload)],
          [photoId]: {
            $set: newPhoto,
          },
        },
      });
    }
    case 'data/DELETE_PHOTO_SUCCESS': {
      const stepId = pathOr<string>('0', ['step', 'id'], payload);
      const photo = pathOr<Photo | undefined>(undefined, ['photo'], payload);
      const photoId = pathOr(undefined, ['photo', 'photo_id'], payload);

      const photoIndex = indexOf(photoId, state.stepEntities[stepId].photos);
      const newPhotoId = `${stepId}-${propOr(1, 'order', photo)}`;
      const newPhoto = pipe(set(lensProp('photo_id'), newPhotoId), set(lensProp('photo'), null))(photo);

      return update(state, {
        stepEntities: {
          [stepId]: {
            photos: {
              $splice: [[photoIndex, 1, newPhotoId]],
            },
          },
        },
        photoEntities: {
          $unset: [pathOr(undefined, ['photo', 'photo_id'], payload)],
          [newPhotoId]: {
            $set: newPhoto,
          },
        },
      });
    }
    case 'data/RESET': {
      return initialState;
    }
  }

  return state;
}
