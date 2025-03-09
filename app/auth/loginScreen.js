import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";

const LoginScreen = ({ changeIndex }) => {

    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [secureText, setSecureText] = useState(true);
    const [rememberPassword, setRememberPassword] = useState(false);

    return (
        <View style={{ flex: 1, }}>
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
            >
                {welcomeText()}
                {emailTextField()}
                {passwordTextField()}
                {rememberPassordAndForgetInfo()}
                {loginButton()}
                {orLoginWithDivider()}
                {googleAndFacebookButton()}
                {dontAccountInfo()}
            </ScrollView>
        </View>
    )

    function welcomeText() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.primaryColor18Regular }}>
                Welcome Back !
            </Text>
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                Don’t have an account?{` `}
                <Text
                    onPress={() => changeIndex({ index: 1 })}
                    style={{ ...Fonts.primaryColor14Regular }}>
                    Register Now
                </Text>
            </Text>
        )
    }

    function googleAndFacebookButton() {
        return (
            <View style={styles.googleAndFacebookButtonWrapStyle}>
                <View style={{
                    ...styles.googleAndFacebookButtonStyle,
                    paddingHorizontal: Sizes.fixPadding * 2.4,
                }}>
                    <Image
                        source={require('../../assets/images/icons/google.png')}
                        style={{ width: 20.0, height: 20.0, }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor16Regular }}>
                        Google
                    </Text>
                </View>
                <View style={{
                    ...styles.googleAndFacebookButtonStyle,
                    paddingHorizontal: Sizes.fixPadding + 3.0,
                }}>
                    <Image
                        source={require('../../assets/images/icons/facebook.png')}
                        style={{ width: 20.0, height: 20.0, }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor16Regular }}>
                        Facebook
                    </Text>
                </View>
            </View>
        )
    }

    function orLoginWithDivider() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 4.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{
                    backgroundColor: Colors.grayColor,
                    height: 0.50,
                    flex: 1,
                }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.grayColor16Regular }}>
                    or Login with
                </Text>
                <View style={{
                    backgroundColor: Colors.grayColor,
                    height: 0.50,
                    flex: 1,
                }} />
            </View>
        )
    }

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('auth/verificationScreen')}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    function rememberPassordAndForgetInfo() {
        return (
            <View style={styles.rememberPassordAndForgetInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setRememberPassword(!rememberPassword)}
                        style={{
                            ...styles.checkBoxStyle,
                            backgroundColor: rememberPassword ? Colors.primaryColor : 'transparent'
                        }}
                    >
                        {
                            rememberPassword ?
                                <MaterialIcons
                                    name="done"
                                    color={Colors.whiteColor}
                                    size={10}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Sizes.fixPadding - 3.0, ...Fonts.primaryColor12Regular }}>
                        Remember Password
                    </Text>
                </View>
                <Text style={{ ...Fonts.redColor12Regular }}>
                    Forget Password?
                </Text>
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.primaryColor}
                        size={18}
                    />
                    <TextInput
                        secureTextEntry={secureText}
                        placeholder="Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        textContentType="oneTimeCode"
                    />
                </View>
                <MaterialIcons
                    name={secureText ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={18}
                    onPress={() => setSecureText(!secureText)}
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons
                    name="email"
                    color={Colors.primaryColor}
                    size={18}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.50,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 50.0,
        ...commonStyles.shadow,
    },
    checkBoxStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 12.0,
        height: 12.0,
        borderRadius: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rememberPassordAndForgetInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 7.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    googleAndFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.50,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding,
        ...commonStyles.shadow
    },
    googleAndFacebookButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding + 5.0,
    }
})

export default LoginScreen;