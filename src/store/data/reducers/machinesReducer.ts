import {pathOr} from 'ramda';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

// Entities
import {Machine} from '@rcd/entities';

export type State = {
  entities: Record<string, Machine>;
  isLoading: boolean;
};

const initialState: State = {
  entities: {},
  isLoading: false,
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'data/FETCH_MACHINE_REQUEST':
    case 'data/FETCH_MACHINES_REQUEST': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'data/FETCH_MACHINE_SUCCESS':
    case 'data/FETCH_MACHINES_SUCCESS': {
      return update(state, {
        entities: {
          $merge: pathOr({}, ['entities', 'machines'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/FETCH_MACHINES_FAILURE': {
      return update(state, {
        entities: {
          $set: {},
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/UPDATE_MACHINE_REQUEST': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'data/UPDATE_MACHINE_SUCCESS': {
      return update(state, {
        entities: {
          $merge: pathOr({}, ['entities', 'machines'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/UPDATE_MACHINE_FAILURE': {
      return update(state, {
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
