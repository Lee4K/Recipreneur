import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const PrivacyPolicyScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>{policy()}</ScrollView>
      </View>
    </View>
  );

  function policy() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ultrices netus sed lobortis morbi eget. Lectus aliquam a cursus in
          egestas tellus.
        </Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            ...Fonts.grayColor14Regular,
          }}>
          Gravida a, elementum egestas tempus hendrerit ipsum arcu. Netus
          pellentesque suspendisse sit malesuada neque, fermentum turpis. Nulla
          posuere tristique ut varius ac tincidunt vitae. Laoreet ultrices neque
          nunc justo, ut facilisis.
        </Text>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          A amet eget malesuada. Condimentum tellus odio mattis etiam aenean.
          Enim, mauris felis, est tempor molestie eleifend. Non in adipiscing
          non lectus amet. Dolor nisl mi dis purus pretium odio facilisi vitae
          duis. Scelerisque nisl eget bibendum tortor, morbi ornare ac.
        </Text>
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
          }}
        >
          Privacy Policy
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
});

export default PrivacyPolicyScreen;
