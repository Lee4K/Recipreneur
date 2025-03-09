import React, { useCallback } from 'react';
import {
  BackHandler,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const SuccessScreen = () => {

  const navigation = useNavigation();

  const backAction = () => {
    navigation.push('(tabs)');
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [backAction]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {successInfo()}
        {backToHomeButton()}
      </View>
    </View>
  );

  function backToHomeButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('(tabs)')}
        style={styles.backToHomeButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Back to Home</Text>
      </TouchableOpacity>
    );
  }

  function successInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/icons/check_circle.png')}
          style={{ width: 100.0, height: 100.0 }}
          resizeMode="contain"
        />
        <Text
          style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor22Regular }}>
          Success!
        </Text>
        <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
          Money succesfully added to your wallet.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding,
            ...Fonts.blackColor16Regular,
          }}>
          Your Updated Wallet Balance is:{` `}
          <Text style={{ ...Fonts.primaryColor16Medium }}>$30.50</Text>
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
    elevation: 1.0,
  },
  backToHomeButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    elevation: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 7.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});

export default SuccessScreen;
