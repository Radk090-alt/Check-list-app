import machineSchema from '@rcd/api/schemas/Machine';
import {Machine} from '@rcd/entities';
import {identity, pathOr} from 'ramda';
import {denormalize} from 'normalizr';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoading: boolean;
  machine: Machine;
}

const selectIsLoading = pathOr(false, ['machineScreen', 'isLoading']);
const selectMachineId = pathOr(0, ['machineScreen', 'machineId']);
const selectMachines = pathOr({}, ['data', 'machines', 'entities']);

const machineSelector = (id: number, entities: Record<string, Machine>) => {
  return denormalize(id, machineSchema, {machines: entities});
};

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
  machine: createSelector(selectMachineId, selectMachines, machineSelector),
});
