import React from 'react';
import {ActivityIndicator, Animated, StyleSheet} from 'react-native';

// Utility
import {Colors} from '@rcd/utility';

const LoadingScreen = () => {
  return (
    <Animated.View pointerEvents="none" style={[styles.overlay]}>
      <ActivityIndicator size="large" color={Colors.whites[100]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    backgroundColor: Colors.grays[200],
  },
});

export default LoadingScreen;
