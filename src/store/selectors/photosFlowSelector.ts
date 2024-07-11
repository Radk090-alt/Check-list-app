import {filter, find, pathOr, propEq, propOr, values} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';
import {Checklist, Machine, Photo, Step} from '@rcd/entities';
import stepSchema from '@rcd/api/schemas/Step';
import {denormalize} from 'normalizr';
import checklistSchema from '@rcd/api/schemas/Checklist';

interface Selection {
  step?: Step;
  photo?: Photo;
  photos: Photo[];
  checklist?: Checklist;
}

const selectStepId = pathOr(0, ['photosFlow', 'stepId']);
const selectChecklistId = pathOr(0, ['photosFlow', 'checklistId']);

interface StepsPhotosSelection {
  steps: Record<string, Step>;
  photos: Record<string, Photo>;
}

const stepsPhotosSelection = createStructuredSelector({
  steps: pathOr({}, ['data', 'checklists', 'stepEntities']),
  photos: pathOr({}, ['data', 'checklists', 'photoEntities']),
});

interface ChecklistsMachinesSelection {
  checklists: Record<string, Checklist>;
  machines: Record<string, Machine>;
}
const checklistsMachinesSelection = createStructuredSelector({
  checklists: pathOr({}, ['data', 'checklists', 'entities']),
  machines: pathOr({}, ['data', 'machines', 'entities']),
});

const stepSelector = (stepId: number, entities: StepsPhotosSelection): Step | undefined => {
  return denormalize(stepId, stepSchema, entities);
};

const checklistSelector = (checklistId: number, entities: ChecklistsMachinesSelection): Checklist | undefined => {
  return denormalize(checklistId, checklistSchema, entities);
};

const photoSelector = (step?: Step): Photo | undefined => {
  if (!step) {
    return undefined;
  }

  const photos = propOr<Object, Step, Record<string, Photo>>({}, 'photos', step);

  return find(propEq('photo', null), values(photos));
};

const photosSelector = (step?: Step): Photo[] => {
  if (!step) {
    return [];
  }

  const photos = propOr<Object, Step, Record<string, Photo>>({}, 'photos', step);

  return filter(propEq('photo', null), values(photos));
};

const selectedStep = createSelector(selectStepId, stepsPhotosSelection, stepSelector);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  step: selectedStep,
  photos: createSelector(selectedStep, photosSelector),
  photo: createSelector(selectedStep, photoSelector),
  checklist: createSelector(selectChecklistId, checklistsMachinesSelection, checklistSelector),
});
