import { useEffect, useRef, useState } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { Modal } from 'react-native-paper';
import { Image } from '../image';
import { useTheme } from '../theme-provider';
import { Emitter } from './emitter';

type ImageModalParams = {
  imageUrl: string;
  aspectRatio?: number;
};

const emitterId = 'ImageModal';
const margin = 16;
const borderRadius = 16;

const ImageModalComponent = () => {
  const [visible, setVisible] = useState(false);
  const configRef = useRef<ImageModalParams | undefined>(undefined);
  const { imageUrl, aspectRatio = 1 } = configRef.current ?? {};
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - margin * 2;
  const theme = useTheme();

  const handleShow = (params: ImageModalParams) => {
    configRef.current = params;
    setVisible(true);
  };
  const handleDismiss = () => {
    setVisible(false);
    configRef.current = undefined;
  };

  useEffect(() => {
    Emitter.on(`${emitterId}Show`, handleShow);
    Emitter.on(`${emitterId}Dismiss`, handleDismiss);

    return () => {
      Emitter.rmAll(`${emitterId}Show`);
      Emitter.rmAll(`${emitterId}Dismiss`);
    };
  }, []);

  if (!configRef.current) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      dismissable
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
        margin,
        borderRadius,
      }}
    >
      <Pressable onPress={handleDismiss}>
        <Image
          source={{
            uri: imageUrl,
          }}
          contentFit="fill"
          style={{
            aspectRatio,
            width,
            borderRadius,
          }}
        />
      </Pressable>
    </Modal>
  );
};

export const ImageModal = Object.assign(ImageModalComponent, {
  show: (params: ImageModalParams) =>
    Emitter.emit<ImageModalParams>(`${emitterId}Show`, params),
  dismiss: () => Emitter.emit(`${emitterId}Dismiss`),
});
