import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './use-theme';
import { RootStack } from './navigation';

export const App = () => {
  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
};
