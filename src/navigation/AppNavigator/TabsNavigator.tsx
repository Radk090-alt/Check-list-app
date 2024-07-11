import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceScreen from '@rcd/screens/ServiceScreen';
import VoiceMemoScreen from '@rcd/screens/VoiceMemoScreen';
import ProfileScreen from '@rcd/screens/ProfileScreen';
import MeetingsScreen from '@rcd/screens/MeetingsScreen';
import {Colors} from '@rcd/utility';

const Tabs = createBottomTabNavigator();

export default () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: Colors.blues[100],
      inactiveTintColor: Colors.whites[100],
    }}>
    <Tabs.Screen
      name="tabs/Service"
      component={ServiceScreen}
      options={{
        tabBarLabel: 'Начало',
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            color={focused ? Colors.blues[100] : Colors.whites[100]}
            size={size}
          />
        ),
      }}
    />
    {/* <Tabs.Screen
      name="tabs/Mettings"
      component={MeetingsScreen}
      options={{
        tabBarLabel: 'Срещи',
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? 'calendar' : 'calendar-outline'}
            color={focused ? Colors.blues[100] : Colors.whites[100]}
            size={size}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="tabs/VoiceMemo"
      component={VoiceMemoScreen}
      options={{
        tabBarLabel: 'Voice Memo',
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? 'microphone' : 'microphone-outline'}
            color={focused ? Colors.blues[100] : Colors.whites[100]}
            size={size}
          />
        ),
      }}
    /> */}
    <Tabs.Screen
      name="tabs/Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Профил',
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name={focused ? 'account' : 'account-outline'}
            color={focused ? Colors.blues[100] : Colors.whites[100]}
            size={size}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
