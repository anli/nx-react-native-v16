import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ContentPage: { id: string };
  BottomTabs: undefined;
  CardsTab: undefined;
  KdmCardTypesPage: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}

    type RouteProps<T extends keyof RootStackParamList> =
      NativeStackScreenProps<RootStackParamList, T>['route'];
  }
}
