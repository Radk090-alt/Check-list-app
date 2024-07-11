import {PixelRatio} from 'react-native';

const pixelRatio = PixelRatio.get();

export const Size = (size: number) => {
  switch (true) {
    case pixelRatio < 1.4:
      return size * 0.8;
    case pixelRatio < 2.4:
      return size * 1.55;
    case pixelRatio < 3.4:
      return size * 1.35;
    default:
      return size * 1.5;
  }
};

export const Spacing = {
  xxxlarge: Size(40),
  xxlarge: Size(35),
  xlarge: Size(32),
  large: Size(30),

  medium: Size(20),

  small: Size(14),
  xsmall: Size(12),
  xxsmall: Size(5),
  xxxsmall: Size(1),
};
