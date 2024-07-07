import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';
import { useShowdownMonster } from '../../entities/showdown-monster';
import { useCurrentSession } from '../../entities/session';
import { BottomSheet } from '@shared/ui';

type ShowdownMonsterStatsProps = ViewProps;

const statsData = [
  { name: 'MOV' as const, id: 'movement' },
  { name: 'TGH' as const, id: 'toughness' },
  {
    name: 'SPD' as const,
    id: 'speedModifier',
    hasPrefix: true,
  },
  {
    name: 'DMG' as const,
    id: 'damageModifier',
    hasPrefix: true,
  },
  {
    name: 'ACC' as const,
    id: 'accuracyModifier',
    hasPrefix: true,
  },
  {
    name: 'LCK' as const,
    id: 'luckModifier',
    hasPrefix: true,
  },
];

export const ShowdownMonsterStats = ({
  ...rest
}: ShowdownMonsterStatsProps) => {
  const { data: session } = useCurrentSession();
  const { data: showdownMonster, mutate: mutateShowdownMonster } =
    useShowdownMonster({
      variables: { sessionId: session.id, year: session.year },
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
      mutateShowdownMonster((_item) => ({ ..._item, [id]: newValue }));
  };

  return (
    <View {...rest}>
      {statsData?.map((_item) => (
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
