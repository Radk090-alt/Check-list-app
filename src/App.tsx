import analytics from '@react-native-firebase/analytics';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, AppStateStatus, StatusBar, Text, View} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {getActiveRouteName, navigationRef} from '@rcd/utility/navigation';
import {createAction, createStateChangeAction} from '@rcd/utility/store';
import LoginScreen from '@rcd/screens/LoginScreen';
import LoadingScreen from '@rcd/screens/LoadingScreen';
import AppNavigator from '@rcd/navigation/AppNavigator';
import appSelector from '@rcd/store/selectors/appSelector';

MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const routeNameRef = useRef();
  const {isLoading, isLoggedIn, isLoggingOut} = useSelector(appSelector);

  useEffect(() => {
    if (navigationRef!.current) {
      const state = navigationRef!.current!.getRootState();
      routeNameRef.current = getActiveRouteName(state);
    }
  }, []);

  useEffect(() => {
    dispatch(createAction('app/INITIALIZE_APPLICATION_START'));

    function handleAppStateChange(state: AppStateStatus) {
      dispatch(createStateChangeAction(state));
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <React.Fragment>
      <StatusBar translucent={true} barStyle="light-content" />
      <NavigationContainer
        ref={navigationRef}
        theme={DarkTheme}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state!);

          if (previousRouteName !== currentRouteName) {
            analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            animationTypeForReplace: isLoggingOut ? 'pop' : 'push',
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
          }}>
          {!isLoggedIn && <Stack.Screen name="Login" component={LoginScreen} />}
          {isLoggedIn && <Stack.Screen name="App" component={AppNavigator} />}
        </Stack.Navigator>
      </NavigationContainer>
      {isLoading && <LoadingScreen />}
    </React.Fragment>
  );
};

export default App;
