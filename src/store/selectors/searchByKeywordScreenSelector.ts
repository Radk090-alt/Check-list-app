import {identity, pathOr} from 'ramda';
import {denormalize} from 'normalizr';
import {createSelector, createStructuredSelector} from 'reselect';
import machineSchema from '@rcd/api/schemas/Machine';
import {Machine} from '@rcd/entities';

interface Selection {
  isLoading: boolean;
  keyword?: string;
  machines: Machine[];
}

const selectIsLoading = pathOr(false, ['searchByKeywordScreen', 'isLoading']);
const selectMachineIds = pathOr([], ['searchByKeywordScreen', 'machineIds']);
const selectKeyword = pathOr(undefined, ['searchByKeywordScreen', 'keyword']);
const selectMachines = pathOr({}, ['data', 'machines', 'entities']);

const machinesSelector = (ids: string[], entities: Record<string, Machine>) => {
  return denormalize(ids, [machineSchema], {machines: entities});
};

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
  keyword: createSelector(selectKeyword, identity),
  machines: createSelector(selectMachineIds, selectMachines, machinesSelector),
});
