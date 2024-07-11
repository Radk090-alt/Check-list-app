import {AnyAction} from 'redux';
import {propOr} from 'ramda';

// Utility
import {update} from '@rcd/utility';

export interface State {
  keyword?: string;
  isLoading: boolean;
  machineIds: string[];
}

const initialState: State = {
  keyword: undefined,
  isLoading: false,
  machineIds: [],
};

export default function (
  state: State = initialState,
  {type, payload}: AnyAction,
): State {
  switch (type) {
    case 'searchByKeywordScreen/SET_KEYWORD': {
      return update(state, {
        keyword: {
          $set: propOr('', 'keyword', payload),
        },
      });
    }
    case 'searchByKeywordScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: propOr(true, 'isLoading', payload),
        },
      });
    }
    case 'searchByKeywordScreen/SET_MACHINES': {
      return update(state, {
        machineIds: {
          $set: propOr([], 'machineIds', payload),
        },
      });
    }
  }

  return state;
}
