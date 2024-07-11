import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  token?: string;
  expires?: number;
}

const selectAccessToken = pathOr(undefined, ['accessToken', 'token']);
const selectExpires = pathOr(undefined, ['accessToken', 'expiresAt']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  token: createSelector(selectAccessToken, identity),
  expires: createSelector(selectExpires, identity),
});
