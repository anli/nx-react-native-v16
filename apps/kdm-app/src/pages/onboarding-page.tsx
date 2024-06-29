import { Image, View, useWindowDimensions } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateFirstSession } from '../features/session';

const pageConfig = {
  title: 'Umbra',
  imageUrl: 'https://imgur.com/47qQtEU.png',
  subtitle: 'Ignite Hope',
  description:
    'In a world consumed by darkness, your settlement stands alone. Survival hinges on keeping your people alive against insurmountable odds.',
  buttonTitle: 'Embrace Shadows',
  buttonPageName: 'BottomTabs' as const,
};

export const OnboardingPage = () => {
  const { width: windowWidth } = useWindowDimensions();
  const theme = useTheme();
  const { mutate: createFirstSession } = useCreateFirstSession();

  const handleStart = () => {
    createFirstSession();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
        <Text
          variant="displayMedium"
          style={{ alignSelf: 'center', textAlign: 'center' }}
        >
          {pageConfig.title}
        </Text>

        <Image
          source={{ uri: pageConfig.imageUrl }}
          width={windowWidth}
          style={{ aspectRatio: 1 }}
        />

        <View style={{ gap: 8 }}>
          <Text
            variant="headlineSmall"
            style={{ alignSelf: 'center', textAlign: 'center' }}
          >
            {pageConfig.subtitle}
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              alignSelf: 'center',
              textAlign: 'justify',
              color: theme.colors.onSurfaceVariant,
              paddingHorizontal: 20,
            }}
          >
            {pageConfig.description}
          </Text>
        </View>

        <Button
          mode="elevated"
          style={{ alignSelf: 'center' }}
          icon="fire"
          onPress={handleStart}
        >
          {pageConfig.buttonTitle}
        </Button>
      </View>
    </SafeAreaView>
  );
};
