import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { KdmCardTypesPage, ShowdownMonsterPage } from '../../pages';
import { Icon } from '../../shared/ui';

type Config = {
  name: string;
  component: () => React.JSX.Element;
  tabBarLabel: string;
  tabBarIcon: ({
    color,
    focused,
  }: {
    focused: boolean;
    color: string;
  }) => React.JSX.Element;
};

const Tab = createMaterialBottomTabNavigator();
const getTabBarIcon =
  (focusedIconName: string, unfocusedIconName: string) =>
  ({ color, focused }: { focused: boolean; color: string }) =>
    (
      <Icon
        name={focused ? focusedIconName : unfocusedIconName}
        color={color}
        size={24}
      />
    );
const Stack = createNativeStackNavigator();
const pageScreenOptions = {
  headerShown: false,
};
const KdmCardsStack = () => {
  return (
    <Stack.Navigator screenOptions={pageScreenOptions}>
      <Stack.Screen name="KdmCardTypesPage" component={KdmCardTypesPage} />
    </Stack.Navigator>
  );
};
const ShowdownMonsterStack = () => {
  return (
    <Stack.Navigator screenOptions={pageScreenOptions}>
      <Stack.Screen
        name="ShowdownMonsterPage"
        component={ShowdownMonsterPage}
      />
    </Stack.Navigator>
  );
};
const configs: Config[] = [
  {
    name: 'ShowdownMonsterStack',
    component: ShowdownMonsterStack,
    tabBarLabel: 'Monster',
    tabBarIcon: getTabBarIcon('paw', 'paw-outline'),
  },
  {
    name: 'CardsTab',
    component: KdmCardsStack,
    tabBarLabel: 'Cards',
    tabBarIcon: getTabBarIcon('cards', 'cards-outline'),
  },
];
const safeAreaInsets = {
  bottom: Platform.select({ ios: 16, default: undefined }),
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator safeAreaInsets={safeAreaInsets}>
      {configs.map((_config) => (
        <Tab.Screen
          key={_config.name}
          name={_config.name}
          component={_config.component}
          options={{
            tabBarLabel: _config.tabBarLabel,
            tabBarIcon: _config.tabBarIcon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
