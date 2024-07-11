import {User} from '@rcd/entities';
import {identity, isNil, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
}

const selectUser = pathOr(undefined, ['data', 'user']);
const selectIsLoading = pathOr(false, ['app', 'isLoading']);
const selectIsLoggingOut = pathOr(false, ['app', 'isLoggingOut']);

const isLoggedInSelector = (user?: User): boolean => {
  return !isNil(user);
};

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoggedIn: createSelector(selectUser, isLoggedInSelector),
  isLoading: createSelector(selectIsLoading, identity),
  isLoggingOut: createSelector(selectIsLoggingOut, identity),
});
