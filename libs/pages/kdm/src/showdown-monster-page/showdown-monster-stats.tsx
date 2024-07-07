import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';
import { useShowdownMonster } from '@entities/kdm-showdown';
import { useCurrentSession } from '@entities/kdm-session';
import { BottomSheet } from '@shared/ui';

type ShowdownMonsterStatsProps = ViewProps;

const statsData = [
  { name: 'MOV' as const, id: 'movement' as const },
  { name: 'TGH' as const, id: 'toughness' as const },
  {
    name: 'SPD' as const,
    id: 'speedModifier' as const,
    hasPrefix: true,
  },
  {
    name: 'DMG' as const,
    id: 'damageModifier' as const,
    hasPrefix: true,
  },
  {
    name: 'ACC' as const,
    id: 'accuracyModifier' as const,
    hasPrefix: true,
  },
  {
    name: 'LCK' as const,
    id: 'luckModifier' as const,
    hasPrefix: true,
  },
];

export const ShowdownMonsterStats = ({
  ...rest
}: ShowdownMonsterStatsProps) => {
  const { data: session } = useCurrentSession();
  const { data: showdownMonster, mutate: mutateShowdownMonster } =
    useShowdownMonster({
      variables: { sessionId: session?.id, year: session?.year },
    });

  const handleStatsUpdate = async ({
    id,
    name,
    value,
  }: {
    id: string;
    name: string;
    value: number;
  }) => {
    const newValue = await BottomSheet.show('StatsUpdateActionSheet', {
      payload: {
        data: {
          value,
          title: name,
        },
      },
    });

    newValue !== undefined &&
      mutateShowdownMonster?.((_item) => ({ ..._item, [id]: newValue }));
  };

  return (
    <View {...rest}>
      {!!showdownMonster &&
        statsData?.map((_item) => (
          <Chip
            onPress={() =>
              handleStatsUpdate({
                id: _item.id,
                name: _item.name,
                value: showdownMonster[_item.id],
              })
            }
            compact
            key={_item.name}
            mode="outlined"
          >{`${_item.hasPrefix && showdownMonster[_item.id] >= 0 ? '+' : ''}${
            showdownMonster[_item.id]
          } ${_item.name}`}</Chip>
        ))}
    </View>
  );
};
