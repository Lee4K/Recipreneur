import React, { useState, } from "react";
import { View, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, Keyboard } from "react-native";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import OTPField from 'react-native-otp-field';
import { Modal } from "react-native-paper";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get('window');

const VerificationScreen = () => {

    const navigation = useNavigation();

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                >
                    {verifyText()}
                    {informationText()}
                    {otpInfo()}
                    {resendInfo()}
                    {continueButton()}
                </ScrollView>
                {loadingDialog()}
            </View>
        </View>
    )

    function loadingDialog() {
        return (
            <Modal visible={isLoading}>
                <View style={{ ...styles.dialogWrapStyle, }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor12Regular,
                        marginTop: Sizes.fixPadding * 2.5
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Modal>
        );
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('(tabs)')
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function resendInfo() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                Didn’t you receive code?{` `}
                <Text style={{ ...Fonts.primaryColor14Regular }}>
                    Resend
                </Text>
            </Text>
        )
    }

    function otpInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Regular }}>
                    Enter Code Here
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding * 4.0, marginTop: Sizes.fixPadding, }}>
                    <OTPField
                        length={4}
                        value={otpInput}
                        onChange={(val) => {
                            setotpInput(val);
                            if (val.length == 4) {
                                Keyboard.dismiss();
                                setisLoading(true)
                                setTimeout(() => {
                                    setisLoading(false)
                                    navigation.push('(tabs)')
                                }, 2000);
                            }
                        }}
                        textFieldStyle={{ ...styles.textFieldStyle }}
                        containerStyle={{
                            justifyContent: 'center',
                            marginVertical: Sizes.fixPadding,
                        }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function informationText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                Please check your messages and enter the{`\n`}
                verification code we just sent you{`\n`}
                +91 1236547890
            </Text>
        )
    }

    function verifyText() {
        return (
            <Text style={styles.verifyTextStyle}>
                Verify Your Mobile Number
            </Text>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.whiteColor}
                    size={24}
                    onPress={() => navigation.pop()}
                    style={{ alignSelf: 'flex-start' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: 100,
        borderBottomLeftRadius: Sizes.fixPadding * 2.0,
        borderBottomRightRadius: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        ...Fonts.blackColor18Medium,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding,
        ...commonStyles.shadow,
        width: width / 9.0,
        height: width / 9.0,
        shadowColor: Colors.grayColor
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 7.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 80,
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        alignSelf: 'center'
    },
    verifyTextStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.primaryColor18Regular
    },
});

export default VerificationScreen;