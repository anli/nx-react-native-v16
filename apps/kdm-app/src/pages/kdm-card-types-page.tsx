import { ComponentProps } from 'react';
import { FlatList } from 'react-native';
import { Appbar, List, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const smallAspectRatio = 1;
const mediumAspectRatio = 0.637;
const largeAspectRatio = 0.55;
const getListItemIcon =
  (icon: string) =>
    (props: Pick<ComponentProps<typeof List.Icon>, 'color' | 'style'>) =>
      <List.Icon {...props} icon={icon} />;

const useCardTypes = () => {
  return {
    data: [
      {
        id: 'PRINCIPLE' as const,
        name: 'Principles',
        description:
          "Principles are your settlement's guiding philosophies and a type of innovation.",
        iconName: 'scale-balance',
        aspectRatio: mediumAspectRatio,
      },
      {
        id: 'INNOVATION' as const,
        name: 'Innovations',
        description:
          'Innovations are a set of cards in Kingdom Death: Monster, that act as a type of advancement for a settlement.',
        iconName: 'test-tube',
        aspectRatio: mediumAspectRatio,
      },
      {
        id: 'SETTLEMENT_EVENT' as const,
        name: 'Settlement Events',
        description: 'An event occurring during the Settlement Phase.',
        iconName: 'bookmark-outline',
        aspectRatio: mediumAspectRatio,
      },
      {
        id: 'SETTLEMENT_LOCATION' as const,
        name: 'Settlement Locations',
        description:
          'Settlement Locations are a card type found in Kingdom Death: Monster.',
        iconName: 'office-building',
        aspectRatio: largeAspectRatio,
      },
      {
        id: 'WEAPON_SPECIALIZATION' as const,
        name: 'Weapon Specialization',
        description:
          'Achieved when a survivor has three or more levels of weapon proficiency.',
        iconName: 'fencing',
        aspectRatio: mediumAspectRatio,
      },
      {
        id: 'GEAR' as const,
        name: 'Gear',
        description:
          'Objects that survivors may carry and wear, represented by gear cards.',
        iconName: 'tshirt-crew',
        aspectRatio: smallAspectRatio,
      },
      {
        id: 'MONSTER_AI' as const,
        name: 'Monster AI',
        description: 'An AI card belongs to the AI Deck.',
        iconName: 'chess-queen',
        aspectRatio: mediumAspectRatio,
      },
      {
        id: 'MONSTER_HIT_LOCATION' as const,
        name: 'Monster Hit Location',
        description:
          'Each monster has a unique hit location deck composed of hit location cards. ',
        iconName: 'medical-bag',
        aspectRatio: mediumAspectRatio,
      },
    ],
  };
};

export const KdmCardTypesPage = () => {
  const theme = useTheme();
  const { data } = useCardTypes();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      edges={[]}
    >
      <FlatList
        keyExtractor={({ id }) => id}
        data={data}
        ListHeaderComponent={
          <Appbar.Header mode="medium">
            <Appbar.Content title="Cards" />
          </Appbar.Header>
        }
        renderItem={({ item: { name, description, iconName } }) => {
          return (
            <List.Item
              titleNumberOfLines={1}
              descriptionNumberOfLines={1}
              title={name}
              description={description}
              left={getListItemIcon(iconName)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
