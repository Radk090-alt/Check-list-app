import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  pdf?: string;
  isLoading: boolean;
}

const selectPdf = pathOr(undefined, ['checkScreen', 'pdf']);
const selectIsLoading = pathOr(false, ['checkScreen', 'isLoading']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  pdf: createSelector(selectPdf, identity),
  isLoading: createSelector(selectIsLoading, identity),
});
