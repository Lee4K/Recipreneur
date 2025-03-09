import { Dimensions } from "react-native";

export const Fonts = {

    primaryColor12Regular: {
        color: '#009688',
        fontSize: 12,
        fontFamily: 'Rubik_Regular',
    },

    primaryColor14Regular: {
        color: '#009688',
        fontSize: 14,
        fontFamily: 'Rubik_Regular',
    },

    primaryColor16Regular: {
        color: '#009688',
        fontSize: 16,
        fontFamily: 'Rubik_Regular',
    },

    primaryColor18Regular: {
        color: '#009688',
        fontSize: 18,
        fontFamily: 'Rubik_Regular',
    },

    primaryColor22Regular: {
        color: '#009688',
        fontSize: 22,
        fontFamily: 'Rubik_Regular',
    },

    primaryColor12Medium: {
        color: '#009688',
        fontSize: 12,
        fontFamily: 'Rubik_Medium',
    },

    primaryColor14Medium: {
        color: '#009688',
        fontSize: 14,
        fontFamily: 'Rubik_Medium',
    },

    primaryColor16Medium: {
        color: '#009688',
        fontSize: 16,
        fontFamily: 'Rubik_Medium',
    },

    primaryColor20Medium: {
        color: '#009688',
        fontSize: 20,
        fontFamily: 'Rubik_Medium',
    },

    primaryColor18SemiBold: {
        color: '#009688',
        fontSize: 18,
        fontFamily: 'Rubik_SemiBold',
    },

    blackColor12Regular: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Rubik_Regular',
    },

    blackColor14Regular: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Rubik_Regular',
    },

    blackColor16Regular: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Rubik_Regular',
    },

    blackColor18Regular: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Rubik_Regular',
    },

    blackColor22Regular: {
        color: '#000000',
        fontSize: 22,
        fontFamily: 'Rubik_Regular',
    },

    blackColor12Medium: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Rubik_Medium',
    },

    blackColor14Medium: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Rubik_Medium',
    },

    blackColor16Medium: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Rubik_Medium',
    },

    blackColor18Medium: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Rubik_Medium',
    },

    grayColor10Regular: {
        color: '#B7B7B7',
        fontSize: 10,
        fontFamily: 'Rubik_Regular',
    },

    grayColor12Regular: {
        color: '#B7B7B7',
        fontSize: 12,
        fontFamily: 'Rubik_Regular',
    },

    grayColor14Regular: {
        color: '#B7B7B7',
        fontSize: 14,
        fontFamily: 'Rubik_Regular',
    },

    grayColor16Regular: {
        color: '#B7B7B7',
        fontSize: 16,
        fontFamily: 'Rubik_Regular',
    },

    grayColor18Regular: {
        color: '#B7B7B7',
        fontSize: 18,
        fontFamily: 'Rubik_Regular',
    },

    grayColor14Medium: {
        color: '#B7B7B7',
        fontSize: 14,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor12Regular: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Rubik_Regular',
    },

    whiteColor14Regular: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Rubik_Regular',
    },

    whiteColor10Medium: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor12Medium: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor14Medium: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor20Medium: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor30Medium:{
        color: '#FFFFFF',
        fontSize: 30,
        fontFamily: 'Rubik_Medium',
    },

    whiteColor12SemiBold: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Rubik_SemiBold',
    },

    whiteColor16SemiBold: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Rubik_SemiBold',
    },

    whiteColor18SemiBold: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Rubik_SemiBold',
    },

    whiteColor18Bold: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Rubik_Bold',
    },

    greenColor14Regular: {
        color: '#008F11',
        fontSize: 14,
        fontFamily: 'Rubik_Regular',
    },

    greenColor12Medium: {
        color: '#008F11',
        fontSize: 12,
        fontFamily: 'Rubik_Medium',
    },

    yellowColor12Medium: {
        color: '#FFAC33',
        fontSize: 12,
        fontFamily: 'Rubik_Medium',
    },

    redColor12Regular: {
        color: '#FF0000',
        fontSize: 12.0,
        fontFamily: 'Rubik_Regular',
    },

    redColor14Regular: {
        color: '#FF0000',
        fontSize: 14.0,
        fontFamily: 'Rubik_Regular',
    }
}

export const Colors = {
    whiteColor: '#FFFFFF',
    blackColor: '#000000',
    primaryColor: '#009688',
    grayColor: '#B7B7B7',
    lightWhiteColor: '#FAFAFA',
    greenColor: '#008F11',
    yellowColor: '#FFAC33',
    redColor: '#FF0000',
}

export const Sizes = {
    fixPadding: 10.0,
}

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const commonStyles = {
  headerShadow: {
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowOffset: {width: 1.0, height: 2.0},
    elevation:5.0,
  },
  shadow:{
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0.0, height: 1.0},
  }
};
