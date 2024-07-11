import {path} from 'ramda';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useLayoutEffect} from 'react';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import machineScreenSelector from '@rcd/store/selectors/machineScreenSelector';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import {Party} from '@rcd/entities';

const MachineScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {isLoading, machine} = useSelector(machineScreenSelector);

  useFocusEffect(
    useCallback(() => {
      dispatch(createAction('machineScreen/OPENED', {machine: path(['params', 'machine'], route)}));
    }, [route.params]),
  );

  useLayoutEffect(() => {
    if (isLoading) {
      return;
    }

    navigation.setOptions({
      headerRight: ({tintColor}: {tintColor: string}) => (
        <Pressable style={{paddingHorizontal: Spacing.medium}} onPress={handlePressCheck}>
          {({pressed}) => (
            <MaterialCommunityIcons
              name="text-box-check-outline"
              color={pressed ? Colors.alpha(tintColor, 0.5) : tintColor}
              size={24}
            />
          )}
        </Pressable>
      ),
    });
  }, [machine, isLoading]);

  const handlePressCheck = useCallback(() => {
    dispatch(createAction('machineScreen/CHECK', {machine}));
  }, [machine]);

  const handleMakeCall = useCallback(
    (party: Party) => {
      dispatch(createAction('machineScreen/MAKE_CALL', {party}));
    },
    [machine],
  );

  if (isLoading || !machine) {
    return (
      <View style={[styles.container, styles.content]}>
        <ActivityIndicator size="large" color={Colors.whites[100]} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.machineTitle}>{machine.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Технически характеристики</Text>

        <View style={styles.description}>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>RX №</Text>
            <Text style={styles.descriptionValue}>{machine.rentexnumber || '--'}</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>Вид</Text>
            <Text style={styles.descriptionValue}>{machine.type || '--'}</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>Марка</Text>
            <Text style={styles.descriptionValue}>{machine.brand || '--'}</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>Модел</Text>
            <Text style={styles.descriptionValue}>{machine.model || '--'}</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>Година</Text>
            <Text style={styles.descriptionValue}>{machine.year || '--'}</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionTitle}>Състояние</Text>
            <Text style={styles.descriptionValue}>{machine.condition || '--'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Данни за договор</Text>

        {machine.contract && (
          <View style={[styles.message, styles.messageSuccess]}>
            <Text style={styles.messageText}>Машината в момента е по договор</Text>
          </View>
        )}

        {!machine.contract && (
          <View style={[styles.message, styles.messageWarning]}>
            <Text style={styles.messageText}>Машината в момента не е по договор</Text>
          </View>
        )}

        {machine.contract && (
          <View style={styles.description}>
            <View style={styles.descriptionRow}>
              <Text style={styles.descriptionTitle}>Договор №</Text>
              <Text style={styles.descriptionValue}>{machine.contract.number}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.descriptionTitle}>Дата</Text>
              <Text style={styles.descriptionValue}>{machine.contract.date_start}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.descriptionTitle}>Клиент</Text>
              <Text style={styles.descriptionValue}>{machine.contract.client}</Text>
            </View>
            <Pressable style={styles.descriptionRow} onPress={() => handleMakeCall(machine.contract.client_contact)}>
              <Text style={styles.descriptionTitle}>Представител</Text>
              <Text style={styles.descriptionValue}>{machine.contract.client_contact.name}</Text>
              {machine.contract.client_contact.phone && (
                <View style={styles.descriptionExtra}>
                  <MaterialCommunityIcons name="phone" size={32} color={Colors.whites[100]} />
                </View>
              )}
            </Pressable>
            <Pressable style={styles.descriptionRow} onPress={() => handleMakeCall(machine.contract.operator)}>
              <Text style={styles.descriptionTitle}>Оператор по договор</Text>
              <Text style={styles.descriptionValue}>{machine.contract.operator.name}</Text>
              {machine.contract.operator.phone && (
                <View style={styles.descriptionExtra}>
                  <MaterialCommunityIcons name="phone" size={32} color={Colors.whites[100]} />
                </View>
              )}
            </Pressable>
            <Pressable style={styles.descriptionRow} onPress={() => handleMakeCall(machine.contract.respondent)}>
              <Text style={styles.descriptionTitle}>Отговорник по сделката</Text>
              <Text style={styles.descriptionValue}>{machine.contract.respondent.name || '--'}</Text>
              {machine.contract.respondent.phone && (
                <View style={styles.descriptionExtra}>
                  <MaterialCommunityIcons name="phone" size={32} color={Colors.whites[100]} />
                </View>
              )}
            </Pressable>
            <Pressable
              style={styles.descriptionRow}
              onPress={() => handleMakeCall(machine.contract.client_key_account)}>
              <Text style={styles.descriptionTitle}>Кей акаунт</Text>
              <Text style={styles.descriptionValue}>{machine.contract.client_key_account.name}</Text>
              {machine.contract.client_key_account.phone && (
                <View style={styles.descriptionExtra}>
                  <MaterialCommunityIcons name="phone" size={32} color={Colors.whites[100]} />
                </View>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blacks[200],
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    padding: Spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: Spacing.medium,
  },
  sectionLabel: {
    color: Colors.grays[800],
    marginBottom: Spacing.xxsmall,
    fontSize: FontSize.xxxsmall,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  machineTitle: {
    color: Colors.whites[100],
    fontSize: FontSize.medium,
    textAlign: 'center',
  },
  description: {
    flexDirection: 'column',
    width: '100%',
  },
  descriptionRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.xxsmall,
    borderBottomColor: Colors.grays[800],
    borderBottomWidth: 0.2,
  },
  descriptionTitle: {
    width: '40%',
    color: Colors.grays[900],
    fontSize: FontSize.xxsmall,
    textTransform: 'uppercase',
  },
  descriptionValue: {
    flex: 1,
    color: Colors.whites[100],
  },
  descriptionExtra: {
    alignItems: 'flex-end',
  },
  message: {
    borderRadius: 3,
    padding: Spacing.xxsmall,
  },
  messageSuccess: {
    backgroundColor: Colors.greens[100],
  },
  messageWarning: {
    backgroundColor: Colors.yellows[100],
  },
  messageText: {
    color: Colors.whites[100],
    textAlign: 'center',
  },
});

export default MachineScreen;
