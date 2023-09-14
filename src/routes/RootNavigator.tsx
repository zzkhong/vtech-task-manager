import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import HomePage from 'modules/main/HomePage';
import DetailPage from 'modules/main/DetailPage';

import {RootRouteType} from './useAppNavigation';

const Stack = createNativeStackNavigator<RootRouteType>();

const RootNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="main_home_page" component={HomePage} />
        <Stack.Screen name="main_detail_page" component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
