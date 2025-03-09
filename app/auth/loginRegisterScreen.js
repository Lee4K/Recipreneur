import React, { useState, useCallback } from "react";
import { BackHandler, View, Dimensions, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TabView, TabBar } from 'react-native-tab-view';
import LoginScreen from "./loginScreen";
import RegisterScreen from "./registerScreen";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const LoginRegisterScreen = () => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setbackClickCount(1);
        setTimeout(() => {
            setbackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setbackClickCount] = useState(0);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'LOGIN' },
        { key: 'second', title: 'REGISTER' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <LoginScreen changeIndex={changeIndex} />;
            case 'second':
                return <RegisterScreen changeIndex={changeIndex} />;
        }
    };

    function changeIndex({ index }) {
        setIndex(index);
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(index) => changeIndex({ index })}
                    commonOptions={{
                        label: ({ route, focused }) => (
                            <View style={{
                                position: 'absolute',
                                bottom: -40.0,
                                alignSelf: 'center',
                            }}>
                                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                                    {route.title}
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: focused ? Colors.whiteColor : 'transparent',
                                        height: 2.0,
                                    }}
                                />
                            </View>
                        )
                    }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: 'transparent' }}
                            tabStyle={{
                                width: width / 2,
                                height: 100.0,
                            }}
                            style={{
                                backgroundColor: Colors.primaryColor,
                                borderBottomLeftRadius: Sizes.fixPadding * 2.0,
                                borderBottomRightRadius: Sizes.fixPadding * 2.0,
                                elevation: 3.0,
                            }}
                        />
                    )}
                />
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={styles.animatedView}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default LoginRegisterScreen;