import {Colors, FontSize, Spacing} from '@rcd/utility';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

interface Item {
  label: string;
  value: string;
}
interface Props {
  value: string;
  options: Item[];
  onChange: (value: string) => void;
  variant?: string;
}

export const SelectInput = ({value: oldValue, options, onChange, variant}: Props) => {
  const [value, setValue] = useState(oldValue);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleChange = useCallback((newValue: Item) => {
    setValue(newValue.value);
    setModalOpen(false);
  }, []);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Pressable style={variant === 'crm' ? styles.selectCrm : styles.select} onPress={showModal}>
        <Text style={variant === 'crm' ? styles.selectTextCrm : styles.selectText}>
          {options.find((option) => option.value === value)?.label || 'Моля изберете'}
        </Text>
        <MaterialCommunityIcons name="chevron-right" color={Colors.whites[100]} size={32} />
      </Pressable>

      <Modal
        isVisible={modalOpen}
        onBackdropPress={hideModal}
        backdropTransitionOutTiming={0}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <ScrollView style={styles.modal} indicatorStyle="black">
          {options?.map((option, i: number) => (
            <Pressable key={i} onPress={() => handleChange(option)} style={styles.button}>
              <Text style={styles.optionText}>{option.label}</Text>

              {option.value === value && <MaterialCommunityIcons name="check" color={Colors.blacks[100]} size={22} />}
            </Pressable>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },

  select: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: Colors.whites[100],
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxsmall,
    paddingVertical: Spacing.xxsmall,
    borderRadius: 5,
  },

  selectCrm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.grays[500],
    paddingVertical: Spacing.xsmall / 1.5,
    paddingHorizontal: Spacing.xsmall,
    marginVertical: Spacing.small / 2,
    color: Colors.whites[100],
    textAlign: 'left',
    fontSize: FontSize.small,
    borderRadius: 5,
  },

  selectText: {
    textAlign: 'center',
    color: Colors.whites[100],
  },

  selectTextCrm: {
    textAlign: 'center',
    color: Colors.whites[100],
  },

  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    maxHeight: (Dimensions.get('window').height / 100) * 75,
  },

  optionText: {
    color: Colors.blacks[100],
    lineHeight: 22,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
});
