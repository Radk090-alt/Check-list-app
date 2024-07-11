import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditPhotoScreen from '@rcd/screens/Check/EditPhotoScreen';

const Modals = createStackNavigator();

export default () => (
  <Modals.Navigator headerMode="none">
    <Modals.Screen name="modals/EditPhoto" component={EditPhotoScreen} />
  </Modals.Navigator>
);
