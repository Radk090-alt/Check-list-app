import React from 'react';
import {Colors, Spacing} from '@rcd/utility';
import {ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';

interface Props {
  onPress: () => void;
  // eslint-disable-next-line no-undef
  children: string | JSX.Element;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({onPress, isLoading, disabled, children, style, textStyle}: Props) => (
  <Pressable
    disabled={disabled}
    style={({pressed}) => [
      {
        backgroundColor: pressed ? Colors.blues[200] : Colors.blues[100],
      },
      styles.button,
      style,
    ]}
    onPress={onPress}>
    {isLoading && <ActivityIndicator size="small" color={Colors.whites[100]} />}
    {!isLoading && typeof children === 'string' && <Text style={[styles.buttonText, textStyle]}>{children}</Text>}
    {!isLoading && typeof children !== 'string' && <React.Fragment>{children}</React.Fragment>}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: Spacing.medium,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.whites[100],
    textAlign: 'center',
  },
});
