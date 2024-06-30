import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from './use-theme';
import { RootStack } from './navigation';
import { BottomSheetProvider, StatusBar } from '../shared/ui';
import { SessionProvider } from '../entities/session';
import { ShowdownMonsterProvider } from '../entities/showdown-monster';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <ShowdownMonsterProvider>
          <PaperProvider theme={theme}>
            <StatusBar />
            <BottomSheetProvider>
              <NavigationContainer theme={theme}>
                <RootStack />
              </NavigationContainer>
            </BottomSheetProvider>
          </PaperProvider>
        </ShowdownMonsterProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
};
