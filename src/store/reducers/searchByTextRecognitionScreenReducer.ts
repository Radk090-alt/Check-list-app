import {AnyAction} from 'redux';
import {propOr} from 'ramda';

// Utility
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export default function (state: State = initialState, {type, payload}: AnyAction): State {
  switch (type) {
    case 'searchByTextRecognitionScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: propOr(true, 'isLoading', payload),
        },
      });
    }
  }

  return state;
}
