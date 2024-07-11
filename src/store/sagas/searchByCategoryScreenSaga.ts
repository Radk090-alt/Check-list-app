import {AnyAction} from 'redux';
import {SagaIterator} from 'redux-saga';
import {
  call,
  delay,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

// Utility
import {createAction} from '@rcd/utility/store';
import {isEmpty, isNil, pathOr} from 'ramda';
import searchByCategoryScreenSelector from '../selectors/searchByCategoryScreenSelector';

function* opened({payload}: AnyAction): SagaIterator {
  const {category, level} = payload;
  const {categories} = yield select(searchByCategoryScreenSelector);

  if (isEmpty(categories[level]) || isNil(categories[level])) {
    yield put(
      createAction('searchByCategoryScreen/SET_LOADING', {
        isLoading: true,
        level,
      }),
    );
  }

  yield put(
    createAction('data/FETCH_CATEGORIES_REQUEST', {parent_id: category?.id}),
  );

  const {success} = yield race({
    success: take('data/FETCH_CATEGORIES_SUCCESS'),
    failure: take('data/FETCH_CATEGORIES_FAILURE'),
  });

  const categoryIds = pathOr([], ['payload', 'result'], success);

  if (isEmpty(categoryIds)) {
    yield call(searchMachines, category?.id);
  }

  yield put(
    createAction('searchByCategoryScreen/SET_CATEGORIES', {categoryIds, level}),
  );

  yield delay(200);
  yield put(
    createAction('searchByCategoryScreen/SET_LOADING', {
      isLoading: false,
      level,
    }),
  );
}

function* searchMachines(categoryId?: string): SagaIterator {
  yield put(
    createAction('data/FETCH_MACHINES_REQUEST', {category_id: categoryId}),
  );

  const {success} = yield race({
    success: take('data/FETCH_MACHINES_SUCCESS'),
    failure: take('data/FETCH_MACHINES_FAILURE'),
  });

  const machineIds = pathOr([], ['payload', 'result'], success);

  yield put(createAction('searchByCategoryScreen/SET_MACHINES', {machineIds}));
}

function* selectCategory({payload}: AnyAction) {
  const {category, level} = payload;

  yield put(
    createAction('navigation/PUSH', {
      name: 'service/SearchByCategory',
      params: {category, level: level + 1},
    }),
  );
}

function* selectMachine({payload}: AnyAction) {
  const {machine} = payload;

  yield put(
    createAction('navigation/PUSH', {
      name: 'service/Machine',
      params: {machine},
    }),
  );
}

export default function* (): SagaIterator {
  yield takeLatest('searchByCategoryScreen/OPENED', opened);
  yield takeLatest('searchByCategoryScreen/SELECT_CATEGORY', selectCategory);
  yield takeLatest('searchByCategoryScreen/SELECT_MACHINE', selectMachine);
}
