import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoading: boolean;
  crm: string;
}

const selectIsLoading = pathOr(false, ['loginScreen', 'isLoading']);
const selectCrm = pathOr('http://crmrx.rentex.bg', ['app', 'crm']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
  crm: createSelector(selectCrm, identity),
});
