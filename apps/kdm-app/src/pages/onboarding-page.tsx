import { Image, View, useWindowDimensions } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export const OnboardingPage = () => {
  const { width: windowWidth } = useWindowDimensions()
  const theme = useTheme()

  return <SafeAreaView style={{
    flex: 1,
    backgroundColor: theme.colors.background
  }}>
    <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
      <Text variant="displayMedium" style={{ alignSelf: 'center', textAlign: 'center' }}>KDM</Text>

      <Image source={{ uri: "https://fakeimg.pl/350x350/?text=KDM" }} width={windowWidth} style={{ aspectRatio: 1 }} />

      <View style={{ gap: 8 }}>
        <Text variant="headlineMedium" style={{ alignSelf: 'center', textAlign: 'center' }}>Lorem ipsum</Text>
        <Text variant="bodyLarge" style={{ alignSelf: 'center', textAlign: 'center' }}>Curabitur erat magna, volutpat sed massa id, ullamcorper lobortis felis</Text>
      </View>

      <Button mode="elevated" style={{ alignSelf: 'center' }}>
        Get Started
      </Button>

    </View>
  </SafeAreaView>
}
