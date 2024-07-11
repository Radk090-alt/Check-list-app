import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontSize, Spacing} from '@rcd/utility';

const FormSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Формата е изпратена успешно!</Text>
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

export default FormSuccessScreen;
