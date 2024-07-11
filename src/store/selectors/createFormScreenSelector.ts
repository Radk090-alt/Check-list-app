import {Form} from '@rcd/entities';
import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  form?: Form;
  isLoading: boolean;
}

const selectForm = pathOr(undefined, ['createFormScreen', 'form']);
const selectIsLoading = pathOr(false, ['createFormScreen', 'isLoading']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  form: createSelector(selectForm, identity),
  isLoading: createSelector(selectIsLoading, identity),
});
