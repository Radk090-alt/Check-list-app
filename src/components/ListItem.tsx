import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Item {
  title: string;
  description?: string | string[];
}

interface Props<T> {
  item: T;
  onPress: () => void;
}

export function ListItem<T extends Item>({item, onPress}: Props<T>) {
  const description = Array.isArray(item.description) ? item.description : [item.description];

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colors.blues[200] : 'transparent',
        },
        styles.item,
      ]}
      onPress={onPress}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.title}</Text>
        {description.map((d) => (
          <Text style={styles.itemDescription}>{d}</Text>
        ))}
      </View>
      <MaterialCommunityIcons name="chevron-right" color={Colors.whites[100]} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  itemInfo: {
    flexDirection: 'column',
  },
  itemText: {
    color: Colors.whites[100],
    textAlign: 'left',
    fontSize: FontSize.small,
  },
  itemDescription: {
    color: Colors.grays[800],
    textAlign: 'left',
    marginTop: Spacing.xxsmall,
    fontSize: FontSize.xxsmall,
  },
});
