import React from 'react';
import {Machine} from '@rcd/entities';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  item: Machine;
  onPress: () => void;
}

export const MachineListItem = ({item, onPress}: Props) => (
  <Pressable
    style={({pressed}) => [
      {
        backgroundColor: pressed ? Colors.blues[200] : 'transparent',
      },
      styles.machine,
    ]}
    onPress={onPress}>
    <View style={styles.machineInfo}>
      <Text style={styles.machineText}>{item.title}</Text>
      {!!item.model && <Text style={styles.machineDescription}>Модел: {item.model}</Text>}
      <Text style={styles.machineDescription}>RX №: {item.rentexnumber}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" color={Colors.whites[100]} size={24} />
  </Pressable>
);

const styles = StyleSheet.create({
  machine: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  machineInfo: {
    flexDirection: 'column',
  },
  machineText: {
    color: Colors.whites[100],
    textAlign: 'left',
    fontSize: FontSize.small,
  },
  machineDescription: {
    color: Colors.grays[800],
    textAlign: 'left',
    marginTop: Spacing.xxsmall,
    fontSize: FontSize.xxsmall,
  },
});
