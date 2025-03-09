import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {

  const navigation = useNavigation();

  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {userInfo()}
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('library/libraryScreen')}>
            {profileOptions({ option: 'My Library' })}
          </TouchableOpacity>
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('wallet/walletScreen')}>
            {profileOptions({ option: 'Wallet' })}
          </TouchableOpacity>
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('bookmarked/bookmarkedScreen')}>
            {profileOptions({ option: 'Bookmarked' })}
          </TouchableOpacity>
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('notifications/notificationsScreen')}>
            {profileOptions({ option: 'Notifications' })}
          </TouchableOpacity>
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('support/supportScreen')}>
            {profileOptions({ option: 'Support' })}
          </TouchableOpacity>
          {divider()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push('privacyPolicy/privacyPolicyScreen')}>
            {profileOptions({ option: 'Privacy Policy' })}
          </TouchableOpacity>
          {divider()}
          {logoutInfo()}
          {divider()}
        </ScrollView>
      </View>
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => { setshowLogoutDialog(false) }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { setshowLogoutDialog(false) }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ alignSelf: 'center', backgroundColor: Colors.whiteColor, borderRadius: Sizes.fixPadding - 5.0 }}
            >
              <View
                style={{ ...styles.dialogContainerStyle }}
              >
                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'center' }}>
                  Sure you want to Logout?
                </Text>
                <View
                  style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setshowLogoutDialog(false)}
                    style={{ ...styles.cancelButtonStyle, ...commonStyles.shadow }}>
                    <Text style={{ ...Fonts.primaryColor18SemiBold }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setshowLogoutDialog(false);
                      navigation.push('auth/loginRegisterScreen');
                    }}
                    style={styles.logoutButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor18SemiBold }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function logoutInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setshowLogoutDialog(true)}
        style={styles.logoutInfoWrapStyle}>
        <Text style={{ ...Fonts.primaryColor16Regular }}>Logout</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={22}
          color={Colors.blackColor}
        />
      </TouchableOpacity>
    );
  }

  function profileOptions({ option }) {
    return (
      <View style={styles.profileOptionsWrapStyle}>
        <Text style={{ ...Fonts.blackColor16Regular }}>{option}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={22}
          color={Colors.blackColor}
        />
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: '#e0e0e0',
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
      />
    );
  }

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/users/user1.png')}
            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
          />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor16Medium }}>Samantha Shah</Text>
            <Text
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                ...Fonts.grayColor14Regular,
              }}>
              +91 1234569870
            </Text>
          </View>
        </View>
        <MaterialIcons
          name="edit"
          color={Colors.primaryColor}
          size={22}
          onPress={() => navigation.push('editProfile/editProfileScreen')}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor18Medium }}>Profile</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.lightWhiteColor,
    borderBottomLeftRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.headerShadow,
  },
  profileOptionsWrapStyle: {
    marginVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutInfoWrapStyle: {
    marginVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogContainerStyle: {
    width: screenWidth - 80,
    alignSelf: 'center',
    padding: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 4.0,
    marginRight: Sizes.fixPadding,
    elevation: 2.0,
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
  },
  logoutButtonStyle: {
    marginLeft: Sizes.fixPadding,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 4.0,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.primaryColor,
  },
  userInfoWrapStyle: {
    marginTop: Sizes.fixPadding + 10.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;