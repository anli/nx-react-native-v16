import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';
import { useShowdownMonster } from '../../entities/showdown-monster';
import { useCurrentSession } from '../../entities/session';

type ShowdownMonsterStatsProps = ViewProps;

export const ShowdownMonsterStats = ({
  ...rest
}: ShowdownMonsterStatsProps) => {
  const { data: session } = useCurrentSession();
  const { data: showdownMonster } = useShowdownMonster({
    variables: { sessionId: session.id, year: session.year },
  });
  const data = [
    { name: 'MOV' as const, value: showdownMonster.movement },
    { name: 'TGH' as const, value: showdownMonster.movement },
    {
      name: 'SPD' as const,
      value: showdownMonster.speedModifier,
      hasPrefix: true,
    },
    {
      name: 'DMG' as const,
      value: showdownMonster.damageModifier,
      hasPrefix: true,
    },
    {
      name: 'ACC' as const,
      value: showdownMonster.accuracyModifier,
      hasPrefix: true,
    },
    {
      name: 'LCK' as const,
      value: showdownMonster.luckModifier,
      hasPrefix: true,
    },
  ];

  const handleStatsUpdate = () => {
    // TODO: I can see UI to update stats
  };

  return (
    <View {...rest}>
      {data?.map((_item) => (
        <Chip
          onPress={() => handleStatsUpdate()}
          compact
          key={_item.name}
          mode="outlined"
        >{`${_item.hasPrefix && _item.value >= 0 ? '+' : ''}${_item.value} ${
          _item.name
        }`}</Chip>
      ))}
    </View>
  );
};
