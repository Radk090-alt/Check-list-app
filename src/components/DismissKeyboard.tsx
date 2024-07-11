import React, {useCallback} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

interface Props {
  children: JSX.Element;
}

export const DismissKeyboard = ({children}: Props) => {
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
};
