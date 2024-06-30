import { ScrollView } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentSession } from '../../entities/session';
import { useShowdownMonster } from '../../entities/showdown-monster';
import { ShowdownMonsterStats } from './showdown-monster-stats';
import { useTheme } from '../../shared/ui';

export const ShowdownMonsterPage = () => {
  const theme = useTheme();
  const { data: session, mutate: mutateCurrentSession } = useCurrentSession();
  const { data: showdownMonster } = useShowdownMonster({
    variables: { sessionId: session.id, year: session.year },
  });
  const title = `${showdownMonster.encounter.name}`;

  const handleRestart = () => {
    mutateCurrentSession(null);
  };

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
          <Appbar.Action icon="restart" onPress={handleRestart} />
        </Appbar.Header>

        <List.Section>
          <List.Subheader>Stats</List.Subheader>
          <ShowdownMonsterStats className="px-4 flex-row gap-4 flex-wrap" />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};
