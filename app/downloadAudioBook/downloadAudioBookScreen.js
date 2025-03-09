import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

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
    chapterName: 'The Journey from Platform Nine and Th...',
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

const DownloadAudioBookScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {chapters()}
      </View>
    </View>
  );

  function chapters() {
    const renderItem = ({ item }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="download" size={15} color={Colors.primaryColor} />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text
              numberOfLines={1}
              style={{
                marginRight: Sizes.fixPadding,
                ...Fonts.blackColor14Regular,
              }}>
              Chapter {item.chapterNo}: {item.chapterName}
            </Text>
            <View
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginRight: Sizes.fixPadding * 3.0,
                  ...Fonts.grayColor12Regular,
                }}>
                {item.timeToComplete}
              </Text>
              <Text style={{ ...Fonts.primaryColor12Regular }}>
                {item.storageConsume}
              </Text>
            </View>
          </View>
        </View>
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
        ListHeaderComponent={
          <>
            {infoAboutDownload()}
            {downloadAllChapters()}
          </>
        }
        data={chaptersList}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          paddingBottom: Sizes.fixPadding,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function downloadAllChapters() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="download" size={15} color={Colors.primaryColor} />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor14Regular }}>All Chapters</Text>
            <View
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginRight: Sizes.fixPadding * 3.0,
                  ...Fonts.grayColor12Regular,
                }}>
                3h 10mins
              </Text>
              <Text style={{ ...Fonts.primaryColor12Regular }}>550 MB</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            height: 1.0,
            marginVertical: Sizes.fixPadding - 5.0,
          }}
        />
      </View>
    );
  }

  function infoAboutDownload() {
    return (
      <Text
        style={{
          marginBottom: Sizes.fixPadding,
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor14Regular,
        }}>
        Select chapters of the audiobook that you want to download.
      </Text>
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
          Download Audiobook
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
});

export default DownloadAudioBookScreen;
