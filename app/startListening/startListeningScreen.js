import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Slider } from '@miblanchard/react-native-slider';
import MyStatusBar from '../../components/myStatusBar';
import { TimerPickerModal } from 'react-native-timer-picker';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const chaptersList = [
  {
    id: '1',
    chapterNo: 1,
    chapterName: 'The Boy Who Lived',
    timeToComplete: '15:49 mins',
    storageConsume: '550 MB',
  },
  {
    id: '2',
    chapterNo: 2,
    chapterName: 'The Vanishing Glass',
    timeToComplete: '10:17 mins',
    storageConsume: '65 MB',
  },
  {
    id: '3',
    chapterNo: 3,
    chapterName: 'The Keeper of Keys',
    timeToComplete: '12:10 mins',
    storageConsume: '70 MB',
  },
  {
    id: '4',
    chapterNo: 4,
    chapterName: 'Diagon Alley',
    timeToComplete: '14:05 mins',
    storageConsume: '75 MB',
  },
  {
    id: '5',
    chapterNo: 5,
    chapterName: 'The Journey from Platform Nine and Three-Quarters',
    timeToComplete: '15:15 mins',
    storageConsume: '80 MB',
  },
  {
    id: '6',
    chapterNo: 6,
    chapterName: 'The Sorting Hat',
    timeToComplete: '12:10 mins',
    storageConsume: '70 MB',
  },
  {
    id: '7',
    chapterNo: 7,
    chapterName: 'The Potions Master',
    timeToComplete: '16:12 mins',
    storageConsume: '85 MB',
  },
  {
    id: '8',
    chapterNo: 8,
    chapterName: 'The Midnight Duel',
    timeToComplete: '17:10 mins',
    storageConsume: '89 MB',
  },
  {
    id: '9',
    chapterNo: 9,
    chapterName: "Hallowe'en",
    timeToComplete: '19:20 mins',
    storageConsume: '102 MB',
  },
  {
    id: '10',
    chapterNo: 10,
    chapterName: 'Quidditch',
    timeToComplete: '12:30 mins',
    storageConsume: '85 MB',
  },
  {
    id: '11',
    chapterNo: 11,
    chapterName: 'The Mirror of Erised',
    timeToComplete: '15:49 mins',
    storageConsume: '60 MB',
  },
  {
    id: '12',
    chapterNo: 12,
    chapterName: 'Nicolas Flamel',
    timeToComplete: '14:20 mins',
    storageConsume: '78 MB',
  },
  {
    id: '13',
    chapterNo: 13,
    chapterName: 'Norbert the Norwegian Ridgeback',
    timeToComplete: '17:10 mins',
    storageConsume: '89 MB',
  },
  {
    id: '14',
    chapterNo: 14,
    chapterName: 'The Forbidden Forest',
    timeToComplete: '17:10 mins',
    storageConsume: '40 MB',
  },
  {
    id: '15',
    chapterNo: 15,
    chapterName: 'Through the Trapdoor',
    timeToComplete: '09:15 mins',
    storageConsume: '35 MB',
  },
  {
    id: '16',
    chapterNo: 16,
    chapterName: 'The Man with Two Faces',
    timeToComplete: '10:30 mins',
    storageConsume: '39 MB',
  },
];

