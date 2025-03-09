import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles, screenWidth } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const authorOthersBookList = [
  {
    id: 'u1',
    bookImage: require('../../assets/images/books/book12.png'),
  },
  {
    id: 'u2',
    bookImage: require('../../assets/images/books/book13.png'),
  },
  {
    id: 'u3',
    bookImage: require('../../assets/images/books/book19.png'),
  },
  {
    id: 'u4',
    bookImage: require('../../assets/images/books/book20.png'),
  },
  {
    id: 'u5',
    bookImage: require('../../assets/images/books/book5.png'),
  },
  {
    id: 'u6',
    bookImage: require('../../assets/images/books/book7.png'),
  },
  {
    id: 'u7',
    bookImage: require('../../assets/images/books/book21.png'),
  },
  {
    id: 'u8',
    bookImage: require('../../assets/images/books/book9.png'),
  },
  {
    id: 'u9',
    bookImage: require('../../assets/images/books/book10.png'),
  },
  {
    id: 'u10',
    bookImage: require('../../assets/images/books/book11.png'),
  },
];

const AuthorProfileScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {authorInfo()}
        {aboutAuthor()}
        {authorOthersBooks()}
      </View>
    </View>
  );

  function authorOthersBooks() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('bookDetail/bookDetailScreen', { item: JSON.stringify(item) })}
      >
        <Image source={item.bookImage} style={styles.bookImageStyle} />
      </TouchableOpacity>
    );
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Medium,
          }}>
          Author’s Other Books
        </Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={authorOthersBookList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            numColumns={4}
            contentContainerStyle={{
              paddingLeft: Sizes.fixPadding * 2.0,
              paddingRight: Sizes.fixPadding,
              paddingBottom: Sizes.fixPadding,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function aboutAuthor() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>About Author</Text>
        <Text
          style={{
            textAlign: 'justify',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          faucibus fringilla convallis elit.
        </Text>
        <Text
          style={{
            textAlign: 'justify',
            marginTop: Sizes.fixPadding - 8.0,
            ...Fonts.grayColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor
          ullamcorper massa leo lacinia nisl amet ornare aliquet dictum. Tortor
          pellentesque senectus rutrum vestibulum, porta cursus facilisi
          ultricies.
        </Text>
      </View>
    );
  }

  function authorInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/users/user2.png')}
          style={{ width: 60.0, height: 60.0, borderRadius: 30.0 }}
        />
        <View style={{ marginLeft: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.blackColor14Medium }}>J. K. Rowling</Text>
          <Text style={{ ...Fonts.grayColor12Regular }}>New Jersey</Text>
        </View>
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
          style={{ alignSelf: 'flex-start' }}
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
  },
  bookImageStyle: {
    height: 120,
    flex: 1,
    marginRight: Sizes.fixPadding,
    maxWidth: screenWidth / 4.8,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
  },
});

export default AuthorProfileScreen;