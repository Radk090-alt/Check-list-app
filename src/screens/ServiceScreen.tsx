import {Button} from '@rcd/components';
import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import codePush, {LocalPackage} from 'react-native-code-push';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [updateMetadata, setUpdateMetadata] = useState<LocalPackage | null>(null);

  useLayoutEffect(() => {
    codePush.getUpdateMetadata().then((value) => setUpdateMetadata(value));
  }, []);
  const handleOpenChecklist = useCallback(() => {
    dispatch(
      createAction('navigation/PUSH', {
        name: 'app/Service',
        params: {
          screen: 'service/Main',
          params: {
            screen: 'service/Checklist',
          },
        },
      }),
    );
  }, []);

  const handleNavigateToForm = useCallback(
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

  const handleOpenWebView = useCallback(
    (url, title) => () => {
      dispatch(
        createAction('navigation/PUSH', {
          name: 'app/Service',
          params: {
            screen: 'service/Main',
            params: {
              screen: 'service/Webview',
              params: {
                url,
                title,
              },
            },
          },
        }),
      );
    },
    [],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.container}>
          <View style={{width: '50%', paddingRight: 10, alignItems: 'flex-start'}}>
            <Button onPress={() => Alert.alert('В процес на разработка...')} style={[styles.button]}>
              CALLBACK
            </Button>
            <Button onPress={() => Alert.alert('В процес на разработка...')} style={[styles.button, styles.topGap]}>
              RESTART
            </Button>
            <Button onPress={() => Alert.alert('В процес на разработка...')} style={[styles.button, styles.topGap]}>
              COLD CALL
            </Button>
            <Button onPress={handleNavigateToForm('meeting')} style={[styles.button, styles.topGap]}>
              СРЕЩА
            </Button>
            <Button
              onPress={handleOpenWebView('/admin/mobile/object?app=1', 'Обект')}
              style={[styles.button, styles.topGap]}>
              ОБЕКТ
            </Button>
          </View>
          <View style={{width: '50%', paddingLeft: 10, alignItems: 'flex-start'}}>
            <Button onPress={handleOpenWebView('/admin/service/requests', 'Заявка')} style={styles.buttonRed}>
              ЗАЯВКА
            </Button>
            <Button
              onPress={handleOpenWebView('/admin/service/ppp?app=1', 'ППП')}
              style={[styles.buttonRed, styles.topGap]}>
              ППП
            </Button>
            <Button onPress={handleOpenChecklist} style={[styles.topGap, styles.buttonRed]}>
              ЧЕКЛИСТ
            </Button>
            <Button
              onPress={handleOpenWebView('/admin/mobile/accidents?app=1', 'Посещение')}
              style={[styles.topGap, styles.buttonRed]}>
              ПОСЕЩЕНИЕ
            </Button>
            <Button
              onPress={handleOpenWebView('/admin/mobile/repairs?app=1', 'Ремонт')}
              style={[styles.topGap, styles.buttonRed]}>
              РЕМОНТ
            </Button>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', right: 0, left: 0, bottom: 10}} pointerEvents="none">
        <Text style={{textAlign: 'center', color: Colors.grays[600]}}>
          {updateMetadata?.appVersion} {updateMetadata?.label}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },

  logoContainer: {
    height: 80,
    marginBottom: Spacing.large * 2,
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  button: {
    paddingVertical: Spacing.xsmall,
  },
  buttonRed: {
    paddingVertical: Spacing.xsmall,

    backgroundColor: Colors.reds[100],
  },
  topGap: {
    marginTop: Spacing.xsmall,
  },
  buttonText: {
    color: Colors.whites[100],
    textAlign: 'center',
  },
});

export default HomeScreen;
