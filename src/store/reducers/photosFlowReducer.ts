import {AnyAction} from 'redux';
import {prop} from 'ramda';
import {update} from '@rcd/utility';

interface State {
  stepId?: string;
  checklistId?: string;
}

const initialState: State = {
  stepId: undefined,
  checklistId: undefined,
};

export default function (state: State = initialState, {type, payload}: AnyAction): State {
  switch (type) {
    case 'photosFlow/OPENED': {
      return update(state, {
        stepId: {
          $set: prop('stepId', payload),
        },
        checklistId: {
          $set: prop('checklistId', payload),
        },
      });
    }
  }

  return state;
}
