import React, {useCallback} from 'react';
import {CardStyleInterpolators, createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import SearchByCategory from '@rcd/screens/SearchByCategoryScreen';
import SearchByKeyword from '@rcd/screens/SearchByKeywordScreen';
import MachineScreen from '@rcd/screens/MachineScreen';
import {forFade} from '@rcd/utility/headerStyleInterpolators';
import {Colors} from '@rcd/utility';
import {useDispatch} from 'react-redux';
import {createAction} from '@rcd/utility/store';
import SearchByTextRecognitionScreen from '@rcd/screens/SearchByTextRecognitionScreen';
import CheckScreen from '@rcd/screens/Check/CheckScreen';
import CheckSuccessScreen from '@rcd/screens/Forms/FormSuccessScreen';
import { WebViewScreen } from '@rcd/screens/WebViewScreen';
import ChecklistScreen from '@rcd/screens/ChecklistScreen';

const Main = createStackNavigator();

export default () => {
  const dispatch = useDispatch();
  const handleBack = useCallback(() => {
    dispatch(createAction('navigation/POP'));
  }, []);

  const headerLeft = () => <HeaderBackButton onPress={handleBack} tintColor={Colors.blues[100]} label="Назад" />;
  return (
    <Main.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        gestureResponseDistance: {
          horizontal: 300,
        },
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: Colors.blues[100],
        headerTitleStyle: {
          color: Colors.whites[100],
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyleInterpolator: forFade,
      }}>
        <Main.Screen
        name="service/Checklist"
        options={{
          headerTitle: 'Чеклист',
          headerLeft,
        }}
        component={ChecklistScreen}
      />
      <Main.Screen
        name="service/SearchByCategory"
        options={{
          headerTitle: 'Търси по категория',
          headerLeft,
        }}
        component={SearchByCategory}
      />
      <Main.Screen
        name="service/SearchByKeyword"
        options={{
          headerTitle: 'Търси по RX №',
          headerLeft,
          headerStyle: {
            shadowOpacity: 0,
          },
        }}
        component={SearchByKeyword}
      />
      <Main.Screen
        name="service/SearchByTextRecognition"
        options={{
          headerTitle: 'Търси по снимка',
          headerLeft,
          headerStyle: {
            shadowOpacity: 0,
          },
        }}
        component={SearchByTextRecognitionScreen}
      />
      <Main.Screen
        name="service/Machine"
        options={{
          headerTitle: 'Машина',
          headerLeft,
        }}
        component={MachineScreen}
      />
      <Main.Screen
        name="service/Webview"
        options={{
          headerTitle: 'Web',
          headerLeft,
        }}
        component={WebViewScreen}
      />
      <Main.Screen
        name="service/Check"
        options={{
          headerTitle: 'Чеклист',
          headerLeft,
        }}
        component={CheckScreen}
      />
      <Main.Screen
        name="service/CheckSuccess"
        options={{
          headerTitle: 'Завършен чеклист',
          headerLeft: () => (
            <HeaderBackButton
              label="Начало"
              tintColor={Colors.blues[100]}
              onPress={() => {
                dispatch(createAction('navigation/NAVIGATE', {name: 'app/Tabs'}));
              }}
            />
          ),
        }}
        component={CheckSuccessScreen}
      />
    </Main.Navigator>
  );
};
