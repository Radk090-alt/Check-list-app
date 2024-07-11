import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';
import {pathOr} from 'ramda';

export type State = {
  form?: Record<string, any>;
  isLoading: boolean;
};

const initialState: State = {
  form: undefined,
  isLoading: false,
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'data/FETCH_FORM_REQUEST': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'data/FETCH_FORM_SUCCESS': {
      return update(state, {
        form: {
          $set: pathOr(undefined, ['fields'], payload),
        },
        isLoading: {
          $set: false,
        },
      });
    }
    case 'data/FETCH_FORM_FAILURE': {
      return update(state, {
        form: {
          $set: undefined,
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
