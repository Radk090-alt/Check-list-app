import {Spacing} from '@rcd/utility';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const VoiceMemoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Voice Memo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.large,
  },
});

export default VoiceMemoScreen;
