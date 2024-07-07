import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateFirstSession } from '../features/session';
import { getRenderContentBody, useContentPage } from '../entities/content-page';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shared/ui';

export const ContentPage = () => {
  const {
    params: { id },
  } = useRoute<ReactNavigation.RouteProps<'ContentPage'>>();
  const { width: windowWidth } = useWindowDimensions();
  const theme = useTheme();
  const { mutate: createFirstSession } = useCreateFirstSession();
  const { data: contentPage } = useContentPage(id);
  const renderContentBody = getRenderContentBody({
    variables: {
      windowWidth,
      onSurfaceVariant: theme.colors.onSurfaceVariant,
      createFirstSession,
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View className={contentPage?.bodyClassName}>
        {contentPage?.body?.map((item, index) =>
          renderContentBody({ item, index })
        )}
      </View>
    </SafeAreaView>
  );
};
