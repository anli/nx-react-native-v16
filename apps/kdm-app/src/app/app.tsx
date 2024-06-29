import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './use-theme';
import { RootStack } from './navigation';
import { StatusBar } from '../shared/ui';
import { SessionProvider } from '../entities/session';

export const App = () => {
  const theme = useTheme();

  return (
    <SessionProvider>
      <PaperProvider theme={theme}>
        <StatusBar />
        <NavigationContainer theme={theme}>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </SessionProvider>
  );
};
