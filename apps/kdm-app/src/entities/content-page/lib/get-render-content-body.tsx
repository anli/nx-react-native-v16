import { Button, ButtonProps, MD3TypescaleKey, Text } from 'react-native-paper';
import { ContentBody, ContentElementVariables } from '@shared/api';
import { getElementStyle } from './get-element-style';
import { Image } from 'react-native';

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
              style={elementStyle}
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
          return (
            <Image
              key={index}
              source={{ uri: data }}
              width={
                widthVariableName ? variables?.[widthVariableName] : undefined
              }
              style={elementStyle}
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
              style={elementStyle}
              onPress={
                onPressVariableName
                  ? variables?.[onPressVariableName]
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
