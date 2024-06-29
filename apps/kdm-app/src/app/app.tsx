import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './use-theme';
import { RootStack } from './navigation';
import { StatusBar } from '../shared/ui';

export const App = () => {
  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <NavigationContainer theme={theme}>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
};
