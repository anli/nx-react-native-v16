import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@shared/ui';
import { RootStack } from './navigation';
import { StatusBar, ThemeProvider } from '@shared/ui';
import { SessionProvider } from '@entities/kdm-session';
import { ShowdownMonsterProvider } from '@entities/kdm-showdown';
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
