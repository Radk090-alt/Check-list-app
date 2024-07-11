import {AnyAction} from 'redux';
import {pathOr} from 'ramda';
import {update} from '@rcd/utility';

export interface State {
  isLoading: boolean;
  stepIndex: number;
  checklistId?: number;
  pdf?: string;
}

const initialState: State = {
  isLoading: false,
  stepIndex: 0,
  checklistId: undefined,
  pdf: undefined,
};

export default function (state: State = initialState, {type, payload}: AnyAction): State {
  switch (type) {
    case 'checkScreen/FINISH': {
      return update(initialState, {
        pdf: {
          $set: pathOr(undefined, ['pdf'], payload),
        },
      });
    }
    case 'checkScreen/SET_CHECKLIST': {
      return update(state, {
        checklistId: {
          $set: pathOr(undefined, ['checklistId'], payload),
        },
      });
    }

    case 'checkScreen/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: pathOr(false, ['isLoading'], payload),
        },
      });
    }

    case 'checkScreen/SET_STEP': {
      return update(state, {
        stepIndex: {
          $set: pathOr(0, ['step'], payload),
        },
      });
    }
  }

  return state;
}
