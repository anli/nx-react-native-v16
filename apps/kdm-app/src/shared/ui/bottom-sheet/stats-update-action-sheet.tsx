import { View } from 'react-native';
import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { Button, IconButton, List, Text } from 'react-native-paper';
import { useState } from 'react';
import { BottomSheet } from './bottom-sheet-provider';
import { useTheme } from '../theme-provider';

export const StatsUpdateActionSheet = ({
  sheetId,
  payload,
}: SheetProps<'StatsUpdateActionSheet'>) => {
  const [value, setValue] = useState<number>(payload.data?.value);
  const theme = useTheme();

  const handlePress = () => {
    BottomSheet.hide(sheetId, {
      payload: value,
    });
  };

  return (
    <ActionSheet
      id={sheetId}
      containerStyle={{ backgroundColor: theme.colors.background }}
      {...payload?.actionSheetProps}
    >
      <View className="py-4">
        <List.Section>
          <List.Item
            title={payload.data?.title}
            right={(_props) => {
              return (
                <>
                  <IconButton
                    icon="minus"
                    onPress={() => setValue((_value) => _value - 1)}
                    {..._props}
                  />
                  <Text variant="bodyLarge" {..._props}>
                    {value}
                  </Text>
                  <IconButton
                    icon="plus"
                    onPress={() => setValue((_value) => _value + 1)}
                    {..._props}
                  />
                </>
              );
            }}
          />
        </List.Section>
        <View className="px-5">
          <Button mode="outlined" onPress={handlePress}>
            Update
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
};
