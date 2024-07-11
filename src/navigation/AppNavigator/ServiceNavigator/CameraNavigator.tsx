import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {CameraScreen} from '@rcd/screens/Camera/CameraScreen';
import {PreviewPhotoScreen} from '@rcd/screens/Camera/PreviewPhotoScreen';
import {CameraRollScreen} from '@rcd/screens/Camera/CameraRollScreen';

const Camera = createStackNavigator();

export default () => (
  <Camera.Navigator headerMode="none">
    <Camera.Screen
      name="camera/Capture"
      component={CameraScreen}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    />
    <Camera.Screen
      name="camera/Preview"
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
      }}
      component={PreviewPhotoScreen}
    />
    <Camera.Screen
      name="camera/CameraRoll"
      component={CameraRollScreen}
      options={{
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
  </Camera.Navigator>
);
