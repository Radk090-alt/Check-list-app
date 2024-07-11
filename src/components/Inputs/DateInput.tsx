import {Colors, Spacing} from '@rcd/utility';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  oldValue: Date;
  onChange: (value: string) => void;
}

export const DateInput = ({oldValue, onChange}: Props) => {
  const [value, setValue] = useState(oldValue);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setValue(date);
    hideDatePicker();
  };

  useEffect(() => {
    onChange(value.toISOString());
  }, [value]);

  return (
    <View style={styles.container}>
      <Pressable onPress={showDatePicker} style={styles.input}>
        <Text style={{color: Colors.whites[100]}}>{value ? value.toLocaleDateString('bg') : ''}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={value}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
