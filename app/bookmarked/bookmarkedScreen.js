import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Image,
  View,
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
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const bookmarkedList = [
  {
    key: '1',
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
    key: '2',
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
    key: '3',
    id: '3',
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
];

const rowSwipeAnimatedValues = {};

Array(bookmarkedList.length + 1)
  .fill('')
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const BookmarkedScreen = () => {

  const navigation = useNavigation();

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState(null);
  const [listData, setListData] = useState(bookmarkedList);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    const removedItem = listData.find(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setSnackBarMsg(`${removedItem.bookName} removed from bookmark.`);
    setShowSnackBar(true);
    setListData(newData);
  };

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = data => (
    <TouchableHighlight
      activeOpacity={0.99}
      style={{ backgroundColor: Colors.whiteColor }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(data.item) })}
        style={{
          justifyContent: 'center',
          height: 128.0,
          marginBottom: Sizes.fixPadding,
        }}>
        <View style={styles.booksInfoWrapStyle}>
          <Image
            source={data.item.bookImage}
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
                {data.item.bookName}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                {data.item.bookAuthor}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: Sizes.fixPadding - 7.0,
                }}>
                <Text style={{ ...Fonts.yellowColor12Medium }}>
                  {data.item.rating}
                </Text>
                <MaterialIcons
                  name="star"
                  color={Colors.yellowColor}
                  size={14}
                  style={{ marginHorizontal: Sizes.fixPadding - 8.0 }}
                />
                <Text style={{ ...Fonts.grayColor10Regular }}>
                  {data.item.rated} rated
                </Text>
              </View>

              <Text style={{ ...Fonts.grayColor12Regular }}>
                {data.item.timeToComplete} | {data.item.chapters} Chapters
              </Text>
            </View>
            <Text style={{ alignSelf: 'flex-end', ...Fonts.greenColor12Medium }}>
              {`$`}
              {data.item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.backDeleteContinerStyle}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 50],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <MaterialIcons
            name="delete"
            size={24}
            color={Colors.whiteColor}
            style={{ alignSelf: 'center' }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <View style={{ flex: 1 }}>
          {listData.length == 0 ? noDataInfo() : bookMarksData()}
          {snackBarInfo()}
        </View>
      </View>
    </View>
  );

  function bookMarksData() {
    return (
      <View style={{ flex: 1 }}>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-50}
          onSwipeValueChange={onSwipeValueChange}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function noDataInfo() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialIcons name="bookmark-outline" size={35} color="#949494" />
        <Text
          style={{
            ...Fonts.grayColor18Regular,
            marginTop: Sizes.fixPadding,
          }}>
          No Items in Bookmarked
        </Text>
      </View>
    );
  }

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
          }}>
          Bookmarked
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
  backDeleteContinerStyle: {
    alignItems: 'center',
    bottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
    backgroundColor: Colors.redColor,
    right: 0,
    marginVertical: Sizes.fixPadding + 10.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderBottomLeftRadius: Sizes.fixPadding - 5.0,
  },
  booksInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
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

export default BookmarkedScreen;
