import {pathOr} from 'ramda';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

// Entities
import {Category} from '@rcd/entities';

export type State = {
  entities: Record<string, Category>;
  isLoading: boolean;
};

const initialState: State = {
  entities: {},
  isLoading: false,
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'data/FETCH_CATEGORIES_REQUEST': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'data/FETCH_CATEGORIES_SUCCESS': {
      return update(state, {
        entities: {
          $merge: pathOr({}, ['entities', 'categories'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/FETCH_CATEGORIES_FAILURE': {
      return update(state, {
        entities: {
          $set: {},
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/RESET': {
      return initialState;
    }
  }

  return state;
}
