import categorySchema from '@rcd/api/schemas/Category';
import machineSchema from '@rcd/api/schemas/Machine';
import {Category, Machine} from '@rcd/entities';
import {identity, pathOr} from 'ramda';
import {denormalize} from 'normalizr';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  isLoading: Record<number, boolean>;
  parent?: Category;
  categories: Record<number, Category[]>;
  machines: Machine[];
}

const selectIsLoading = pathOr({}, ['searchByCategoryScreen', 'isLoading']);
const selectParent = pathOr(undefined, ['searchByCategoryScreen', 'parent']);
const selectCategoryIds = pathOr([], ['searchByCategoryScreen', 'categoryIds']);
const selectMachineIds = pathOr([], ['searchByCategoryScreen', 'machineIds']);
const selectCategories = pathOr({}, ['data', 'categories', 'entities']);
const selectMachines = pathOr({}, ['data', 'machines', 'entities']);

const categoriesSelector = (ids: Record<number, string[]>, entities: Record<string, Category>) => {
  let categories: Record<number, Category[]> = {};

  for (const level in ids) {
    categories[level] = denormalize(ids[level], [categorySchema], {
      categories: entities,
    });
  }

  return categories;
};

const machinesSelector = (ids: string[], entities: Record<string, Machine>) => {
  return denormalize(ids, [machineSchema], {machines: entities});
};

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isLoading: createSelector(selectIsLoading, identity),
  parent: createSelector(selectParent, identity),
  categories: createSelector(selectCategoryIds, selectCategories, categoriesSelector),
  machines: createSelector(selectMachineIds, selectMachines, machinesSelector),
});
