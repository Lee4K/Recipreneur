import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const AddMoneyScreen = () => {

  const navigation = useNavigation();

  const [amount, setamount] = useState('$15.00');
  const [currentIndex, setcurrentIndex] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {amountTextField()}
          {paymentModes()}
          {continueButton()}
        </ScrollView>
      </View>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('success/successScreen')}
        style={styles.continueButtonStyle}
        >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function paymentModes() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
          Select Payment Mode
        </Text>
        {paymentModeShort({
          paymentIcon: require('../../assets/images/paymentMethod/paypal.png'),
          paymentMode: 'Paypal',
          index: 1,
        })}
        {paymentModeShort({
          paymentIcon: require('../../assets/images/paymentMethod/googlepay.png'),
          paymentMode: 'Google Pay',
          index: 2,
        })}
        {paymentModeShort({
          paymentIcon: require('../../assets/images/paymentMethod/creditcard.png'),
          paymentMode: 'Credit Card',
          index: 3,
        })}
        {paymentModeShort({
          paymentIcon: require('../../assets/images/paymentMethod/stripe.png'),
          paymentMode: 'Stripe',
          index: 4,
        })}
      </View>
    );
  }

  function paymentModeShort({ paymentIcon, paymentMode, index }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setcurrentIndex(index)}
        style={styles.paymentModeWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={paymentIcon}
            style={{ width: 24.0, height: 24.0 }}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              ...Fonts.blackColor16Regular,
            }}>
            {paymentMode}
          </Text>
        </View>
        <View style={styles.unselectedRadioButtonStyle}>
          {currentIndex == index ? (
            <View style={styles.selectedRadioButtonStyle} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  function amountTextField() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor16Regular }}>Enter Amount</Text>
        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setamount(text)}
          selectionColor={Colors.primaryColor}
          style={styles.amountTextFieldStyle}
        />
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
          Add Money
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
  amountTextFieldStyle: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1.0,
    ...Fonts.blackColor18Regular,
    marginTop: Sizes.fixPadding - 7.0,
    padding: 0,
    paddingBottom: Sizes.fixPadding - 5.0,
  },
  paymentModeWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 5.0,
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.shadow,
  },
  unselectedRadioButtonStyle: {
    width: 15.0,
    height: 15.0,
    borderRadius: 7.5,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButtonStyle: {
    backgroundColor: Colors.primaryColor,
    width: 7.0,
    height: 7.0,
    borderRadius: 3.5,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    elevation: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 7.0,
    marginVertical: Sizes.fixPadding,
  },
});

export default AddMoneyScreen;
