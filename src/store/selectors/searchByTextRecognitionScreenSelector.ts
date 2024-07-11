import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoading: boolean;
}

const selectIsLoading = pathOr(false, ['searchByTextRecognitionScreen', 'isLoading']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
});
