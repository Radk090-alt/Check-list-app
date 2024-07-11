import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Photo} from '@rcd/entities';

const EditPhotoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const photo = route.params?.photo as Photo;

  const goBack = useCallback(() => {
    dispatch(createAction('navigation/BACK'));
  }, []);

  const deletePhoto = useCallback(() => {
    dispatch(createAction('photosFlow/DELETE_PHOTO', route.params! as {}));
  }, [route]);

  return (
    <View style={styles.container}>
      <Image style={styles.preview} source={{uri: photo.photo}} />

      <SafeAreaView style={styles.header}>
        <Pressable onPress={goBack} style={styles.back}>
          <MaterialCommunityIcons name="chevron-left" color="white" size={32} style={styles.shadow} />
        </Pressable>
        {!!photo.info_text && (
          <View style={styles.headerInfo}>
            <View style={styles.headerInfoBox}>
              <Text style={styles.headerInfoText}>{photo.info_text}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
      <SafeAreaView style={styles.controls}>
        <Pressable onPress={deletePhoto} style={styles.submit}>
          <MaterialCommunityIcons name="delete" color={Colors.blacks[100]} size={24} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  preview: {
    flex: 1,
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

export default EditPhotoScreen;
