import { ImageStyle, TextStyle } from 'react-native';

export type ContentElementVariables = {
  windowWidth: number;
  onSurfaceVariant: string;
  createFirstSession: () => void;
};

export type ContentElementStyle = (TextStyle | ImageStyle) & {
  colorVariableName?: string;
};

export type ContentBody = {
  element: string;
  variant?: string;
  className?: string;
  data?: string | Date;
  widthVariableName?: string;
  style?: ContentElementStyle;
  colorVariableName?: string;
  icon?: string;
  onPressVariableName?: string;
};

export type ContentPage = {
  id: string;
  bodyClassName?: string;
  body: ContentBody[];
};

export const ContentPages: ContentPage[] = [
  {
    id: 'ONBOARDING',
    bodyClassName: 'flex-1 justify-evenly',
    body: [
      {
        element: 'Text',
        variant: 'displayMedium' as const,
        className: 'self-center text-center px-5',
        data: 'Umbra',
      },
      {
        element: 'Image',
        widthVariableName: 'windowWidth' as const,
        className: 'aspect-square',
        data: 'https://imgur.com/47qQtEU.png',
      },
      {
        element: 'Text',
        variant: 'headlineSmall' as const,
        className: 'self-center text-center px-5',
        data: 'Ignite Hope',
      },
      {
        element: 'Text',
        variant: 'bodyLarge' as const,
        className: 'self-center px-5',
        data: 'In a world consumed by darkness, your settlement stands alone. Survival hinges on keeping your people alive against insurmountable odds.',
        style: {
          textAlign: 'justify',
          colorVariableName: 'onSurfaceVariant',
        },
      },
      {
        element: 'Button',
        variant: 'elevated' as const,
        data: 'Embrace Shadows',
        style: { alignSelf: 'center' },
        icon: 'fire',
        onPressVariableName: 'createFirstSession',
      },
    ],
  },
];
