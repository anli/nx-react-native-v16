import React from 'react';
import { OnboardingPage } from '../../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const pageScreenOptions = {
  headerShown: false,
};
const Stack = createNativeStackNavigator();

export const RootStack = () => (
  <Stack.Navigator screenOptions={pageScreenOptions}>
    <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
  </Stack.Navigator>
);
