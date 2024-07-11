import checklistSchema from '@rcd/api/schemas/Checklist';
import {Checklist, Machine, Photo, Step} from '@rcd/entities';
import {
  allPass,
  assoc,
  chain,
  compose,
  equals,
  filter,
  gt,
  identity,
  isNil,
  length,
  map,
  merge,
  mergeRight,
  not,
  pathOr,
  pipe,
  propEq,
  propIs,
  propOr,
  propSatisfies,
} from 'ramda';
import {denormalize} from 'normalizr';
import {createSelector, createStructuredSelector} from 'reselect';

interface DenormalizedStep extends Step {
  missingPhotos: number;
  assignedPhotos: number;
  minPhotos: number;
  maxPhotos: number;
}

interface DenormalizedChecklist extends Checklist {
  steps: DenormalizedStep[];
}

interface Selection {
  checklist?: DenormalizedChecklist;
  missingPhotos: Photo[];
  isLoading: boolean;
  totalSteps: number;
  stepIndex: number;
  stepId?: string;
  canGoNext: boolean;
  canGoBack: boolean;
}

const selectIsLoading = pathOr(false, ['checkScreen', 'isLoading']);
const selectChecklistId = pathOr(0, ['checkScreen', 'checklistId']);
const selectStepIndex = pathOr(0, ['checkScreen', 'stepIndex']);

interface ChecklistsSelection {
  checklists: Record<string, Checklist>;
  steps: Record<string, Step>;
  machines: Record<string, Machine>;
  photos: Record<string, Photo>;
}

const entitiesSelector = createStructuredSelector({
  checklists: pathOr({}, ['data', 'checklists', 'entities']),
  steps: pathOr({}, ['data', 'checklists', 'stepEntities']),
  machines: pathOr({}, ['data', 'machines', 'entities']),
  photos: pathOr({}, ['data', 'checklists', 'photoEntities']),
});

const checklistSelector = (id: number, entities: ChecklistsSelection): DenormalizedChecklist | undefined => {
  const checklist: Checklist | undefined = denormalize(id, checklistSchema, entities);

  if (!checklist) {
    return undefined;
  }

  const steps = map(
    pipe(
      chain(assoc('minPhotos'), getMinPhotos),
      chain(assoc('missingPhotos'), getMissingPhotos),
      chain(assoc('maxPhotos'), getMaxPhotos),
      chain(assoc('assignedPhotos'), getAssignedPhotos),
    ),
    checklist.steps,
  );

  return mergeRight(checklist, {steps}) as DenormalizedChecklist;
};

const getMinPhotos = (step: Step) => {
  const photoIsRequired = propEq('required', true);

  return length(filter(photoIsRequired, propOr([], 'photos', step)));
};

const getMaxPhotos = (step: Step) => {
  return length(propOr([], 'photos', step));
};

const getMissingPhotos = (step: Step) => {
  const isNotNil = (photo: any) => !equals(undefined)(photo);
  const photoIsRequired = propEq('required', true);
  const photoIsMissing = propEq('photo', null);

  return length(filter(allPass([isNotNil, photoIsRequired, photoIsMissing]), propOr([], 'photos', step)));
};

const getAssignedPhotos = (step: Step) => {
  const photoIsNotMissing = propIs(String, 'photo');

  return length(filter(photoIsNotMissing, propOr([], 'photos', step)));
};

const canGoNextSelector = (stepIndex: number, checklist?: DenormalizedChecklist) => {
  const step = pathOr(undefined, [stepIndex], pathOr([], ['steps'], checklist));

  if (!step) {
    return false;
  }

  const missingPhotos = getMissingPhotos(step);
  const doesntNeedAnswer = propEq('type', null, step);
  const missingAnswer = propSatisfies(isNil, 'answer', step);

  return equals(missingPhotos, 0) && (doesntNeedAnswer || not(missingAnswer));
};

const canGoBackSelector = (stepIndex: number) => {
  return gt(stepIndex, 0);
};

const stepIdSelector = (stepIndex: number, checklist?: DenormalizedChecklist) => {
  return checklist?.steps[stepIndex]?.id;
};

const missingPhotosSelector = (stepIndex: number, checklist?: DenormalizedChecklist) => {
  const photoIsRequired = propEq('required', true);
  const photoIsMissing = propEq('photo', null);

  return filter(allPass([photoIsRequired, photoIsMissing]), pathOr([], ['steps', stepIndex, 'photos'], checklist));
};

const totalStepsSelector = (checklist?: DenormalizedChecklist) => {
  return length(propOr([], 'steps', checklist));
};

const selectedChecklist = createSelector(selectChecklistId, entitiesSelector, checklistSelector);
const selectedMissingPhotos = createSelector(selectStepIndex, selectedChecklist, missingPhotosSelector);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  checklist: selectedChecklist,
  missingPhotos: selectedMissingPhotos,
  isLoading: createSelector(selectIsLoading, identity),
  stepIndex: createSelector(selectStepIndex, identity),
  stepId: createSelector(selectStepIndex, selectedChecklist, stepIdSelector),
  totalSteps: createSelector(selectedChecklist, totalStepsSelector),
  canGoNext: createSelector(selectStepIndex, selectedChecklist, canGoNextSelector),
  canGoBack: createSelector(selectStepIndex, canGoBackSelector),
});
