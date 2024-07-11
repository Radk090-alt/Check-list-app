import profileScreenSelector from '@rcd/store/selectors/profileScreenSelector';
import {Colors, Spacing} from '@rcd/utility';
import {createAction} from '@rcd/utility/store';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  Image,
  View,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(createAction('profileScreen/LOGOUT'));
  }, []);

  const {isLoading, user} = useSelector(profileScreenSelector);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../assets/images/avatar.jpg')}
            />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfoText}>
              {user?.first} {user?.last}
            </Text>
            <Text style={styles.profileInfoText}>{user?.email}</Text>
          </View>
          <View style={styles.profileLogoutContainer}>
            <Pressable style={styles.button} onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                color={Colors.whites[100]}
                size={32}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.medium,
  },

  profile: {
    flexDirection: 'row',
    width: '100%',
  },

  profileImageContainer: {
    height: 60,
  },

  profileInfoContainer: {
    flex: 1,
    paddingHorizontal: Spacing.small,
    justifyContent: 'center',
  },

  profileInfoText: {
    color: Colors.whites[100],
  },

  profileImage: {
    flex: 1,
    width: 60,
    height: 'auto',
    resizeMode: 'contain',
    borderRadius: 999,
  },

  profileLogoutContainer: {
    justifyContent: 'center',
  },

  button: {
    // backgroundColor: Colors.grays[100],
    // paddingVertical: Spacing.small,
    // width: '60%',
    // marginVertical: Spacing.xxsmall,
  },
  buttonText: {
    color: Colors.whites[100],
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProfileScreen;
