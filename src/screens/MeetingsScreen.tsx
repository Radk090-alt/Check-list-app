import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import React, {useCallback} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '@rcd/components/ListItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Среща 1',
    description: new Date().toLocaleString('bg'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Среща 2',
    description: new Date().toLocaleString('bg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Среща 3',
    description: new Date().toLocaleString('bg'),
  },
];

const MeetingsScreen = () => {
  const dispatch = useDispatch();
  const handleNavigateTo = useCallback(
    (type: string) => () => {
      dispatch(
        createAction('navigation/PUSH', {
          name: 'app/Forms',
          params: {
            screen: 'forms/Create',
            params: {
              type,
            },
          },
        }),
      );
    },
    [],
  );

  const renderItem = ({item}) => <ListItem item={item} onPress={() => console.warn('press')} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList style={{width: '100%'}} data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
        <Pressable onPress={handleNavigateTo('meeting')} style={styles.button}>
          <MaterialCommunityIcons name="plus" size={28} color={Colors.whites[100]} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.medium,
  },

  button: {
    borderRadius: 9999,
    position: 'absolute',
    bottom: Spacing.medium,
    right: Spacing.medium,
    padding: Spacing.small,
    backgroundColor: Colors.blues[100],
  },
});

export default MeetingsScreen;
