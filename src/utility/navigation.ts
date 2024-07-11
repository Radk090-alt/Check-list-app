import {NavigationContainerRef, NavigationState, PartialState, StackActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {createRef} from 'react';

interface ActionPayload {
  name: string;
  screen?: string;
  params?: object;
}

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = ({name, params}: ActionPayload): void => {
  navigationRef.current?.dispatch(CommonActions.navigate(name, params));
};

export const push = ({name, params}: ActionPayload): void => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

export const back = (): void => {
  navigationRef.current?.dispatch(CommonActions.goBack());
};

export const pop = (times: number): void => {
  navigationRef.current?.dispatch(StackActions.pop(times));
};

export const getActiveRouteName = (state: NavigationState | PartialState<NavigationState>): any => {
  const route = state.routes[state.index!];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};
