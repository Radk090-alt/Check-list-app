import {User} from '@rcd/entities';
import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoading: boolean;
  user?: User;
}

const selectIsLoading = pathOr(false, ['profileScreen', 'isLoading']);
const selectUser = pathOr(undefined, ['data', 'user']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
  user: createSelector(selectUser, identity),
});
