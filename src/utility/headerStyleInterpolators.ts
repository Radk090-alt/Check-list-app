import {Animated} from 'react-native';
const {add} = Animated;
import {StackHeaderInterpolationProps} from '@react-navigation/stack';

export function forFade({current, next}: StackHeaderInterpolationProps) {
  const progress = add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );
  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });
  return {
    rightButtonStyle: {
      opacity,
    },
    titleStyle: {
      opacity,
    },
    backgroundStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1, 1.9, 2],
        outputRange: [0, 1, 1, 0],
      }),
    },
  };
}
