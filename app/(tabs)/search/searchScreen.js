import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const recentSearchesList = [
  {
    id: '1',
    search: 'Americon gods',
  },
  {
    id: '2',
    search: 'Neil geiman',
  },
  {
    id: '3',
    search: 'Lord of the rings',
  },
  {
    id: '4',
    search: 'Harry potter books',
  },
];

const suggestedBooksList = [
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

const SearchScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchInfo()}
          {recentSearches()}
          {suggestions()}
        </ScrollView>
      </View>
    </View>
  );

  function suggestions() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
      >
        <Image
          source={item.bookImage}
          style={{
            width: 80.0,
            height: 120.0,
            borderRadius: Sizes.fixPadding - 5.0,
            marginHorizontal: Sizes.fixPadding - 5.0,
          }}
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Suggestion For You
        </Text>
        <FlatList
          data={suggestedBooksList}
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

  function recentSearches() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
          Recent Searches:
        </Text>
        {recentSearchesList.map(item => (
          <View key={`${item.id}`}>
            <Text
              style={{
                marginBottom: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor12Regular,
              }}>
              {item.search}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  function searchInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('searchResult/searchResultScreen')}
        style={styles.searchInfoWrapStyle}
      >
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor12Regular }}
        >
          Search among audiobooks, authors...
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor18Medium }}>Search</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.lightWhiteColor,
    borderBottomLeftRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.headerShadow
  },
  searchInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    margin: Sizes.fixPadding * 2.0,
    borderColor: Colors.grayColor,
    borderWidth: 0.1,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.shadow
  },
});

export default SearchScreen;
