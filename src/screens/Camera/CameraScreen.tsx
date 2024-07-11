import {RNCamera} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, Platform, Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import {createAction} from '@rcd/utility/store';
import {Colors, Spacing} from '@rcd/utility';
import photosFlowSelector from '@rcd/store/selectors/photosFlowSelector';

export const CameraScreen = () => {
  const cameraRef = useRef<RNCamera>(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {photo} = useSelector(photosFlowSelector);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(createAction('photosFlow/OPENED', route.params! as {}));
    }, [route.params]),
  );

  const takePicture = useCallback(async () => {
    setLoading(true);
    const {uri} = await cameraRef.current!.takePictureAsync({
      quality: 0.5,
      base64: false,
      exif: false,
    });

    dispatch(createAction('photosFlow/PHOTO_TAKEN', {photo: {...photo, photo: uri}}));
    setLoading(false);
  }, [cameraRef, photo]);

  const [flashMode, setFlashMode] = useState('auto');

  const flashIcons = {
    ['auto']: 'flash-auto',
    ['on']: 'flash',
    ['torch']: 'flash-alert',
    ['off']: 'flash-off',
  };

  const cycleFlashMode = useCallback(() => {
    Vibration.vibrate(10);
    const flashModes = Object.keys(flashIcons);
    const nextFlashModeIndex = flashModes.indexOf(flashMode) + 1;

    if (nextFlashModeIndex === flashModes.length) {
      return setFlashMode(flashModes[0]);
    }

    setFlashMode(flashModes[nextFlashModeIndex]);
  }, [flashMode]);

  const goBack = useCallback(() => {
    Vibration.vibrate(10);
    dispatch(createAction('navigation/BACK'));
  }, [dispatch]);

  const openCameraRoll = useCallback(() => {
    Vibration.vibrate(10);
    dispatch(createAction('navigation/NAVIGATE', {name: 'camera/CameraRoll'}));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isFocused && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          autoFocus="on"
          flashMode={flashMode}
        />
      )}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.back}>
          <MaterialCommunityIcons name="close" color="white" size={32} style={styles.shadow} />
        </Pressable>
        {!!photo?.info_text && (
          <View style={styles.headerInfo}>
            <View style={styles.headerInfoBox}>
              <Text style={styles.headerInfoText}>{photo.info_text}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.controls}>
        <Pressable onPress={openCameraRoll} style={styles.gallery}>
          <MaterialCommunityIcons name="image-multiple" color={Colors.whites[100]} style={styles.shadow} size={24} />
        </Pressable>
        <Pressable onPress={takePicture} style={styles.capture}>
          {loading ? (
            <ActivityIndicator size={48} color={Colors.blacks[100]} />
          ) : (
            <MaterialCommunityIcons name="camera" size={48} color={Colors.blacks[100]} />
          )}
        </Pressable>
        <Pressable onPress={cycleFlashMode} style={styles.flash}>
          <MaterialCommunityIcons
            name={flashIcons[flashMode]}
            color={Colors.whites[100]}
            style={styles.shadow}
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? Spacing.small : 0,
  },

  back: {
    padding: Spacing.xsmall,
    shadowColor: Colors.blacks[100],
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  headerInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: Spacing.xsmall,
  },

  headerInfoBox: {
    backgroundColor: Colors.whites[100],
    borderRadius: 5,
    padding: Spacing.xxsmall,
    shadowColor: Colors.blacks[100],
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  headerInfoText: {
    color: Colors.blacks[100],
  },

  shadow: {
    shadowColor: Colors.blacks[100],
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 45 : 0,
    zIndex: 50,
    elevation: 5,
  },

  capture: {
    backgroundColor: Colors.whites[100],
    borderRadius: Spacing.small * 4,
    padding: Spacing.small,
    margin: Spacing.small,
  },

  flash: {
    padding: Spacing.medium,
  },

  gallery: {
    padding: Spacing.medium,
  },
});
