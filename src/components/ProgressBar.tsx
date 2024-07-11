import {Colors} from '@rcd/utility';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

interface Props {
  total: number;
  current: number;
}

export const ProgressBar = ({total, current}: Props) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const width = (current / total) * 100;

    progress.setValue(width);
  }, []);

  useEffect(() => {
    const width = (current / total) * 100;

    Animated.timing(progress, {
      toValue: width,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [current, total]);

  return (
    <View style={styles.progressBar}>
      <Animated.View
        style={[
          styles.completeBar,
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 5,
  },

  completeBar: {
    height: 5,
    backgroundColor: Colors.blues[100],
  },
});
