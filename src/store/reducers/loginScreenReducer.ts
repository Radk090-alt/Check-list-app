import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export default function (
  state: State = initialState,
  {type}: AnyAction,
): State {
  switch (type) {
    case 'loginScreen/SUBMIT': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'loginScreen/ERROR': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
    case 'loginScreen/SUCCESS': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
  }

  return state;
}
