import {AnyAction} from 'redux';
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export default function (state: State = initialState, {type}: AnyAction): State {
  switch (type) {
    case 'profileScreen/LOGOUT': {
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    }
    case 'profileScreen/LOGGED_OUT': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
  }

  return state;
}
