import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const chaptersList = [
  {
    id: '1',
    chapterName: 'The Boy Who Lived',
    completedTime: '15:49 mins',
  },
  {
    id: '2',
    chapterName: 'The Vanishing Glass',
    completedTime: '10:17 mins',
  },
  {
    id: '3',
    chapterName: 'The Keeper of Keys',
    completedTime: '12:10 mins',
  },
  {
    id: '4',
    chapterName: 'Diagon Alley',
    completedTime: '14:05 mins',
  },
  {
    id: '5',
    chapterName: 'The Journey from Platform Nine and Three-Qua...',
    completedTime: '15:15 mins',
  },
  {
    id: '6',
    chapterName: 'The Sorting Hat',
    completedTime: '12:10 mins',
  },
  {
    id: '7',
    chapterName: 'The Potions Master',
    completedTime: '16:12 mins',
  },
  {
    id: '8',
    chapterName: 'The Midnight Duel',
    completedTime: '17:10 mins',
  },
  {
    id: '9',
    chapterName: "Hallowe'en",
    completedTime: '17:10 mins',
  },
  {
    id: '10',
    chapterName: 'Quidditch',
    completedTime: '12:30 mins',
  },
  {
    id: '11',
    chapterName: 'The Mirror of Erised',
    completedTime: '15:49 mins',
  },
  {
    id: '12',
    chapterName: 'Nicolas Flamel',
    completedTime: '14:20 mins',
  },
  {
    id: '13',
    chapterName: 'Norbert the Norwegian Ridgeback',
    completedTime: '17:10 mins',
  },
  {
    id: '14',
    chapterName: 'The Forbidden Forest',
    completedTime: '11:10 mins',
  },
  {
    id: '15',
    chapterName: 'Through the Trapdoor',
    completedTime: '09:15 mins',
  },
  {
    id: '16',
    chapterName: 'The Man with Two Faces',
    completedTime: '10:30 mins',
  },
];

const reviewsList = [
  {
    id: '1',
    reviewSenderImage: require('../../assets/images/users/user3.png'),
    reviewSenderName: 'Jane Cooper',
    sendingDate: '20 March 2020',
    rating: '5.0',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dolor in aliquam sagittis suspendisse sit. Enim euismod mi mi cursus pretium',
  },
  {
    id: '2',
    reviewSenderImage: require('../../assets/images/users/user4.png'),
    reviewSenderName: 'Esther Howard',
    sendingDate: '20 March 2020',
    rating: '4.0',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dolor in aliquam sagittis suspendisse sit. Enim euismod mi mi cursus pretium',
  },
  {
    id: '3',
    reviewSenderImage: require('../../assets/images/users/user5.png'),
    reviewSenderName: 'Wade Warren',
    sendingDate: '20 March 2020',
    rating: '4.2',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dolor in aliquam sagittis suspendisse sit. Enim euismod mi mi cursus pretium',
  },
  {
    id: '4',
    reviewSenderImage: require('../../assets/images/users/user6.png'),
    reviewSenderName: 'Jacob Jones',
    sendingDate: '20 March 2020',
    rating: '5.0',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dolor in aliquam sagittis suspendisse sit. Enim euismod mi mi cursus pretium',
  },
  {
    id: '5',
    reviewSenderImage: require('../../assets/images/users/user7.png'),
    reviewSenderName: 'Jenny Wilson',
    sendingDate: '20 March 2020',
    rating: '4.0',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dolor in aliquam sagittis suspendisse sit. Enim euismod mi mi cursus pretium',
  },
];

