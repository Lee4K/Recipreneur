import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const EditProfileScreen = () => {

  const navigation = useNavigation();

  const [name, setname] = useState('Samantha Shah');
  const [email, setemail] = useState('shahsamantha@gmail.com');
  const [mobileNumber, setmobileNumber] = useState('+91 1236547890');
  const [password, setpassword] = useState('•••••••••');
  const [showBottomSheet, setshowBottomSheet] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          {profilePic()}
          {nameInfo()}
          {emailInfo()}
          {mobileNumberInfo()}
          {passwordInfo()}
          {saveButton()}
        </ScrollView>
        {changeProfileOptions()}
      </View>
    </View>
  );

  function changeProfileOptions() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={() => { setshowBottomSheet(false) }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { setshowBottomSheet(false) }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
            >
              <View style={styles.bottomSheetContentStyle}>
                <Text
                  style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    ...Fonts.blackColor16Medium,
                    textAlign: 'center',
                  }}>
                  Choose Option
                </Text>
                <Text
                  onPress={() => setshowBottomSheet(false)}
                  style={{
                    marginBottom: Sizes.fixPadding,
                    ...Fonts.blackColor14Regular,
                    marginLeft: Sizes.fixPadding,
                  }}>
                  Take a picture
                </Text>
                <Text
                  onPress={() => setshowBottomSheet(false)}
                  style={{
                    ...Fonts.blackColor14Regular,
                    marginLeft: Sizes.fixPadding,
                  }}>
                  Select from gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.saveButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
          value={password}
          onChangeText={text => setpassword(text)}
          style={styles.textFieldWrapStyle}
          clearTextOnFocus={false}
        />
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>Mobile Number</Text>
        <TextInput
          keyboardType="numeric"
          selectionColor={Colors.primaryColor}
          value={mobileNumber}
          onChangeText={text => setmobileNumber(text)}
          style={styles.textFieldWrapStyle}
        />
      </View>
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>Email</Text>
        <TextInput
          selectionColor={Colors.primaryColor}
          value={email}
          onChangeText={text => setemail(text)}
          style={styles.textFieldWrapStyle}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function nameInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>Name</Text>
        <TextInput
          selectionColor={Colors.primaryColor}
          value={name}
          onChangeText={text => setname(text)}
          style={styles.textFieldWrapStyle}
        />
      </View>
    );
  }

  function profilePic() {
    return (
      <View
        style={{ marginVertical: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/users/user1.png')}
          style={{ width: 100.0, height: 100.0, borderRadius: 50.0 }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setshowBottomSheet(true)}
          style={styles.changeProfileButtonStyle}>
          <MaterialIcons
            name="photo-camera"
            color={Colors.whiteColor}
            size={12}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding - 5.0,
              ...Fonts.whiteColor12Medium,
            }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Medium,
          }}>
          Edit Profile
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightWhiteColor,
    borderBottomLeftRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.headerShadow,
  },
  changeProfileButtonStyle: {
    position: 'absolute',
    bottom: 0.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding - 9.0,
    elevation: 4.0,
  },
  textFieldWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    borderColor: '#e0e0e0',
    borderWidth: 0.50,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...Fonts.blackColor16Regular,
    ...commonStyles.shadow,
    elevation: 5.0,
  },
  saveButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 7.0,
    marginVertical: Sizes.fixPadding * 2.0,
    elevation: 1.0,
  },
  bottomSheetContentStyle: {
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom:
      Platform.OS == 'ios' ? Sizes.fixPadding * 2.0 : Sizes.fixPadding + 5.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
  },
});

export default EditProfileScreen;