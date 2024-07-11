import {pathOr} from 'ramda';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

// Entities
import {User} from '@rcd/entities';

export type State = User | null;

const initialState: State = null;

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'data/FETCH_USER_SUCCESS': {
      return update(state, {
        $set: pathOr(null, ['user'], payload),
      });
    }
    case 'data/FETCH_USER_FAILURE': {
      return update(state, {
        $set: null,
      });
    }
    case 'data/RESET': {
      return initialState;
    }
  }

  return state;
}
