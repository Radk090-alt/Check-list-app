import {Button} from '@rcd/components';
import {APP_ENV} from '@rcd/environment';
import serviceScreenSelector from '@rcd/store/selectors/serviceScreenSelector';
import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import React, {useCallback} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChecklistScreen = () => {
  const dispatch = useDispatch();
  const {checklist} = useSelector(serviceScreenSelector);

  const handleOpenChecklist = useCallback(() => {
    dispatch(createAction('serviceScreen/OPEN_CHECKLIST', {checklist}));
  }, [checklist]);

  const handleSearchByKeyword = useCallback(() => {
    dispatch(
      createAction('navigation/PUSH', {
        name: 'app/Service',
        params: {
          screen: 'service/Main',
          params: {
            screen: 'service/SearchByKeyword',
          },
        },
      }),
    );
  }, []);

  const handleSearchByCategory = useCallback(() => {
    dispatch(
      createAction('navigation/PUSH', {
        name: 'app/Service',
        params: {
          screen: 'service/Main',
          params: {
            screen: 'service/SearchByCategory',
          },
        },
      }),
    );
  }, []);

  const handleSearchByTextRecognition = useCallback(() => {
    dispatch(
      createAction('navigation/PUSH', {
        name: 'app/Service',
        params: {
          screen: 'service/Main',
          params: {
            screen: 'service/SearchByTextRecognition',
          },
        },
      }),
    );
  }, []);

  const handleTest = useCallback(() => {
    dispatch(
      createAction('navigation/PUSH', {
        name: 'app/Service',
        params: {
          screen: 'service/Main',
          params: {
            screen: 'service/Machine',
            params: {
              machine: {id: 10811},
            },
          },
        },
      }),
    );
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {checklist && (
          <Pressable onPress={handleOpenChecklist} style={styles.notification}>
            {({pressed}) => (
              <React.Fragment>
                <Text style={styles.notificationText}>Започнат чеклист за машина: {checklist.machine.title}</Text>
                <View style={styles.notificationRight}>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    color={pressed ? Colors.alpha(Colors.whites[100], 0.5) : Colors.whites[100]}
                    size={24}
                  />
                </View>
              </React.Fragment>
            )}
          </Pressable>
        )}
        <Button onPress={handleSearchByKeyword}>ТЪРСЕНЕ ПО RX №</Button>
        <Button onPress={handleSearchByCategory} style={styles.topGap}>
          ТЪРСЕНЕ ПО КАТЕГОРИЯ
        </Button>
        <Button onPress={handleSearchByTextRecognition} style={styles.topGap}>
          ТЪРСЕНЕ ПО СНИМКА
        </Button>
        {APP_ENV === 'local' && (
          <Button onPress={handleTest} style={styles.topGap}>
            Машина 10811
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.large,
  },

  notification: {
    backgroundColor: Colors.alpha(Colors.yellows[100], 0.7),
    borderRadius: 5,
    position: 'absolute',
    top: Spacing.small,
    width: '100%',
    paddingHorizontal: Spacing.xsmall,
    paddingVertical: Spacing.xxsmall,
    paddingRight: Spacing.xxsmall,
    flexDirection: 'row',
  },

  notificationText: {
    flex: 1,
    color: Colors.whites[100],
  },

  notificationRight: {
    justifyContent: 'center',
  },

  button: {
    width: '100%',
    paddingVertical: Spacing.medium,
  },
  topGap: {
    marginTop: Spacing.medium,
  },
  buttonText: {
    color: Colors.whites[100],
    textAlign: 'center',
  },
});

export default ChecklistScreen;
