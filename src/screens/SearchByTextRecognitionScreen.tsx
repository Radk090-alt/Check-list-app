import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {createAction} from '@rcd/utility/store';
import {RNCamera, TrackedTextFeature} from 'react-native-camera';
import {Colors} from '@rcd/utility';
import searchByTextRecognitionScreenSelector from '@rcd/store/selectors/searchByTextRecognitionScreenSelector';
import {useIsFocused} from '@react-navigation/native';

interface TextRecognizedResponse {
  textBlocks: TrackedTextFeature[];
}

const SearchByTextRecognitionScreen = () => {
  const {isLoading} = useSelector(searchByTextRecognitionScreenSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const handleTextRecognized = ({textBlocks}: TextRecognizedResponse) => {
    textBlocks.forEach((textBlock) => {
      const isValid =
        textBlock.value.startsWith('RX') || textBlock.value.startsWith('ORX') || textBlock.value.startsWith('TRX');

      if (isValid) {
        const keyword = textBlock.value.replace('O', '0').replace(/\s+/g, '').replace('/', '');

        dispatch(createAction('searchByTextRecognitionScreen/SEARCH', {keyword}));
      }
    });
  };

  if (!isFocused) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onTextRecognized={handleTextRecognized}
        type={RNCamera.Constants.Type.back}
        autoFocus="on"
        flashMode="auto"
        zoom={0}
      />
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={Colors.whites[100]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    position: 'relative',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.alpha(Colors.blues[100], 0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchByTextRecognitionScreen;
