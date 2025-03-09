import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../../constants/styles';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const bannerList = [
  {
    id: 1,
    bgColor: '#E1BEE7',
    title: 'Get Audio Books',
    bannerImage: require('../../../assets/images/banner/banner_img1.png'),
    description: `Lorem ipsum dolor sit amet,\nconsectetur.`,
    buttonBgColor: '#AF8EB5',
  },
  {
    id: 2,
    bgColor: '#C5CAE9',
    title: 'Listening is a new',
    bannerImage: require('../../../assets/images/banner/banner_img2.png'),
    description: `Lorem ipsum dolor sit amet,\nconsectetur.`,
    buttonBgColor: '#9499B7',
  },
];

const genresList = [
  {
    id: '1',
    bgColor: '#CB9CA1',
    icon: require('../../../assets/images/icons/drama.png'),
    type: 'Drama',
  },
  {
    id: '2',
    bgColor: '#AF8EB5',
    icon: require('../../../assets/images/icons/history.png'),
    type: 'History',
  },
  {
    id: '3',
    bgColor: '#8AACC8',
    icon: require('../../../assets/images/icons/fantasy.png'),
    type: 'Fantasy',
  },
  {
    id: '4',
    bgColor: '#81B9BF',
    icon: require('../../../assets/images/icons/horror.png'),
    type: 'Horror',
  },
  {
    id: '5',
    bgColor: '#97B498',
    icon: require('../../../assets/images/icons/love.png'),
    type: 'Love',
  },
  {
    id: '6',
    bgColor: '#CBC693',
    icon: require('../../../assets/images/icons/religious.png'),
    type: 'Religious',
  },
];

const continueListeningList = [
  {
    id: 'c1',
    bookImage: require('../../../assets/images/books/book1.png'),
    bookName: 'I Have a Dream',
    bookAuthor: 'Rashmi Bansal',
    watchingCompletedInPercentage: 28,
  },
  {
    id: 'c2',
    bookImage: require('../../../assets/images/books/book2.png'),
    bookName: 'Last Breath',
    bookAuthor: 'Durjoy Datta',
    watchingCompletedInPercentage: 50,
  },
  {
    id: 'c3',
    bookImage: require('../../../assets/images/books/book3.png'),
    bookName: 'The 4th Idiot',
    bookAuthor: 'Roy Chowdhury',
    watchingCompletedInPercentage: 30,
  },
  {
    id: 'c4',
    bookImage: require('../../../assets/images/books/book4.png'),
    bookName: 'You’re Born to Blos...',
    bookAuthor: 'Dr APJ Abdul Kalam',
    watchingCompletedInPercentage: 90,
  },
];

const recommendedList = [
  {
    id: '1',
    bookImage: require('../../../assets/images/books/book5.png'),
  },
  {
    id: '2',
    bookImage: require('../../../assets/images/books/book6.png'),
  },
  {
    id: '3',
    bookImage: require('../../../assets/images/books/book7.png'),
  },
  {
    id: '4',
    bookImage: require('../../../assets/images/books/book8.png'),
  },
  {
    id: '5',
    bookImage: require('../../../assets/images/books/book9.png'),
  },
  {
    id: '6',
    bookImage: require('../../../assets/images/books/book10.png'),
  },
  {
    id: '7',
    bookImage: require('../../../assets/images/books/book11.png'),
  },
  {
    id: '8',
    bookImage: require('../../../assets/images/books/book12.png'),
  },
  {
    id: '9',
    bookImage: require('../../../assets/images/books/book13.png'),
  },
];

const trendingList = [
  {
    id: '1',
    bookImage: require('../../../assets/images/books/book14.png'),
  },
  {
    id: '2',
    bookImage: require('../../../assets/images/books/book15.png'),
  },
  {
    id: '3',
    bookImage: require('../../../assets/images/books/book16.png'),
  },
  {
    id: '4',
    bookImage: require('../../../assets/images/books/book17.png'),
  },
];

const latestList = [
  {
    id: '1',
    bookImage: require('../../../assets/images/books/book10.png'),
  },
  {
    id: '2',
    bookImage: require('../../../assets/images/books/book11.png'),
  },
  {
    id: '3',
    bookImage: require('../../../assets/images/books/book12.png'),
  },
  {
    id: '4',
    bookImage: require('../../../assets/images/books/book13.png'),
  },
];

const DiscoverScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        >
          {banner()}
          {genersInfo()}
          {continueListeningInfo()}
          {recommendedInfo()}
          {trendingInfo()}
          {latestInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function latestInfo() {
    const renderItem = ({ item }) => (
      <Image
        source={item.bookImage}
        style={{
          width: 86.0,
          ...styles.commonPosterStyle,
        }}
      />
    );
    return (
      <View>
        <View style={styles.latestInfoWrapStyle}>
          <Text style={{ ...Fonts.blackColor16Medium }}>Latest</Text>
          <Text
            onPress={() =>
              navigation.push('trendingBooks/trendingBooksScreen', { title: 'Latest Books' })
            }
            style={{ ...Fonts.primaryColor14Medium }}>
            See All
          </Text>
        </View>
        <FlatList
          data={latestList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
  }

  function trendingInfo() {
    const renderItem = ({ item }) => (
      <Image source={item.bookImage} style={styles.commonPosterStyle} />
    );

    return (
      <View>
        <View style={styles.trendingInfoWrapStyle}>
          <Text style={{ ...Fonts.blackColor16Medium }}>Trending</Text>
          <Text
            onPress={() =>
              navigation.push('trendingBooks/trendingBooksScreen', { title: 'Trending Books' })
            }
            style={{ ...Fonts.primaryColor14Medium }}>
            See All
          </Text>
        </View>
        <FlatList
          data={trendingList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
  }

  function recommendedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
      >
        <Image source={item.bookImage} style={styles.recommendedImageStyle} />
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Recommended For You
        </Text>
        <FlatList
          data={recommendedList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
  }

  function continueListeningInfo() {
    const renderItem = ({ item }) => (
      <View style={styles.continueListeningInfoWrapStyle}>
        <Image
          source={item.bookImage}
          style={{
            width: 55.0,
            height: 55.0,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <View style={styles.continueListeningDetailWrapStyle}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14Regular }}>
            {item.bookName}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
            {item.bookAuthor}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{ ...Fonts.greenColor12Medium }}>
                {item.watchingCompletedInPercentage}% Completed
              </Text>
              <Progress.Bar
                progress={item.watchingCompletedInPercentage / 100.0}
                color={Colors.primaryColor}
                unfilledColor="#E6E6E6"
                borderWidth={0}
                height={2}
                width={100}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
              style={styles.continueListeningIconWrapStyle}
            >
              <MaterialIcons
                name="play-arrow"
                size={11}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Continue Listening
        </Text>
        <FlatList
          data={continueListeningList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding + 5.0
          }}
        />
      </View>
    );
  }

  function genersInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('genresDetail/genresDetailScreen', { item: JSON.stringify(item) })}
        style={{
          ...styles.genersInfoWrapStyle,
          backgroundColor: item.bgColor,
        }}
      >
        <Image
          source={item.icon}
          style={{ width: 30.0, height: 30.0 }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor14Medium,
          }}>
          {item.type}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Genres
        </Text>
        <FlatList
          data={genresList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
  }

  function banner() {
    const renderItem = ({ item }) => (
      <View
        style={{
          ...styles.bannerWrapStyle,
          backgroundColor: item.bgColor,
        }}
      >
        <Text
          numberOfLines={1}
          style={{ maxWidth: 170, ...Fonts.whiteColor18Bold }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          style={{ maxWidth: 170, ...Fonts.whiteColor12Regular }}>
          {item.description}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.push('trendingBooks/trendingBooksScreen', { title: 'Trending Books' })
          }
          style={{
            backgroundColor: item.buttonBgColor,
            ...styles.exploreNowButtonStyle,
          }}>
          <Text style={{ ...Fonts.whiteColor12SemiBold }}>Explore Now</Text>
        </TouchableOpacity>
        <Image
          source={item.bannerImage}
          style={{
            position: 'absolute',
            right: 5.0,
            width: 73.0,
          }}
          resizeMode="contain"
        />
      </View>
    );

    return (
      <View>
        <FlatList
          data={bannerList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding * 2.0,
            paddingHorizontal: Sizes.fixPadding + 5.0,
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Hello, Samantha!</Text>
        <Image
          source={require('../../../assets/images/users/user1.png')}
          style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightWhiteColor,
    borderBottomLeftRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.headerShadow,
  },
  bannerWrapStyle: {
    width: 250,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
  exploreNowButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: Sizes.fixPadding - 2.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
  genersInfoWrapStyle: {
    width: 80.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
  },
  continueListeningInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    width: 212.0,
    borderColor: '#E6E6E6',
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    height: 75.0,
  },
  continueListeningIconWrapStyle: {
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    backgroundColor: Colors.greenColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonPosterStyle: {
    height: 120.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
  continueListeningDetailWrapStyle: {
    height: 55.0,
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: Sizes.fixPadding,
  },
  trendingInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding - 5.0,
  },
  recommendedImageStyle: {
    width: 80.0,
    height: 120.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
  latestInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding - 5.0,
  },
});

export default DiscoverScreen;
