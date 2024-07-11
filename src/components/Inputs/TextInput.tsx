import {Colors, Spacing} from '@rcd/utility';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';

interface Props extends Omit<React.ComponentProps<typeof RNTextInput>, 'onChange'> {
  oldValue: string;
  onChange: (value: string) => void;
}

export const TextInput = ({oldValue, onChange, ...props}: Props) => {
  const [value, setValue] = useState(oldValue);

  const handleChangeText = useCallback((text) => {
    setValue(text);
  }, []);

  useEffect(() => {
    // const timer = setTimeout(() => {
    onChange(value);
    // }, 750);

    // return () => clearTimeout(timer);
  }, [value]);

  return (
    <View style={styles.container}>
      <RNTextInput style={styles.input} value={value} onChangeText={handleChangeText} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.whites[100],
    paddingHorizontal: Spacing.xxsmall,
    paddingVertical: Spacing.xsmall - 5,
    borderRadius: 5,
    color: Colors.whites[100],
  },
});
