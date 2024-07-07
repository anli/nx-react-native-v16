import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';
import { useShowdownMonster } from '@entities/kdm-showdown';
import { useCurrentSession } from '@entities/kdm-session';
import { monsterBasics } from '@shared/api';
import { ImageModal } from '@shared/ui';

export const ShowdownMonsterActives = ({ ...rest }: ViewProps) => {
  const { data: session } = useCurrentSession();
  const { data: showdownMonster } = useShowdownMonster({
    variables: { sessionId: session?.id, year: session?.year },
  });
  const monsterAis = [...monsterBasics];

  if (!showdownMonster) {
    return null;
  }

  return (
    <View {...rest}>
      <Chip
        compact
        mode="outlined"
        onPress={
          showdownMonster.encounter.imageUrl
            ? () =>
                ImageModal.show({
                  imageUrl: showdownMonster.encounter.imageUrl ?? '',
                  aspectRatio: showdownMonster.encounter.aspectRatio,
                })
            : undefined
        }
      >
        {showdownMonster.encounter.monster?.name}
      </Chip>
      {!!showdownMonster &&
        showdownMonster.aiActiveIds?.map((_id) => {
          const item = monsterAis.find((_item) => _item.id === _id);

          return (
            <Chip
              compact
              key={item?.name}
              mode="outlined"
              onPress={
                item
                  ? () =>
                      ImageModal.show({
                        imageUrl: item.imageUrl ?? '',
                        aspectRatio: item.aspectRatio,
                      })
                  : undefined
              }
            >
              {item?.name}
            </Chip>
          );
        })}
    </View>
  );
};
