import React from 'react';
import { ContentPage } from '../../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './bottom-tabs';
import { useCurrentSession } from '@entities/kdm-session';

const pageScreenOptions = {
  headerShown: false,
};
const Stack = createNativeStackNavigator();

export const RootStack = () => {
  const { data } = useCurrentSession();

  if (data) {
    return (
      <Stack.Navigator screenOptions={pageScreenOptions}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={pageScreenOptions}>
      <Stack.Screen
        name="ContentPage"
        component={ContentPage}
        initialParams={{ id: 'ONBOARDING' }}
      />
    </Stack.Navigator>
  );
};
