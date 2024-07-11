import {Button} from '@rcd/components';
import searchByKeywordScreenSelector from '@rcd/store/selectors/searchByKeywordScreenSelector';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList, Text, StyleSheet, TextInput, View, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, isNil} from 'ramda';
import {MachineListItem} from '@rcd/components/MachineListItem';
import {Machine} from '@rcd/entities';

const SearchByKeywordScreen = () => {
  const dispatch = useDispatch();
  const {isLoading, keyword: stateKeyword, machines} = useSelector(searchByKeywordScreenSelector);

  const [keyword, setKeyword] = useState(stateKeyword);

  useFocusEffect(
    useCallback(() => {
      dispatch(createAction('searchByKeywordScreen/OPENED'));
    }, []),
  );

  const handleSubmit = useCallback(() => {
    dispatch(createAction('searchByKeywordScreen/SEARCH', {keyword}));
  }, [keyword]);

  const handleSelectMachine = useCallback((machine: Machine) => {
    dispatch(createAction('searchByKeywordScreen/SELECT_MACHINE', {machine}));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="characters"
          autoFocus={true}
          autoCorrect={false}
          placeholder="Въведи RX №"
          returnKeyType="search"
          placeholderTextColor={Colors.grays[800]}
          onChangeText={setKeyword}
          onSubmitEditing={handleSubmit}
          value={keyword}
        />

        <Button onPress={handleSubmit} isLoading={isLoading} style={styles.searchButton}>
          <MaterialCommunityIcons name="magnify" color={Colors.whites[100]} size={20} />
        </Button>
      </View>

      {!isEmpty(machines) && (
        <FlatList
          style={styles.list}
          data={machines}
          renderItem={({item}) => <MachineListItem item={item} onPress={() => handleSelectMachine(item)} />}
          keyExtractor={(item) => item.id}
        />
      )}

      {!isLoading && isEmpty(machines) && !isNil(stateKeyword) && (
        <Text style={styles.notFound}>Няма намерени резултати</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: Colors.blacks[200],
    paddingBottom: Platform.OS === 'android' ? Spacing.large : 0,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: Colors.grays[300],
    paddingVertical: Spacing.xxsmall,
    paddingHorizontal: Spacing.small,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.grays[500],
    paddingVertical: Spacing.xxsmall,
    paddingHorizontal: Spacing.xxsmall,
    color: Colors.whites[100],
    textAlign: 'left',
    fontSize: FontSize.small,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchButton: {
    width: '20%',
    padding: 0,
    paddingVertical: Spacing.xsmall,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  list: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  notFound: {
    color: Colors.whites[100],
    textAlign: 'center',
    marginTop: Spacing.large,
  },
});

export default SearchByKeywordScreen;
