import React from 'react';
import {ActivityIndicator, Linking, StyleSheet, Text, View} from 'react-native';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {Button} from '@rcd/components';
import {useSelector} from 'react-redux';
import checkSuccessScreenSelector from '@rcd/store/selectors/checkSuccessScreenSelector';

const CheckSuccessScreen = () => {
  const {pdf, isLoading} = useSelector(checkSuccessScreenSelector);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.whites[100]} />
      ) : (
        <React.Fragment>
          <Text style={styles.title}>Чеклиста е завършен успешно!</Text>

          {pdf && <Button onPress={() => Linking.openURL(pdf)}>Свали PDF</Button>}
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blacks[100],
    paddingHorizontal: Spacing.medium,
  },
  title: {
    color: Colors.whites[100],
    fontSize: FontSize.xxlarge,
    textAlign: 'center',
    marginBottom: Spacing.large,
  },
});

export default CheckSuccessScreen;
