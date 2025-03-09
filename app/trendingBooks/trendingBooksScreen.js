import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const booksList = [
  {
    id: '1',
    bookImage: require('../../assets/images/books/book8.png'),
    bookName: 'Tresure of The Lost Sea',
    bookAuthor: 'Robert F. Marx',
    rating: '4.2',
    rated: 124,
    timeToComplete: '3hr • 20min',
    chapters: 12,
    inBookmark: true,
    amount: '2.50',
  },
  {
    id: '2',
    bookImage: require('../../assets/images/books/book19.png'),
    bookName: 'War and Peace',
    bookAuthor: 'Leo Tolstoy',
    rating: '4.0',
    rated: 120,
    timeToComplete: '2hr • 20min',
    chapters: 10,
    inBookmark: true,
    amount: '3.50',
  },
  {
    id: '3',
    bookImage: require('../../assets/images/books/book20.png'),
    bookName: 'To Kill a Mockingbird',
    bookAuthor: 'Harper Lee',
    rating: '4.2',
    rated: 124,
    timeToComplete: '4hr • 20min',
    chapters: 15,
    inBookmark: false,
    amount: '1.50',
  },
  {
    id: '4',
    bookImage: require('../../assets/images/books/book6.png'),
    bookName: 'Good to Great',
    bookAuthor: 'James C. Collins',
    rating: '4.0',
    rated: 124,
    timeToComplete: '3hr • 20min',
    chapters: 12,
    inBookmark: true,
    amount: '3.50',
  },
  {
    id: '5',
    bookImage: require('../../assets/images/books/book21.png'),
    bookName: 'The Ginger Man',
    bookAuthor: 'J.P Donleavy',
    rating: '4.2',
    rated: 124,
    timeToComplete: '3hr • 20min',
    chapters: 12,
    inBookmark: false,
    amount: '2.50',
  },
  {
    id: '6',
    bookImage: require('../../assets/images/books/book7.png'),
    bookName: 'The Habbit',
    bookAuthor: 'J.R.R Tolkien',
    rating: '4.2',
    rated: 124,
    timeToComplete: '4hr • 10min',
    chapters: 16,
    inBookmark: false,
    amount: '2.50',
  },
  {
    id: '7',
    bookImage: require('../../assets/images/books/book9.png'),
    bookName: 'Harry Potter',
    bookAuthor: 'J. K. Rowling',
    rating: '4.2',
    rated: 124,
    timeToComplete: '3hr • 20min',
    chapters: 16,
    inBookmark: false,
    amount: '2.50',
  },
  {
    id: '8',
    bookImage: require('../../assets/images/books/book10.png'),
    bookName: 'The Names they Gave Us',
    bookAuthor: 'Fmery Lord',
    rating: '3.2',
    rated: 100,
    timeToComplete: '1hr • 17min',
    chapters: 16,
    inBookmark: false,
    amount: '1.50',
  },
  {
    id: '9',
    bookImage: require('../../assets/images/books/book11.png'),
    bookName: 'I Have a Dream',
    bookAuthor: 'Rasmi Bansal',
    rating: '4.2',
    rated: 124,
    timeToComplete: '3hr • 20min',
    chapters: 12,
    inBookmark: false,
    amount: '2.50',
  },
];

const TrendingBooksScreen = () => {

  const navigation = useNavigation();

  var { title } = useLocalSearchParams();

  const [showSnackBar, setshowSnackBar] = useState(false);
  const [inBookmark, setinBookmark] = useState();
  const [changableBookmarkBook, setchangableBookmarkBook] = useState();
  const [booksData, setbooksData] = useState(booksList);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {books()}
      </View>
      {snackBarInfo()}
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setshowSnackBar(false)}
        style={styles.snackBarStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          {!inBookmark
            ? `${changableBookmarkBook} added to bookmark`
            : `${changableBookmarkBook} removed from bookmark`}
        </Text>
      </Snackbar>
    );
  }

  function changeBooksData({ id }) {
    const newList = booksData.map(book => {
      if (book.id === id) {
        const updatedItem = { ...book, inBookmark: !book.inBookmark };
        return updatedItem;
      }
      return book;
    });
    setbooksData(newList);
  }

  function books() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
        style={{
          justifyContent: 'center',
          height: 128.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <View style={styles.booksInfoWrapStyle}>
          <Image
            source={item.bookImage}
            style={{
              width: 100.0,
              height: 128.0,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
          />
          <View style={styles.booksDetailWrapStyle}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: screenWidth - 200,
                  ...Fonts.blackColor16Medium,
                }}>
                {item.bookName}
              </Text>
              <Text style={{ ...Fonts.grayColor12Regular }}>
                {item.bookAuthor}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: Sizes.fixPadding - 7.0,
                }}>
                <Text style={{ ...Fonts.yellowColor12Medium }}>
                  {item.rating}
                </Text>
                <MaterialIcons
                  name="star"
                  color={Colors.yellowColor}
                  size={14}
                  style={{ marginHorizontal: Sizes.fixPadding - 8.0 }}
                />
                <Text style={{ ...Fonts.grayColor10Regular }}>
                  {item.rated} rated
                </Text>
              </View>

              <Text style={{ ...Fonts.grayColor12Regular }}>
                {item.timeToComplete} | {item.chapters} Chapters
              </Text>
            </View>

            <View
              style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <MaterialIcons
                name={item.inBookmark ? 'bookmark' : 'bookmark-outline'}
                color={Colors.grayColor}
                size={20}
                onPress={() => {
                  changeBooksData({ id: item.id });
                  setshowSnackBar(true);
                  setinBookmark(item.inBookmark);
                  setchangableBookmarkBook(item.bookName);
                }}
              />
              <Text style={{ ...Fonts.greenColor12Medium }}>
                {`$`}
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={booksData}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
      />
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
          {title}
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
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
  },
  booksInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderColor: '#E6E6E6',
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 88.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.shadow,
  },
  booksDetailWrapStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: Sizes.fixPadding,
  },
});

export default TrendingBooksScreen;