const StartListeningScreen = () => {

  const navigation = useNavigation();

  var { item } = useLocalSearchParams();
  item = JSON.parse(item);

  const defaultBook = {
    bookImage: require('../../assets/images/books/book9.png'),
    bookName: 'Harry Potter and The Philosopher’s Stone',
    bookAuthor: 'J.K Rowling',
    rating: '4.2',
    rated: 124,
    amount: '2.50',
  };

  const [audioRunningInPercentage, setaudioRunningInPercentage] = useState(0);
  const [chapters, setchapters] = useState(chaptersList);
  const [currentListeningChapter, setcurrentListeningChapter] = useState(
    chaptersList[0].chapterName,
  );
  const [currentListeningChapterNo, setcurrentListeningChapterNo] = useState(
    chaptersList[0].chapterNo,
  );
  const [isPlay, setisPlay] = useState(false);
  const [showSetVolumeBottomSheet, setshowSetVolumeBottomSheet] =
    useState(false);
  const [currentVolumeInPercantage, setcurrentVolumeInPercantage] =
    useState(100);
  const [currentVolumeBoostInPercentage, setcurrentVolumeBoostInPercentage] =
    useState(30);
  const [showTimePicker, setshowTimePicker] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {bookInfo()}
        {volumeAndTimeInfo()}
        {listeningOptions()}
        {currentChapterInfo()}
        {chaptersListInfo()}
      </View>
      {setVolumeBottomSheet()}
      {setTimer()}
    </View>
  );

  function setTimer() {
    return (
      <TimerPickerModal
        visible={showTimePicker}
        setIsVisible={setshowTimePicker}
        onConfirm={(pickedDuration) => {
          setshowTimePicker(false)
        }}
        onCancel={() => setshowTimePicker(false)}
        closeOnOverlayPress
        hideSeconds
        disableInfiniteScroll={true}
        styles={{
          theme: 'light',
          backgroundColor: Colors.whiteColor,
          cancelButton: {
            backgroundColor: '#eeeeee',
            ...Fonts.primaryColor18SemiBold,
            borderColor: 'transparent',
            borderRadius: Sizes.fixPadding - 5.0
          },
          confirmButton: {
            backgroundColor: Colors.primaryColor,
            ...Fonts.whiteColor18SemiBold,
            borderColor: 'transparent',
            borderRadius: Sizes.fixPadding - 5.0
          },
          pickerItem: { ...Fonts.primaryColor20Medium },
          pickerLabel: { ...Fonts.primaryColor16Medium },
          pickerContainer: { backgroundColor: Colors.whiteColor },
        }}
      />
    );
  }

  function setVolumeBottomSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSetVolumeBottomSheet}
        onRequestClose={() => { setshowSetVolumeBottomSheet(false) }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { setshowSetVolumeBottomSheet(false) }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
            >
              <View style={styles.setVolumeBottomSheetWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ ...Fonts.blackColor16Medium }}>
                    Adjust Volume & Volume Boost
                  </Text>
                  <MaterialIcons
                    name="close"
                    color={Colors.blackColor}
                    size={20}
                    onPress={() => setshowSetVolumeBottomSheet(false)}
                  />
                </View>
                <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons
                        name="volume-up"
                        color={Colors.blackColor}
                        size={20}
                      />
                      <Text
                        style={{
                          marginLeft: Sizes.fixPadding - 5.0,
                          ...Fonts.blackColor14Regular,
                        }}>
                        Volume
                      </Text>
                    </View>
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                      {parseInt(currentVolumeInPercantage, 0)}%
                    </Text>
                  </View>
                  <Slider
                    value={currentVolumeInPercantage}
                    onValueChange={value => setcurrentVolumeInPercantage(value)}
                    maximumValue={100}
                    minimumValue={0}
                    containerStyle={{ height: 15.0 }}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor="#E6E6E6"
                    thumbTintColor={Colors.primaryColor}
                    trackStyle={{ height: 2.0 }}
                    thumbStyle={{
                      height: 14,
                      width: 14,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialCommunityIcons
                        name="volume-vibrate"
                        color={Colors.blackColor}
                        size={20}
                      />
                      <Text
                        style={{
                          marginLeft: Sizes.fixPadding - 5.0,
                          ...Fonts.blackColor14Regular,
                        }}>
                        Volume Boost
                      </Text>
                    </View>
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                      {parseInt(currentVolumeBoostInPercentage, 0)}%
                    </Text>
                  </View>
                  <Slider
                    value={currentVolumeBoostInPercentage}
                    onValueChange={value => setcurrentVolumeBoostInPercentage(value)}
                    maximumValue={100}
                    minimumValue={0}
                    containerStyle={{ height: 15.0 }}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor="#E6E6E6"
                    thumbTintColor={Colors.primaryColor}
                    trackStyle={{ height: 2.0 }}
                    thumbStyle={{
                      height: 14,
                      width: 14,
                      backgroundColor: Colors.primaryColor,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function chaptersListInfo() {
    const renderItem = ({ item }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setcurrentListeningChapter(item.chapterName);
            setcurrentListeningChapterNo(item.chapterNo);
          }}
          style={{ flexDirection: 'row' }}>
          <Text style={{ ...Fonts.primaryColor14Regular }}>
            {item.chapterNo}.
          </Text>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  marginRight: Sizes.fixPadding,
                  ...(currentListeningChapter == item.chapterName
                    ? { ...Fonts.primaryColor14Regular }
                    : { ...Fonts.blackColor14Regular }),
                }}>
                {item.chapterName}
              </Text>
              <View style={styles.smallPlayPauseButtonWrapStyle}>
                <MaterialIcons
                  name={
                    currentListeningChapter == item.chapterName
                      ? 'pause'
                      : 'play-arrow'
                  }
                  color={Colors.whiteColor}
                  size={11}
                />
              </View>
            </View>
            <Text
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                marginRight: Sizes.fixPadding * 3.0,
                ...Fonts.grayColor12Regular,
              }}>
              {item.timeToComplete}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            height: 1.0,
            marginVertical: Sizes.fixPadding - 5.0,
          }}
        />
      </View>
    );
    return (
      <FlatList
        data={chapters}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          paddingBottom: Sizes.fixPadding,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function currentChapterInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{ maxWidth: screenWidth / 1.5, ...Fonts.blackColor14Regular }}>
          Chapter {currentListeningChapterNo}: {currentListeningChapter}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={Colors.primaryColor}
          style={{ marginLeft: Sizes.fixPadding }}
        />
      </View>
    );
  }

  function listeningOptions() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.listeningOptionsWrapStyle}>
          <MaterialIcons
            name="skip-previous"
            color={Colors.whiteColor}
            size={20}
          />
        </View>
        <View style={styles.listeningOptionsWrapStyle}>
          <MaterialIcons name="replay-10" color={Colors.whiteColor} size={20} />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setisPlay(!isPlay)}
          style={styles.playPauseIconWrapStyle}>
          <MaterialIcons
            name={isPlay ? 'pause' : 'play-arrow'}
            color={Colors.whiteColor}
            size={35}
          />
        </TouchableOpacity>
        <View style={styles.listeningOptionsWrapStyle}>
          <MaterialIcons
            name="forward-10"
            color={Colors.whiteColor}
            size={20}
          />
        </View>
        <View style={styles.listeningOptionsWrapStyle}>
          <MaterialIcons name="skip-next" color={Colors.whiteColor} size={20} />
        </View>
      </View>
    );
  }

  function volumeAndTimeInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MaterialIcons
            name="volume-up"
            color={Colors.blackColor}
            size={22}
            onPress={() => setshowSetVolumeBottomSheet(true)}
          />
          <MaterialIcons
            name="snooze"
            size={22}
            color={Colors.blackColor}
            onPress={() => setshowTimePicker(true)}
          />
        </View>
        <View
          style={{
            marginVertical: Sizes.fixPadding - 5.0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...Fonts.grayColor12Regular }}>00:01</Text>
          <Text style={{ ...Fonts.grayColor12Regular }}>-15:48</Text>
        </View>
        <Slider
          value={audioRunningInPercentage}
          onValueChange={value => setaudioRunningInPercentage(value)}
          maximumValue={100}
          minimumValue={0}
          containerStyle={{ height: 12.0 }}
          minimumTrackTintColor={Colors.primaryColor}
          maximumTrackTintColor="#E6E6E6"
          thumbTintColor={Colors.primaryColor}
          trackStyle={{ height: 2.0, }}
          thumbStyle={{
            height: 14,
            width: 14,
            backgroundColor: Colors.primaryColor,
          }}
        />
      </View>
    );
  }

  function bookInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.bookImageWrapStyle}>
          <Image
            source={item.bookImage}
            style={{
              width: 160.0,
              height: 208.0,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
          />
        </View>
        <Text style={{ ...Fonts.blackColor16Medium }}>
          {item.bookName ? item.bookName : defaultBook.bookName}
        </Text>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          {item.bookAuthor ? item.bookAuthor : defaultBook.bookAuthor}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16Regular,
          }}>
          Chapter {currentListeningChapterNo}: {currentListeningChapter}
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
          style={{ alignSelf: 'flex-start' }}
        />
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
  setVolumeBottomSheetWrapper: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
  },
  bookImageWrapStyle: {
    width: 160.0,
    height: 208.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 15.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
  listeningOptionsWrapStyle: {
    backgroundColor: Colors.primaryColor,
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding,
  },
  playPauseIconWrapStyle: {
    width: 45.0,
    height: 45.0,
    borderRadius: 22.5,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding,
  },
  smallPlayPauseButtonWrapStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartListeningScreen;
