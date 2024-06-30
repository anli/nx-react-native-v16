import { ComponentProps } from 'react';
import {
  ActionSheetProps,
  SheetDefinition,
  SheetManager,
  SheetProvider,
  registerSheet,
} from 'react-native-actions-sheet';
import { StatsUpdateActionSheet } from './stats-update-action-sheet';

registerSheet('StatsUpdateActionSheet', StatsUpdateActionSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    StatsUpdateActionSheet: SheetDefinition<{
      payload: {
        data: {
          title: string;
          value: number;
        };
        actionSheetProps?: ActionSheetProps;
      };
      returnValue: number;
    }>;
  }
}

export const BottomSheetProvider = (
  props: ComponentProps<typeof SheetProvider>
) => {
  return <SheetProvider {...props} />;
};

export const BottomSheet = SheetManager;
