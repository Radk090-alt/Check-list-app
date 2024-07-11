import checklistSchema from '@rcd/api/schemas/Checklist';
import {Checklist, Machine} from '@rcd/entities';
import {pathOr} from 'ramda';
import {denormalize} from 'normalizr';
import {createSelector, createStructuredSelector} from 'reselect';

interface Selection {
  checklist?: Checklist;
}

const selectChecklistId = pathOr(0, ['checkScreen', 'checklistId']);

interface ChecklistsSelection {
  checklists: Record<string, Checklist>;
  machines: Record<string, Machine>;
}

const entitiesSelector = createStructuredSelector({
  checklists: pathOr({}, ['data', 'checklists', 'entities']),
  machines: pathOr({}, ['data', 'machines', 'entities']),
});

const checklistSelector = (id: number, entities: ChecklistsSelection): Checklist | undefined => {
  return denormalize(id, checklistSchema, entities);
};

export default createStructuredSelector<Record<string, unknown>, Selection>({
  checklist: createSelector(selectChecklistId, entitiesSelector, checklistSelector),
});