const BookDetailScreen = () => {

  const navigation = useNavigation();

  var { item } = useLocalSearchParams();
  item = JSON.parse(item);

  var { from } = useLocalSearchParams();

  const [currentIndex, setcurrentIndex] = useState(1);
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [inBookmark, setinBookmark] = useState(false);
  const [showPaymentDialog, setshowPaymentDialog] = useState(false);

  const defaultBook = {
    bookImage: require('../../assets/images/books/book9.png'),
    bookName: 'Harry Potter and The Philosopher’s Stone',
    bookAuthor: 'J.K Rowling',
    rating: '4.2',
    rated: 124,
    amount: '2.50',
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {bookInfo()}
        {aboutChaptersAndReviews()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        >
          {currentIndex == 1
            ? aboutInfo()
            : currentIndex == 2
              ? chaptersInfo()
              : reviewsInfo()}
        </ScrollView>
      </View>
      {snackBarInfo()}
      {startListeningAndDownloadButton()}
      {paymentDialog()}
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setshowSnackBar(false)}
        style={styles.snackBarStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          {inBookmark ? `Book added to bookmark` : `Book removed from bookmark`}
        </Text>
      </Snackbar>
    );
  }

  function paymentDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPaymentDialog}
        onRequestClose={() => { setshowPaymentDialog(false) }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { setshowPaymentDialog(false) }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ ...styles.dialogWrapStyle }}
            >
              <View style={styles.dialogContentWrapStyle}>
                <View style={styles.dialogBookImageWrapStyle}>
                  <Image
                    source={item.bookImage}
                    style={{ width: 100.0, height: 130.0 }}
                  />
                </View>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor14Medium }}>
                  {!item.bookName ? defaultBook.bookName : item.bookName}
                  <Text style={{ ...Fonts.grayColor12Regular }}>
                    {` `}By:
                    {!item.bookAuthor ? defaultBook.bookAuthor : item.bookAuthor}
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: Sizes.fixPadding + 5.0,
                    ...Fonts.primaryColor20Medium,
                  }}>
                  ${!item.amount ? defaultBook.amount : item.amount}
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                  Amount will be deducted from the wallet.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setshowPaymentDialog(false);
                    navigation.push('startListening/startListeningScreen', { item: JSON.stringify(item) });
                  }}
                  style={styles.dialogContinuButtonStyle}
                >
                  <Text style={{ ...Fonts.whiteColor18SemiBold }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function reviewsInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        {overrallRatingInfo()}
        {reviewsDetail()}
      </View>
    );
  }

  function reviewsDetail() {
    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}>
          Reviews
        </Text>
        {reviewsList.map(item => (
          <View key={`${item.id}`}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={item.reviewSenderImage}
                    style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                  />
                  <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                      {item.reviewSenderName}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                      {item.sendingDate}
                    </Text>
                  </View>
                </View>
                <Text style={{ ...Fonts.primaryColor14Medium }}>
                  {item.rating}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 5.0,
                  ...Fonts.grayColor14Regular,
                }}>
                {item.review}
              </Text>
              <View
                style={{
                  backgroundColor: '#E6E6E6',
                  height: 1.0,
                  marginVertical: Sizes.fixPadding,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  function overrallRatingInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Overall Ratings</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding - 8.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.ratingInfoWrapStyle}>
            <Text style={{ ...Fonts.whiteColor20Medium }}>4.2</Text>
            <Text style={{ ...Fonts.whiteColor10Medium }}>(130 Reviews)</Text>
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            {ratingInfo({ starCount: 5, percentage: 88 })}
            {ratingInfo({ starCount: 4, percentage: 60 })}
            {ratingInfo({ starCount: 3, percentage: 35 })}
            {ratingInfo({ starCount: 2, percentage: 25 })}
            {ratingInfo({ starCount: 1, percentage: 10 })}
          </View>
        </View>
      </View>
    );
  }

  function ratingInfo({ starCount, percentage }) {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding - 8.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{ ...Fonts.grayColor12Regular }}>{starCount} Star</Text>
        <Progress.Bar
          progress={percentage / 100.0}
          color={Colors.primaryColor}
          unfilledColor="#E6E6E6"
          borderWidth={0}
          height={3}
          style={{ marginHorizontal: Sizes.fixPadding }}
        />
        <Text style={{ ...Fonts.grayColor12Regular }}>{percentage}</Text>
      </View>
    );
  }

  function chaptersInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 10.0 }}>
        {chaptersList.map((item, index) => (
          <View key={`${item.id}`}>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...Fonts.primaryColor14Regular }}>
                  {index + 1}.
                </Text>
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <Text style={{ ...Fonts.blackColor14Regular }}>
                    {item.chapterName}
                  </Text>
                  <Text style={{ ...Fonts.grayColor12Regular }}>
                    {item.completedTime}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#E6E6E6',
                  height: 1.0,
                  marginVertical: Sizes.fixPadding,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  function startListeningAndDownloadButton() {
    return (
      <View style={styles.startListeningAndDownloadButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('downloadAudioBook/downloadAudioBookScreen')}
          style={styles.downloadButtonStyle}
        >
          <Feather name="download" size={24} color={Colors.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setshowPaymentDialog(true)}
          style={styles.startListeningButtonStyle}>
          <MaterialIcons
            name="play-circle-filled"
            size={24}
            color={Colors.whiteColor}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding + 2.0,
              ...Fonts.whiteColor18SemiBold,
            }}>
            Start Listening
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function aboutInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        {bookBriefInfo()}
        {descriptionInfo()}
        {authorInfo()}
      </View>
    );
  }

  function authorInfo() {
    return (
      <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Author Info</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/users/user2.png')}
              style={{ width: 60.0, height: 60.0, borderRadius: 30.0 }}
            />
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: screenWidth - 200.0,
                  ...Fonts.blackColor14Medium,
                }}>
                J. K. Rowling
              </Text>
              <Text style={{ ...Fonts.grayColor12Regular }}>New Jersey</Text>
              <Text style={{ ...Fonts.grayColor12Regular }}>
                <Text style={{ ...Fonts.primaryColor12Medium }}>48</Text>
                {` `}Books
              </Text>
            </View>
          </View>
          <Text
            onPress={() => navigation.push('authorProfile/authorProfileScreen')}
            style={{ ...Fonts.primaryColor12Medium }}>
            View Profile
          </Text>
        </View>
      </View>
    );
  }

  function descriptionInfo() {
    return (
      <View style={{}}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Description</Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          faucibus fringilla convallis elit.
        </Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding - 8.0,
            ...Fonts.grayColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor
          ullamcorper massa leo lacinia nisl amet ornare aliquet dictum. Tortor
          pellentesque senectus rutrum vestibulum, porta cursus facilisi
          ultricies.
        </Text>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          faucibus fringilla convallis elit, ipsum lacus. A eget malesuada id
          nisi.
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 8.0,
            ...Fonts.grayColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          faucibus fringilla convallis elit, ipsum lacus. A eget malesuada id
          nisi.
        </Text>
      </View>
    );
  }

  function bookBriefInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.blackColor16Medium }}>Book Brief</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {durationChaptersAndPriceInfo({
            icon: (
              <MaterialIcons
                name="timelapse"
                size={16}
                color={Colors.primaryColor}
              />
            ),
            title: 'Duration',
            value: from
              ? '3hr • 10min'
              : item.timeToComplete
                ? item.timeToComplete
                : '3hr • 10min',
          })}

          {durationChaptersAndPriceInfo({
            icon: (
              <MaterialIcons name="tv" size={16} color={Colors.primaryColor} />
            ),
            title: 'Chapters',
            value: from ? '16' : item.chapters ? item.chapters : '16',
          })}
          {durationChaptersAndPriceInfo({
            icon: (
              <MaterialCommunityIcons
                name="currency-usd"
                size={16}
                color={Colors.primaryColor}
              />
            ),
            title: 'Price',
            value: !item.amount ? `$${defaultBook.amount}` : `$${item.amount}`,
          })}
        </View>
      </View>
    );
  }

  function durationChaptersAndPriceInfo({ icon, title, value }) {
    return (
      <View style={{ flexDirection: 'row', marginRight: Sizes.fixPadding * 3.0 }}>
        {icon}
        <View style={{ marginLeft: Sizes.fixPadding - 3.0 }}>
          <Text style={{ ...Fonts.grayColor12Regular }}>{title}</Text>
          <Text style={{ ...Fonts.blackColor12Medium }}>{value}</Text>
        </View>
      </View>
    );
  }

  function aboutChaptersAndReviews() {
    return (
      <View style={styles.aboutChaptersAndReviewsTabBarStyle}>
        {tabOptions({ optionTitle: 'About', index: 1 })}
        {tabOptions({ optionTitle: 'Chapters', index: 2 })}
        {tabOptions({ optionTitle: 'Review', index: 3 })}
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

  function bookInfo() {
    return (
      <View
        style={{ marginVertical: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
        <View style={styles.bookImageWrapStyle}>
          <Image
            source={item.bookImage}
            style={{
              width: 100.0,
              height: 130.0,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
          />
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Medium,
          }}>
          {!item.bookName ? defaultBook.bookName : item.bookName}
        </Text>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          {!item.bookAuthor ? defaultBook.bookAuthor : item.bookAuthor}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Sizes.fixPadding - 5.0,
          }}>
          <Text style={{ ...Fonts.yellowColor12Medium }}>
            {!item.rating ? defaultBook.rating : item.rating}
          </Text>
          <MaterialIcons
            name="star"
            color={Colors.yellowColor}
            size={14}
            style={{ marginHorizontal: Sizes.fixPadding - 8.0 }}
          />
          <Text style={{ ...Fonts.grayColor10Regular }}>
            {!item.rated ? defaultBook.rated : item.rated} rated
          </Text>
        </View>
        <Text style={{ ...Fonts.grayColor12Regular }}>
          Mystery Thriller and Suspense
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            name={inBookmark ? 'bookmark' : 'bookmark-outline'}
            color={Colors.blackColor}
            size={22}
            onPress={() => {
              setinBookmark(!inBookmark);
              setshowSnackBar(true);
            }}
          />
          <MaterialIcons
            name="share"
            color={Colors.blackColor}
            size={22}
            style={{ marginLeft: Sizes.fixPadding + 2.0 }}
          />
        </View>
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
  bookImageWrapStyle: {
    elevation: 15.0,
    width: 100.0,
    height: 130.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  aboutChaptersAndReviewsTabBarStyle: {
    backgroundColor: '#E6E6E6',
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 40.0,
    padding: Sizes.fixPadding - 8.0,
  },
  tabBarOptionsWrapStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
  },
  startListeningButtonStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3.0,
  },
  downloadButtonStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 2.0,
    borderColor: '#e0e0e0',
    borderWidth: 1.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.fixPadding * 2.0,
    ...commonStyles.shadow,
  },
  startListeningAndDownloadButtonWrapStyle: {
    position: 'absolute',
    left: 35.0,
    right: 35.0,
    bottom: 10.0,
    flexDirection: 'row',
  },
  ratingInfoWrapStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 82.0,
    paddingHorizontal: Sizes.fixPadding - 8.0,
  },
  snackBarStyle: {
    position: 'absolute',
    bottom: 51.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
    elevation: 0.0,
  },
  dialogWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    width: '85%',
    overflow: 'hidden',
    alignSelf: 'center'
  },
  dialogContentWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
  },
  dialogContinuButtonStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 4.0,
    paddingHorizontal: Sizes.fixPadding * 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 2.0,
  },
  dialogBookImageWrapStyle: {
    marginBottom: Sizes.fixPadding,
    width: 100.0,
    height: 130.0,
    elevation: 25.0,
  },
});

export default BookDetailScreen;
