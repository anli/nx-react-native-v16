import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './use-theme';
import { RootStack } from './navigation';
import { StatusBar, ThemeProvider } from '../shared/ui';
import { SessionProvider } from '../entities/session';
import { ShowdownMonsterProvider } from '../entities/showdown-monster';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <ShowdownMonsterProvider>
          <ThemeProvider>
            <StatusBar />
            <NavigationContainer theme={theme}>
              <RootStack />
            </NavigationContainer>
          </ThemeProvider>
        </ShowdownMonsterProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
};
