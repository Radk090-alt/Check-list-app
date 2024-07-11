import {AnyAction} from 'redux';
import {propOr} from 'ramda';

// Utility
import {update} from '@rcd/utility';

export interface State {
  isLoading: Record<number, boolean>;
  categoryIds: Record<number, string[]>;
  machineIds: string[];
}

const initialState: State = {
  isLoading: {},
  categoryIds: {},
  machineIds: [],
};

export default function (
  state: State = initialState,
  {type, payload}: AnyAction,
): State {
  switch (type) {
    case 'searchByCategoryScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          [propOr(1, 'level', payload)]: {
            $set: propOr(true, 'isLoading', payload),
          },
        },
      });
    }
    case 'searchByCategoryScreen/SET_CATEGORIES': {
      return update(state, {
        categoryIds: {
          [propOr(1, 'level', payload)]: {
            $set: propOr([], 'categoryIds', payload),
          },
        },
      });
    }
    case 'searchByCategoryScreen/SET_MACHINES': {
      return update(state, {
        machineIds: {
          $set: propOr([], 'machineIds', payload),
        },
      });
    }
  }

  return state;
}
