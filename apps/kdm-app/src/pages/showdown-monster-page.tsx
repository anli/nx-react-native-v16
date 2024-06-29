import { ScrollView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ShowdownMonsterPage = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      edges={[]}
    >
      <ScrollView>
        <Appbar.Header mode="medium">
          <Appbar.Content title="Monster" />
        </Appbar.Header>
      </ScrollView>
    </SafeAreaView>
  );
};
