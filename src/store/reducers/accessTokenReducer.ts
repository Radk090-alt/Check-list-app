import moment from 'moment';
import {AnyAction} from 'redux';

// Utility
import {update} from '@rcd/utility';

interface State {
  token?: string;
  expiresAt?: string;
}

const initialState: State = {
  token: undefined,
  expiresAt: undefined,
};

export default function (
  state: State = initialState,
  {payload, type}: AnyAction,
): State {
  switch (type) {
    case 'accessToken/SET': {
      const {token, expiresIn} = payload;
      const expiresAt = expiresIn
        ? moment().add(expiresIn, 'seconds').format()
        : undefined;

      return update(state, {
        token: {
          $set: token,
        },
        expiresAt: {
          $set: expiresAt,
        },
      });
    }

    case 'accessToken/PURGE': {
      return update(state, {
        token: {
          $set: undefined,
        },
        expiresAt: {
          $set: undefined,
        },
      });
    }
  }

  return state;
}
