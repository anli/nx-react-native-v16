import { ScrollView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentSession } from '../entities/session';
import { useShowdownMonster } from '../entities/showdown-monster';

export const ShowdownMonsterPage = () => {
  const theme = useTheme();
  const { data: session } = useCurrentSession();
  const { data: showdownMonster } = useShowdownMonster({
    variables: { sessionId: session.id, year: session.year },
  });
  const title = `${showdownMonster.encounter.name}`;

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
          <Appbar.Content title={title} />
        </Appbar.Header>
      </ScrollView>
    </SafeAreaView>
  );
};
