import React, {useCallback, useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Spacing} from '@rcd/utility';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {createAction} from '@rcd/utility/store';
import photosFlowSelector from '@rcd/store/selectors/photosFlowSelector';
import {Photo} from '@rcd/entities';
import {append, findIndex, lastIndexOf, pluck, propEq, remove} from 'ramda';

const checkPermissions = async () => {
  if (Platform.OS !== 'android') {
    return Promise.resolve(true);
  }

  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return Promise.resolve(true);
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted' ? Promise.resolve(true) : Promise.reject(false);
};

export const CameraRollScreen = () => {
  const [cameraRollPhotos, setCameraRollPhotos] = useState<PhotoIdentifier[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const {photos} = useSelector(photosFlowSelector);
  const dispatch = useDispatch();

  const goBack = useCallback(() => {
    dispatch(createAction('navigation/BACK'));
  }, []);

  useEffect(() => {
    setLoading(true);

    checkPermissions()
      .then(() => {
        CameraRoll.getPhotos({
          assetType: 'Photos',
          first: 100,
        }).then(({edges}) => {
          setCameraRollPhotos(edges);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
      })
      .catch(() => {
        Alert.alert('Permissions issue.');
      });
  }, []);

  const selectedPhotoUris = pluck('photo', selectedPhotos);
  const canApprove = selectedPhotos.length === photos.length;
  const currentPhoto = photos[selectedPhotos.length] || undefined;

  const selectPhoto = useCallback(
    (p: PhotoIdentifier) => {
      const selectedIndex = findIndex(propEq('photo', p.node.image.uri), selectedPhotos);

      if (selectedIndex > -1) {
        setSelectedPhotos(remove(selectedIndex, 1, selectedPhotos));

        return;
      }

      const lastPhoto = photos[selectedPhotos.length - 1];

      if (selectedPhotos.length === photos.length && lastPhoto) {
        const removeIndex = lastIndexOf(lastPhoto, selectedPhotos);

        const newPhotos = append({...lastPhoto, photo: p.node.image.uri}, remove(removeIndex, 1, selectedPhotos));

        return setSelectedPhotos(newPhotos);
      }

      const photo = photos[selectedPhotos.length];

      if (!photo) {
        return;
      }

      setSelectedPhotos(append({...photo, photo: p.node.image.uri}, selectedPhotos));
    },
    [photos, selectedPhotos, selectedPhotoUris],
  );

  const approvePhotos = useCallback(() => {
    dispatch(createAction('photosFlow/APPROVE_PHOTOS', {photos: selectedPhotos}));
  }, [selectedPhotos]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.headerBox} onPress={goBack}>
          <Text style={styles.backText}>Назад</Text>
        </Pressable>
        <View style={styles.headerBox}>
          <Text style={styles.titleText}>Последни</Text>
        </View>
        <View style={styles.headerBox} />
      </View>
      {currentPhoto && !!currentPhoto.info_text && (
        <View style={styles.headerInfo}>
          <View style={styles.headerInfoBox}>
            <Text style={styles.headerInfoText}>{currentPhoto.info_text}</Text>
          </View>
        </View>
      )}
      <ScrollView>
        <View style={styles.content}>
          {cameraRollPhotos.map((p) => (
            <Pressable key={p.node.timestamp} style={styles.image} onPress={() => selectPhoto(p)}>
              <Image style={styles.imageNode} source={{uri: p.node.image.uri}} />
              {selectedPhotoUris.indexOf(p.node.image.uri) > -1 && (
                <View style={styles.selectedImage}>
                  <MaterialCommunityIcons name="check-circle-outline" size={24} color={Colors.blues[100]} />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.whites[100]} />
        </View>
      )}

      {canApprove && (
        <SafeAreaView style={styles.controls}>
          <Pressable onPress={approvePhotos} style={styles.submit}>
            <Text style={styles.submitText}>Изпрати</Text>
            <MaterialCommunityIcons name="send" color={Colors.blacks[100]} size={24} />
          </Pressable>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blacks[100],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    padding: Spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerBox: {
    flex: 1,
  },

  headerInfo: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.xxsmall,
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

  backText: {
    color: Colors.whites[100],
  },

  titleText: {
    color: Colors.whites[100],
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    width: '25%',
    height: 100,
  },

  imageNode: {
    flex: 1,
  },

  selectedImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.whites[100],
    borderRadius: 999,
  },

  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 45 : 0,
  },

  submit: {
    backgroundColor: Colors.whites[100],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xsmall / 1.5,
    paddingHorizontal: Spacing.xsmall,
    margin: Spacing.small,
    borderRadius: 25,
    shadowColor: Colors.blacks[100],
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  submitText: {
    color: Colors.blacks[100],
    marginRight: Spacing.xxsmall,
  },
});
