import React from 'react';
import {CardStyleInterpolators, createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import CheckScreen from '@rcd/screens/Check/CheckScreen';
import CheckSuccessScreen from '@rcd/screens/Check/CheckSuccessScreen';
import {useDispatch} from 'react-redux';
import {createAction} from '@rcd/utility/store';
import {Colors} from '@rcd/utility';

const Check = createStackNavigator();

export default () => {
  const dispatch = useDispatch();

  return (
    <Check.Navigator
      screenOptions={{
        headerStyle: {
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: Colors.whites[100],
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Check.Screen
        name="check/Main"
        options={{
          headerTitle: 'Чеклист',
          headerLeft: () => (
            <HeaderBackButton
              label="Машина"
              tintColor={Colors.blues[100]}
              onPress={() => dispatch(createAction('navigation/POP'))}
            />
          ),
        }}
        component={CheckScreen}
      />
      <Check.Screen
        name="check/Success"
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
    </Check.Navigator>
  );
};
