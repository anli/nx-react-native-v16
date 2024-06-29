import React from 'react';
import { OnboardingPage } from '../../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './bottom-tabs';
import { useCurrentSession } from '../../entities/session';

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
      <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
    </Stack.Navigator>
  );
};
