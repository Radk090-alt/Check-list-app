import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import TabsNavigator from './AppNavigator/TabsNavigator';
import ServiceNavigator from './AppNavigator/ServiceNavigator';
import FormsNavigator from './AppNavigator/FormsNavigator';

const App = createStackNavigator();

export default () => (
  <App.Navigator
    headerMode="none"
    screenOptions={{
      gestureDirection: 'horizontal',
      gestureResponseDistance: {
        horizontal: 300,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <App.Screen name="app/Tabs" component={TabsNavigator} />
    <App.Screen name="app/Service" component={ServiceNavigator} />
    <App.Screen name="app/Forms" component={FormsNavigator} />
  </App.Navigator>
);
