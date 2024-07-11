import {AnyAction} from 'redux';
import {pathOr, propOr} from 'ramda';

// Utility
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
  form?: Record<string, unknown>;
}

const initialState: State = {
  isLoading: false,
  form: undefined,
};

export default function (state: State = initialState, {type, payload}: AnyAction): State {
  switch (type) {
    case 'createFormScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: propOr(true, 'isLoading', payload),
        },
      });
    }
    case 'createFormScreen/SET_FORM': {
      return update(state, {
        form: {
          $set: pathOr(undefined, ['form'], payload),
        },
      });
    }
  }

  return state;
}
