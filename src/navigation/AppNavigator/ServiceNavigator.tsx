import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import ModalsNavigator from './ServiceNavigator/ModalsNavigator';
import MainNavigator from './ServiceNavigator/MainNavigator';
import CameraNavigator from './ServiceNavigator/CameraNavigator';

const Service = createStackNavigator();

export default () => (
  <Service.Navigator
    headerMode="none"
    screenOptions={{
      gestureDirection: 'horizontal',
      gestureResponseDistance: {
        horizontal: 300,
      },
      cardStyle: {
        backgroundColor: 'transparent',
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Service.Screen
      name="service/Main"
      component={MainNavigator}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
    <Service.Screen
      name="service/Camera"
      component={CameraNavigator}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    />
    <Service.Screen
      name="service/Modals"
      component={ModalsNavigator}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    />
  </Service.Navigator>
);
