import React, {useCallback} from 'react';
import {CardStyleInterpolators, createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import CreateForm from '@rcd/screens/Forms/CreateFormScreen';
import {forFade} from '@rcd/utility/headerStyleInterpolators';
import {Colors} from '@rcd/utility';
import {useDispatch} from 'react-redux';
import {createAction} from '@rcd/utility/store';
import FormSuccessScreen from '@rcd/screens/Check/CheckSuccessScreen';

const Forms = createStackNavigator();

export default () => {
  const dispatch = useDispatch();
  const handleBack = useCallback(() => {
    dispatch(createAction('navigation/POP'));
  }, []);

  const headerLeft = () => <HeaderBackButton onPress={handleBack} tintColor={Colors.blues[100]} label="Назад" />;
  return (
    <Forms.Navigator
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
      <Forms.Screen
        name="forms/Create"
        options={{
          headerLeft,
        }}
        component={CreateForm}
      />
      <Forms.Screen
        name="forms/Success"
        options={{
          headerTitle: 'Изпратена форма',
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
        component={FormSuccessScreen}
      />
    </Forms.Navigator>
  );
};
