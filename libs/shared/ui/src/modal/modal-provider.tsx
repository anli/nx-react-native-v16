import { Portal, PortalHostProps } from 'react-native-paper';

export const ModalProvider = ({ children, ...rest }: PortalHostProps) => {
  return <Portal {...rest}>{children}</Portal>;
};
