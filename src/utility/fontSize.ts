import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('screen');
const pixelRatio = PixelRatio.get();

export const FontScale = (size: number) => {
  if (pixelRatio < 1.4) {
    return Math.sqrt(height * height + width * width) * (size / 175);
  }

  return Math.sqrt(height * height + width * width) * (size / 100);
};

export const FontSize = {
  xxxlarge: FontScale(3.3),
  xxlarge: FontScale(2.7),
  xlarge: FontScale(2.5),
  large: FontScale(2.3),

  medium: FontScale(2),

  small: FontScale(1.8),
  xsmall: FontScale(1.7),
  xxsmall: FontScale(1.5),
  xxxsmall: FontScale(1.3),
  xxxxsmall: FontScale(1),

};
