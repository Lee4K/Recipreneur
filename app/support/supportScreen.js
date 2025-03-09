import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const SupportScreen = () => {

  const navigation = useNavigation();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [description, setdescription] = useState();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {nameTextField()}
          {emailTextField()}
          {descriptionTextField()}
          {submitButton()}
        </ScrollView>
      </View>
    </View>
  );

  function submitButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.submitButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Submit</Text>
      </TouchableOpacity>
    );
  }

  function descriptionTextField() {
    return (
      <TextInput
        placeholder="Write Here"
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
        value={description}
        multiline
        numberOfLines={4}
        onChangeText={text => setdescription(text)}
        style={{
          ...styles.textFieldWrapStyle,
          paddingTop: Sizes.fixPadding,
          height: 120.0,
        }}
        textAlignVertical="top"
      />
    );
  }

  function emailTextField() {
    return (
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
        value={email}
        onChangeText={text => setemail(text)}
        style={{ height: 50.0, ...styles.textFieldWrapStyle }}
        keyboardType='email-address'
      />
    );
  }

  function nameTextField() {
    return (
      <TextInput
        placeholder="Name"
        placeholderTextColor={Colors.grayColor}
        selectionColor={Colors.primaryColor}
        value={name}
        onChangeText={text => setname(text)}
        style={{
          height: 50.0,
          marginTop: Sizes.fixPadding * 2.0,
          ...styles.textFieldWrapStyle,
        }}
      />
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
          Support
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
  textFieldWrapStyle: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...Fonts.blackColor14Regular,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    elevation: 2.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.shadow,
  },
  submitButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    elevation: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 7.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default SupportScreen;
