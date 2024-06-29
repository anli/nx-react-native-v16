import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { IconProps } from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KdmCardTypesPage } from '../../pages';

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

const Icon = (props: IconProps) => {
  return <MaterialCommunityIcons {...props} />;
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
const configs: Config[] = [
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
