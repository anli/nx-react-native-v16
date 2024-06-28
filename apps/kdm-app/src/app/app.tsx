import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { OnboardingPage } from '../pages';
import { useColorScheme } from 'react-native';

export const App = () => {
  const theme = useTheme();
  return (
    <PaperProvider theme={theme}>
      <OnboardingPage />
    </PaperProvider>
  );
};

const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
};
