import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../constants/styles';
import MyStatusBar from '../components/myStatusBar';
import { useNavigation } from 'expo-router';

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push('onboarding/onboardingScreen');
    }, 2000);
    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (
    <View style={styles.pageStyle}>
      <MyStatusBar />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{ height: 55.0, width: 45.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.whiteColor30Medium }}>Book</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  pageStyle: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
