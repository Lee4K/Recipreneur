import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
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
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const libraryDownloadedList = [
  {
    id: '1',
    libraryName: 'The Hobbit',
    authorName: 'J. R. R. Tolkien',
    timeConsume: ' 6hr 14min',
  },
  {
    id: '2',
    libraryName: "Harry Potter and the Philosopher's Stone",
    authorName: 'J. K. Rowling',
    timeConsume: '5hr 10min',
  },
  {
    id: '3',
    libraryName: 'The Little Prince',
    authorName: 'Antoine de Saint-Exupéry',
    timeConsume: '2hr 17min',
  },
  {
    id: '4',
    libraryName: 'Dream of the Red Chamber',
    authorName: 'Cao Xueqin',
    timeConsume: '6hr 44min',
  },
  {
    id: '5',
    libraryName: 'And Then There Were None',
    authorName: 'Agatha Christie',
    timeConsume: '10hr 17min',
  },
  {
    id: '6',
    libraryName: 'The Lion, the Witch and the Wardrobe',
    authorName: 'C. S. Lewis',
    timeConsume: '2hr 17min',
  },
  {
    id: '7',
    libraryName: 'A History of Adventure',
    authorName: 'H. Rider Haggard',
    timeConsume: '3hr 6min',
  },
  {
    id: '8',
    libraryName: 'The Adventures of Pinocchio',
    authorName: 'Carlo Collodi',
    timeConsume: '2hr 17min',
  },
  {
    id: '9',
    libraryName: 'The Da Vinci Code',
    authorName: 'Dan Brown',
    timeConsume: '2hr 15min',
  },
  {
    id: '10',
    libraryName: 'Harry Potter and the Chamber of Secrets',
    authorName: 'J. K. Rowling',
    timeConsume: '3hr 4min',
  },
  {
    id: '11',
    libraryName: 'The Catcher in the Rye',
    authorName: 'J. D. Salinger',
    timeConsume: '2hr 30min',
  },
  {
    id: '12',
    libraryName: 'Ben-Hur: A Tale of the Christ',
    authorName: 'Lew Wallace',
    timeConsume: '5hr 6min',
  },
  {
    id: '13',
    libraryName: 'The Common Sense Book of Baby and Child Care',
    authorName: 'Benjamin Spock',
    timeConsume: '6hr 6min',
  },
  {
    id: '14',
    libraryName: 'Anne of Green Gables',
    authorName: 'Lucy Maud Montgomery',
    timeConsume: '5hr 17min',
  },
  {
    id: '15',
    libraryName: 'Black Beauty',
    authorName: 'Anna Sewell',
    timeConsume: '2hr 17min',
  },
  {
    id: '16',
    libraryName: 'The Name of the Rose',
    authorName: 'Umberto Eco',
    timeConsume: '5hr 9min',
  },
  {
    id: '17',
    libraryName: 'The Eagle Has Landed',
    authorName: 'Jack Higgins',
    timeConsume: '7hr 10min',
  },
];

const shelvesList = [
  {
    id: '1',
    libraryImage: require('../../assets/images/books/book9.png'),
    libraryName: 'Harry Potter’s N...',
    totalAudiobooks: 5,
  },
  {
    id: '2',
    libraryImage: require('../../assets/images/books/book27.png'),
    libraryName: 'History Novels',
    totalAudiobooks: 4,
  },
  {
    id: '3',
    libraryImage: require('../../assets/images/books/book17.png'),
    libraryName: 'Fantasy Novels',
    totalAudiobooks: 6,
  },
  {
    id: '4',
    libraryImage: require('../../assets/images/books/book16.png'),
    libraryName: 'Horror Novels',
    totalAudiobooks: 4,
  },
  {
    id: '5',
    libraryImage: require('../../assets/images/books/book28.png'),
    libraryName: 'Classics Novels',
    totalAudiobooks: 4,
  },
];

const LibraryScreen = () => {

  const navigation = useNavigation();

  const [search, setsearch] = useState('');
  const [currentIndex, setcurrentIndex] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {downloadedAndShelvesTab()}
        {currentIndex == 1 ? downloads() : shelves()}
      </View>
    </View>
  );

  function shelves() {
    const renderItem = ({ item }) => (
      <View style={styles.shelvesWrapStyle}>
        <Image
          source={item.libraryImage}
          style={styles.librabryImageWrapStyle}
        />
        <View style={{ padding: Sizes.fixPadding - 7.0 }}>
          <Text
            numberOfLines={1}
            style={{ maxWidth: screenWidth / 3.5, ...Fonts.blackColor14Regular }}>
            {item.libraryName}
          </Text>
          <Text style={{ ...Fonts.grayColor12Regular }}>
            {item.totalAudiobooks} Audiobooks
          </Text>
        </View>
      </View>
    );
    return (
      <FlatList
        key={'_'}
        data={shelvesList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: Sizes.fixPadding + 5.0,
          paddingTop: Sizes.fixPadding - 5.0,
        }}
      />
    );
  }

  function downloads() {
    const renderItem = ({ item }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.playArrowCircle}>
            <MaterialIcons
              name="play-arrow"
              color={Colors.whiteColor}
              size={12}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor14Regular }}>
              {item.libraryName}
            </Text>
            <Text style={{ ...Fonts.grayColor10Regular }}>
              {item.authorName} • {item.timeConsume}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            height: 1.0,
            marginVertical: Sizes.fixPadding - 3.0,
          }}
        />
      </View>
    );
    return (
      <FlatList
        key={'#'}
        ListHeaderComponent={<>{searchField()}</>}
        data={libraryDownloadedList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
      />
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={16} />
        <TextInput
          selectionColor={Colors.primaryColor}
          placeholder="Search among audiobooks..."
          value={search}
          style={styles.searchFieldStyle}
          onChangeText={text => setsearch(text)}
        />
      </View>
    );
  }

  function downloadedAndShelvesTab() {
    return (
      <View style={styles.downloadedAndShelvesTabWrapStyle}>
        {tabOptions({ optionTitle: 'Downloaded', index: 1 })}
        {tabOptions({ optionTitle: 'Shelves', index: 2 })}
      </View>
    );
  }

  function tabOptions({ optionTitle, index }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setcurrentIndex(index)}
        style={{
          backgroundColor:
            currentIndex == index ? Colors.whiteColor : 'transparent',
          ...styles.tabBarOptionsWrapStyle,
        }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>{optionTitle}</Text>
      </TouchableOpacity>
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
          My Library
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
  tabBarOptionsWrapStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
  },
  downloadedAndShelvesTabWrapStyle: {
    backgroundColor: '#E6E6E6',
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 40.0,
    padding: Sizes.fixPadding - 8.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  searchFieldWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding - 5.0,
    ...commonStyles.shadow,
  },
  searchFieldStyle: {
    height: 18.0,
    marginLeft: Sizes.fixPadding - 5.0,
    flex: 1,
    ...Fonts.blackColor12Regular,
    padding: 0,
  },
  shelvesWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    marginHorizontal: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    maxWidth: screenWidth / 3.5,
    ...commonStyles.shadow,
  },
  librabryImageWrapStyle: {
    height: 118.0,
    width: '100%',
    maxWidth: screenWidth / 3.5,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  playArrowCircle: {
    width: 15.0,
    height: 15.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LibraryScreen;