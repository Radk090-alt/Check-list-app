import {Alert} from 'react-native';
import {AnyAction} from 'redux';
import SagaTester, {SagaFunction} from 'redux-saga-tester';

interface Payload {
  [key: string]: unknown;
}

interface Meta {
  [key: string]: unknown;
}

export const createAction = (
  type: string,
  payload: Payload = {},
  meta: Meta = {},
): AnyAction => {
  return {type, payload, meta};
};

export function createAlert(title: string, text: string): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      text,
      [
        {text: 'OK', onPress: () => resolve(true)},
        {text: 'Cancel', onPress: () => resolve(false)},
      ],
      {cancelable: false},
    );
  });
}

export const createStateChangeAction = (
  state: string,
  payload: Payload = {},
  meta: Meta = {},
): AnyAction => {
  switch (state) {
    case 'active':
      return {
        type: 'app/STATE_CHANGE_ACTIVE',
        payload,
        meta,
      };
    case 'background':
      return {
        type: 'app/STATE_CHANGE_BACKGROUND',
        payload,
        meta,
      };
    case 'inactive':
    default:
      return {
        type: 'app/STATE_CHANGE_INACTIVE',
        payload,
        meta,
      };
  }
};

export function createSagaTester(
  saga: SagaFunction,
  initialState: Record<string, unknown> = {},
): SagaTester<Record<string, unknown>> {
  const sagaTester = new SagaTester({initialState});

  sagaTester.start(saga);

  return sagaTester;
}
