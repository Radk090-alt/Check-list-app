import {AnyAction} from 'redux';
import {pathOr} from 'ramda';
import {update} from '@rcd/utility';

interface QueuedItem {
  type: string;
  payload: any;
}

interface State {
  isProcessing: boolean;
  items: QueuedItem[];
}

const initialState: State = {
  isProcessing: false,
  items: [],
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'queue/START_PROCESSING': {
      return update(state, {
        isProcessing: {
          $set: true,
        },
      });
    }
    case 'queue/STOP_PROCESSING': {
      return update(state, {
        isProcessing: {
          $set: false,
        },
      });
    }
    case 'queue/ADD': {
      return update(state, {
        items: {
          $push: [payload],
        },
      });
    }
    case 'queue/PROCESS': {
      const item = pathOr(undefined, ['item'], payload);

      if (!item) {
        return state;
      }

      return update(state, {
        items: {
          $splice: [[0, 1, item]],
        },
      });
    }
  }

  return state;
}
