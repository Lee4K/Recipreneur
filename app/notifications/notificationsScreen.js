import React, { useState, useRef } from 'react';
import {
  Fonts,
  Colors,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import { Text, View, StyleSheet, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const notificationList = [
  {
    key: '1',
    notification:
      'Rate the book you last read “Harry Potter and The Philosopher’s Stone”',
    receiveTime: '2 days ago',
  },
  {
    key: '2',
    notification: 'Do you like this app? If yes than rate us on Playstore now.',
    receiveTime: '3 days ago',
  },
  {
    key: '3',
    notification:
      'You have not listen a new book from last 5days.Get new launched collection.',
    receiveTime: '3 days ago',
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = () => {

  const navigation = useNavigation();

  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState('');

  const [listData, setListData] = useState(notificationList);

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if (
      (value < -screenWidth || value > screenWidth) &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find(item => item.key === key);

        setSnackBarMsg(`${removedItem.notification} dismissed!`);

        setListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = data => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 65],
          }),
        },
      ]}>
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: Sizes.fixPadding - 5.0,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={styles.notificationIconWrapStyle}>
              <MaterialIcons
                name="notifications"
                size={22}
                color={Colors.whiteColor}
              />
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text
                numberOfLines={2}
                style={{
                  width: screenWidth - 100,
                  ...Fonts.blackColor14Regular,
                }}>
                {data.item.notification}
              </Text>
              <Text style={{ ...Fonts.grayColor12Regular }}>
                {data.item.receiveTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack}></View>;

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
          }}
        >
          Notifications
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
        {header()}
        {listData.length == 0 ? nothingInfo() : listInfo()}
        {snackBarInfo()}
      </View>
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>{snackBarMsg}</Text>
      </Snackbar>
    );
  }

  function listInfo() {
    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  function nothingInfo() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons name="notifications" size={35} color="#949494" />
        <Text
          style={{
            ...Fonts.grayColor18Regular,
            marginTop: Sizes.fixPadding,
          }}>
          No New Notifications
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
  notificationIconWrapStyle: {
    height: 50.0,
    width: 50.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: 25.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightWhiteColor,
    borderWidth: 3.0,
    elevation: 3.0,
    ...commonStyles.shadow,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
  },
});

export default NotificationsScreen;
