import {propOr} from 'ramda';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

export interface State {
  crm: string;

  isLoading: boolean;
  isLoggingOut: boolean;
}

const initialState: State = {
  crm: 'http://crmrx.rentex.bg',
  isLoading: true,
  isLoggingOut: false,
};

export default function (state: State = initialState, {payload, type}: AnyAction): State {
  switch (type) {
    case 'app/SET_CRM': {
      return update(state, {
        crm: {
          $set: propOr(null, 'crm', payload),
        },
      });
    }
    case 'app/INITIALIZE_APPLICATION_START': {
      return update(state, {
        isLoading: {
          $set: true,
        },
        isLoggingOut: {
          $set: false,
        },
      });
    }
    case 'app/INITIALIZE_APPLICATION_FINISH': {
      return update(state, {
        isLoading: {
          $set: false,
        },
      });
    }
    case 'app/LOGGING_OUT': {
      return update(state, {
        isLoggingOut: {
          $set: true,
        },
      });
    }
    case 'app/SET_LOADING': {
      return update(state, {
        isLoading: {
          $set: propOr(false, 'loading', payload),
        },
      });
    }
  }

  return state;
}
