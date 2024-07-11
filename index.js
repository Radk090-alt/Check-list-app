/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AppContainer from '@rcd/AppContainer';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';
import {APP_ENV} from '@rcd/environment';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  minimumBackgroundDuration: APP_ENV === 'production' ? 120 : 0,
};

AppRegistry.registerComponent(appName, () =>
  codePush(codePushOptions)(AppContainer),
);
