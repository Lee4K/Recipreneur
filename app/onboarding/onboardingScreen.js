import React, { createRef, useState, useCallback } from 'react';
import {
  View,
  BackHandler,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import Swiper from 'react-native-swiper';
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const OnboardingScreen = () => {

  const navigation = useNavigation();

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

  function _spring() {
    setbackClickCount(1);
    setTimeout(() => {
      setbackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setbackClickCount] = useState(0);
  const [currentIndex, setcurrentIndex] = useState(0);

  const swiperRef = createRef();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Swiper
          ref={swiperRef}
          onIndexChanged={index => {
            setcurrentIndex(index);
          }}
          showsButtons={false}
          loop={false}
          showsPagination
          paginationStyle={{ position: 'absolute', bottom: -15.0 }}
          dot={<View style={styles.dotStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}>
          {page1()}
          {page2()}
          {page3()}
        </Swiper>
        <View style={styles.skipNextAndLoginTextWrapStyle}>
          <Text
            onPress={() => {
              currentIndex != 2
                ?
                navigation.push('auth/loginRegisterScreen')
                :
                null
            }}
            style={{ ...Fonts.grayColor14Medium, color: currentIndex != 2 ? Colors.grayColor : 'transparent' }}
          >
            Skip
          </Text>
          {currentIndex == 2 ? (
            <Text
              onPress={() => {
                navigation.push('auth/loginRegisterScreen');
              }}
              style={{
                position: 'absolute',
                right: 0.0,
                bottom: 0.0,
                ...Fonts.primaryColor14Medium,
              }}
            >
              Login
            </Text>
          ) : (
            <Text
              onPress={() => {
                if (currentIndex == 0) {
                  swiperRef.current.scrollBy(1, true);
                } else if (currentIndex == 1) {
                  swiperRef.current.scrollBy(1, true);
                }
              }}
              style={{ ...Fonts.primaryColor14Medium }}>
              Next
            </Text>
          )}
        </View>
      </View>
      {backClickCount == 1 ? (
        <View style={styles.exitWrapStyle}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </View>
  );

  function page3() {
    return (
      <View style={styles.pageWrapStyle}>
        <Image
          source={require('../../assets/images/booklover.png')}
          style={{ height: 300, width: '100%' }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Medium,
          }}>
          Easy Explore
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 7.0,
            ...Fonts.grayColor14Regular,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat
          nulla hac fermentum pulvinar morbi pretium ut nibh. Maecenas ut et at
          nec.
        </Text>
      </View>
    );
  }

  function page2() {
    return (
      <View style={styles.pageWrapStyle}>
        <Image
          source={require('../../assets/images/playlist.png')}
          style={{ height: 300, width: '100%' }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding - 40.0,
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Medium,
          }}>
          Listen Your Books
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 7.0,
            ...Fonts.grayColor14Regular,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat
          nulla hac fermentum pulvinar morbi pretium ut nibh. Maecenas ut et at
          nec.
        </Text>
      </View>
    );
  }

  function page1() {
    return (
      <View style={styles.pageWrapStyle}>
        <Image
          source={require('../../assets/images/learning.png')}
          style={{ height: 300, width: '100%' }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding - 40.0,
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Medium,
          }}>
          Welcomes
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 7.0,
            ...Fonts.grayColor14Regular,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat
          nulla hac fermentum pulvinar morbi pretium ut nibh. Maecenas ut et at
          nec.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  exitWrapStyle: {
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapStyle: {
    flexDirection: 'row',
    height: 56.0,
    alignItems: 'center',
    paddingLeft: Sizes.fixPadding,
    paddingRight: Sizes.fixPadding * 2.0,
  },
  forwardButtonWrapStyle: {
    position: 'absolute',
    bottom: 20.0,
    right: 20.0,
    width: 45.0,
    height: 45.0,
    borderRadius: 22.5,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    borderRadius: 5.0,
    height: 10.0,
    width: 10.0,
    marginHorizontal: Sizes.fixPadding - 7.0,
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
  },
  activeDotStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 5.0,
    height: 10.0,
    width: 10.0,
    marginHorizontal: Sizes.fixPadding - 7.0,
  },
  pageWrapStyle: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipNextAndLoginTextWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 3.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default OnboardingScreen;