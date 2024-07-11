import {Category, Machine} from '@rcd/entities';
import searchByCategoryScreenSelector from '@rcd/store/selectors/searchByCategoryScreenSelector';
import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'ramda';
import {MachineListItem} from '@rcd/components/MachineListItem';

const SearchByCategoryScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const level = route.params?.level || 1;
  const {categories, machines, isLoading} = useSelector(searchByCategoryScreenSelector);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        createAction('searchByCategoryScreen/OPENED', {
          category: route.params?.category,
          level,
        }),
      );
    }, [route]),
  );

  const handleSelectCategory = useCallback((category: Category) => {
    dispatch(createAction('searchByCategoryScreen/SELECT_CATEGORY', {category, level}));
  }, []);

  const handleSelectMachine = useCallback((machine: Machine) => {
    dispatch(createAction('searchByCategoryScreen/SELECT_MACHINE', {machine}));
  }, []);

  const renderCategoryItem = ({item}: {item: Category}) => (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colors.blues[200] : 'transparent',
        },
        styles.category,
      ]}
      onPress={() => handleSelectCategory(item)}>
      <Text style={styles.categoryText}>{item.title}</Text>
      <MaterialCommunityIcons name="chevron-right" color={Colors.whites[100]} size={24} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {isLoading[level] && <ActivityIndicator size="large" color={Colors.whites[100]} />}

      {!isLoading[level] && !isEmpty(categories[level]) && (
        <FlatList
          style={styles.list}
          data={categories[level]}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {!isLoading[level] && isEmpty(categories[level]) && !isEmpty(machines) && (
        <FlatList
          style={styles.list}
          data={machines}
          renderItem={({item}) => <MachineListItem item={item} onPress={() => handleSelectMachine(item)} />}
          keyExtractor={(item) => item.id}
        />
      )}

      {!isLoading[level] && isEmpty(categories[level]) && isEmpty(machines) && (
        <Text style={styles.notFound}>Няма намерени резултати</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.blacks[200],
    paddingBottom: Platform.OS === 'android' ? Spacing.large : 0,
  },
  list: {
    flex: 1,
    height: '100%',
  },
  category: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  categoryText: {
    color: Colors.whites[100],
    textAlign: 'left',
  },
  notFound: {
    color: Colors.whites[100],
    textAlign: 'center',
    marginTop: Spacing.large,
  },
});

export default SearchByCategoryScreen;
