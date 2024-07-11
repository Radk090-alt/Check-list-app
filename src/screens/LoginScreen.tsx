import loginScreenSelector from '@rcd/store/selectors/loginScreenSelector';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Pressable, Text, TextInput, View, ActivityIndicator, Image, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SelectInput} from '@rcd/components/Inputs/SelectInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const crms = [
  {label: 'Rentex', value: 'http://crmrx.rentex.bg'},
  {label: 'Rentex Test', value: 'http://crmtest.rentex.bg'},
  {label: 'Astralis', value: 'http://crm.astralis.bg'},
  {label: 'Cimex', value: 'http://cmxlogin.cimex.bg'},
  {label: 'CMX', value: 'http://crmcmx.cmx.bg'},
  {label: 'Mashini', value: 'http://crmms.mashini.bg'},
];

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {isLoading, crm} = useSelector(loginScreenSelector);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCRM, setSelectedCRM] = useState(crm);


  const handleSubmit = useCallback(() => {
    dispatch(createAction('loginScreen/SUBMIT', {username, password, crm: selectedCRM}));
  }, [username, password, selectedCRM]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          </View>

          <TextInput
            keyboardType="email-address"
            style={styles.textInput}
            placeholder="Потребител"
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor={Colors.grays[800]}
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Парола"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={Colors.grays[800]}
            value={password}
          />

          <SelectInput variant="crm" value={selectedCRM} options={crms} onChange={setSelectedCRM} />

          <Pressable style={styles.button} onPress={handleSubmit}>
            {isLoading && <ActivityIndicator size="small" color={Colors.whites[100]} />}
            {!isLoading && <Text style={styles.buttonText}>Вход</Text>}
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: Spacing.medium,
    backgroundColor: Colors.blacks[100],
  },

  logoContainer: {
    height: 80,
    marginBottom: Spacing.large,
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  textInput: {
    width: '100%',
    backgroundColor: Colors.grays[500],
    paddingVertical: Spacing.xsmall,
    paddingHorizontal: Spacing.xsmall,
    marginVertical: Spacing.small / 2,
    color: Colors.whites[100],
    textAlign: 'left',
    fontSize: FontSize.small,
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.blues[100],
    borderRadius: 5,
    paddingVertical: Spacing.small,
    width: '60%',
    marginVertical: Spacing.xsmall,
  },
  buttonText: {
    color: Colors.whites[100],
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen;
