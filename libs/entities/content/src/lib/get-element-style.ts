import { ContentElementStyle, ContentElementVariables } from '@shared/api';

export const getElementStyle = ({
  variables,
  style,
}: {
  variables: ContentElementVariables;
  style?: ContentElementStyle;
}) => {
  if (!style) {
    return undefined;
  }

  const { colorVariableName, ...restStyle } = style ?? {};

  return {
    color: colorVariableName
      ? variables?.[colorVariableName as keyof ContentElementVariables]
      : undefined,
    ...restStyle,
  } as unknown;
};
