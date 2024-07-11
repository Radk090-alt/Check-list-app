import {AnyAction} from 'redux';
import {pathOr} from 'ramda';

// Utility
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
  machineId?: number;
}

const initialState: State = {
  isLoading: false,
  machineId: undefined,
};

export default function (
  state: State = initialState,
  {type, payload}: AnyAction,
): State {
  switch (type) {
    case 'machineScreen/OPENED': {
      return update(state, {
        machineId: {
          $set: pathOr(undefined, ['machine', 'id'], payload),
        },
      });
    }

    case 'machineScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: pathOr(false, ['isLoading'], payload),
        },
      });
    }
  }

  return state;
}
