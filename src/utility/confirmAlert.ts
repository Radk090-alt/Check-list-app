import {Alert} from 'react-native';

interface ConfirmProps {
  title: string;
  subtitle: string;
  confirmText: string;
  declineText: string;
}

export const confirmAlert = ({
  title,
  subtitle,
  confirmText,
  declineText,
}: ConfirmProps): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    Alert.alert(
      title,
      subtitle,
      [
        {text: declineText, onPress: () => resolve(false)},
        {text: confirmText, onPress: () => resolve(true)},
      ],
      {cancelable: false},
    );
  });
};
