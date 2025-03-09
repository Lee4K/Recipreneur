import { Tabs } from 'expo-router';
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, BackHandler, Platform, Dimensions, Pressable } from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, commonStyles, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from "../../components/myStatusBar";

const screenWidth = Dimensions.get('window').width;

export default function TabLayout() {

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
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000)
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { ...styles.bottomTabBarStyle },
          tabBarShowLabel: false,
          tabBarButton: (props) => (
            <Pressable
                {...props}
                android_ripple={{
                    color: Colors.whiteColor,
                }}
            />
        ),
        }}
      >
        <Tabs.Screen
          name="discover/discoverScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                index: 1,
                focused: focused,
                title: 'Discover',
              })
            ),
          }}
        />
        <Tabs.Screen
          name="search/searchScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                index: 2,
                focused: focused,
                title: 'Search',
              })
            ),
          }}
        />
        <Tabs.Screen
          name="profile/profileScreen"
          options={{
            tabBarIcon: ({ focused }) => (
              bottomTabBarItem({
                index: 3,
                focused: focused,
                title: 'Profile',
              })
            ),
          }}
        />
      </Tabs>
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
  );

  function bottomTabBarItem({ index, focused, title }) {
    return (
      <View style={{ alignItems: 'center', width: screenWidth / 3.3 }}>
        {
          index == 1
            ?
            <MaterialCommunityIcons
              name="compass"
              size={22}
              color={focused ? Colors.primaryColor : Colors.grayColor}
            />
            :
            index == 2
              ?
              <MaterialIcons
                name="search"
                size={22}
                color={focused ? Colors.primaryColor : Colors.grayColor}
              />
              :
              <Ionicons
                name="person-circle"
                size={22}
                color={focused ? Colors.primaryColor : Colors.grayColor}
              />
        }
        <Text style={focused ? { ...Fonts.primaryColor14Medium } : { ...Fonts.grayColor14Medium }}>
          {title}
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    borderTopColor: Colors.grayColor,
    borderTopWidth: Platform.OS == 'ios' ? 0 : 0.8,
    elevation: 15.0,
    ...commonStyles.shadow,
    paddingTop: Sizes.fixPadding+2.0
  },
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
});