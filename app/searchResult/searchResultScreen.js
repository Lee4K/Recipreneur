import React, { useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const booksList = [
  {
    id: '1',
    bookImage: require('../../assets/images/books/book9.png'),
    bookName: "Harry Potter and the Philosopher's Stone",
    bookAuthor: 'J.K Rowling',
    rating: '4.0',
  },
  {
    id: '2',
    bookImage: require('../../assets/images/books/book22.png'),
    bookName: 'Harry Potter and the Chamber of Secrets',
    bookAuthor: 'J.K Rowling',
    rating: '4.5',
  },
  {
    id: '3',
    bookImage: require('../../assets/images/books/book23.png'),
    bookName: 'Harry Potter and the Prisoner of Azkaban',
    bookAuthor: 'J.K Rowling',
    rating: '4.1',
  },
  {
    id: '4',
    bookImage: require('../../assets/images/books/book24.png'),
    bookName: 'Harry Potter and the Goblet of Fire',
    bookAuthor: 'J.K Rowling',
    rating: '4.1',
  },
  {
    id: '5',
    bookImage: require('../../assets/images/books/book25.png'),
    bookName: 'Harry Potter and the Half-Blood Prince',
    bookAuthor: 'J.K Rowling',
    rating: '4.1',
  },
  {
    id: '6',
    bookImage: require('../../assets/images/books/book26.png'),
    bookName: 'Harry Potter and the Deathly Hallows',
    bookAuthor: 'J.K Rowling',
    rating: '4.1',
  },
];

const SearchResultScreen = () => {

  const navigation = useNavigation();

  const [search, setsearch] = useState('Harry potter');
  const [currentIndex, setcurrentIndex] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {searchField()}
        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          {filterInfo()}
          {audioBooksInfo()}
          {authorsInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function authorsInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Authors</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('authorProfile/authorProfileScreen')}
          style={{ marginTop: Sizes.fixPadding - 5.0, alignSelf: 'flex-start' }}
        >
          <Image
            source={require('../../assets/images/users/user2.png')}
            style={{ width: 60.0, height: 60.0, borderRadius: 30.0 }}
          />
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.blackColor12Regular,
            }}>
            J. K. Rowling
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function audioBooksInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
        style={{ marginRight: Sizes.fixPadding }}
      >
        <View>
          <Image
            source={item.bookImage}
            style={{
              width: 120.0,
              height: 150.0,
            }}
            resizeMode="stretch"
          />
          <View style={styles.ratingWrapper}>
            <Text style={{ ...Fonts.whiteColor12Medium }}>{item.rating}</Text>
            <MaterialIcons name="star" color={Colors.whiteColor} size={12} />
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{
            marginVertical: Sizes.fixPadding - 5.0,
            width: 120.0,
            ...Fonts.blackColor14Regular,
          }}>
          {item.bookName}
        </Text>
        <Text style={{ ...Fonts.grayColor12Regular }}>{item.bookAuthor}</Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Audiobooks
        </Text>
        <FlatList
          data={booksList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
            paddingTop: Sizes.fixPadding - 5.0,
          }}
        />
      </View>
    );
  }

  function filterInfo() {
    return (
      <View style={styles.filterInfoWrapStyle}>
        {filterShort({ title: 'All Results', index: 1 })}
        {filterShort({ title: 'Audiobooks', index: 2 })}
        {filterShort({ title: 'Authors', index: 3 })}
      </View>
    );
  }

  function filterShort({ index, title }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setcurrentIndex(index)}
        style={{
          ...styles.filterOptionsWrapStyle,
          backgroundColor:
            currentIndex == index ? Colors.primaryColor : Colors.whiteColor,
          marginHorizontal: index == 2 ? Sizes.fixPadding : 0.0,
        }}>
        <Text
          style={
            currentIndex == index
              ? { ...Fonts.whiteColor14Regular }
              : { ...Fonts.primaryColor14Regular }
          }>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={16} />
        <TextInput
          selectionColor={Colors.primaryColor}
          placeholder="Search Here"
          value={search}
          style={styles.searchFieldStyle}
          onChangeText={text => setsearch(text)}
        />
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
    ...commonStyles.headerShadow,
    alignItems: 'flex-start'
  },
  searchFieldWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    margin: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.shadow,
  },
  searchFieldStyle: {
    height: 18.0,
    marginLeft: Sizes.fixPadding - 5.0,
    flex: 1,
    padding: 0,
    ...Fonts.blackColor12Regular,
  },
  filterOptionsWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding - 4.0,
  },
  filterInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingWrapper: {
    position: 'absolute',
    bottom: 10.0,
    left: 10.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchResultScreen;
