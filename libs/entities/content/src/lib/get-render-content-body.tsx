import { Button, ButtonProps, MD3TypescaleKey, Text } from 'react-native-paper';
import { ContentBody, ContentElementVariables } from '@shared/api';
import { getElementStyle } from './get-element-style';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image } from '@shared/ui';
import { ImageStyle } from 'expo-image';

export const getRenderContentBody =
  ({ variables }: { variables: ContentElementVariables }) =>
  ({
    item: {
      element,
      data,
      variant,
      widthVariableName,
      onPressVariableName,
      style,
      ...rest
    },
    index,
  }: {
    item: ContentBody;
    index: number;
  }) => {
    const elementStyle = getElementStyle({ variables, style });

    switch (element) {
      case 'Text':
        if (typeof data === 'string') {
          return (
            <Text
              key={index}
              style={elementStyle as StyleProp<TextStyle>}
              variant={variant as keyof typeof MD3TypescaleKey}
              {...rest}
            >
              {data}
            </Text>
          );
        }
        break;

      case 'Image':
        if (typeof data === 'string') {
          const imageStyle = {
            width: widthVariableName
              ? Number(
                  variables?.[
                    widthVariableName as keyof ContentElementVariables
                  ]
                )
              : undefined,
            aspectRatio: 1,
          };

          return (
            <Image
              contentFit="fill"
              key={index}
              source={{ uri: data }}
              style={[elementStyle as StyleProp<ImageStyle>, imageStyle]}
              {...rest}
            />
          );
        }
        break;
      case 'Button':
        if (typeof data === 'string') {
          return (
            <Button
              key={index}
              mode={variant as ButtonProps['mode']}
              style={elementStyle as StyleProp<ViewStyle>}
              onPress={
                onPressVariableName
                  ? (variables?.[
                      onPressVariableName as keyof ContentElementVariables
                    ] as () => void)
                  : undefined
              }
              {...rest}
            >
              {data}
            </Button>
          );
        }
        break;
      default:
        return null;
    }

    return null;
  };
