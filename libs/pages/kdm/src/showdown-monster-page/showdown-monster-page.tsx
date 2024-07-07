import { Alert, ScrollView } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentSession } from '@entities/kdm-session';
import { useShowdownMonster } from '@entities/kdm-showdown';
import { ShowdownMonsterStats } from './showdown-monster-stats';
import { useTheme } from '@shared/ui';
import { useDeleteCurrentSession } from '@features/kdm-session';

export const ShowdownMonsterPage = () => {
  const theme = useTheme();
  const { data: session } = useCurrentSession();
  const { mutate: deleteCurrentSession } = useDeleteCurrentSession();
  const { data: showdownMonster } = useShowdownMonster({
    variables: { sessionId: session?.id, year: session?.year },
  });
  const title = `${showdownMonster?.encounter.name}`;

  const handleRestart = () => {
    Alert.alert('Are your sure?', 'You cannot undo this', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: deleteCurrentSession },
    ]);
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
