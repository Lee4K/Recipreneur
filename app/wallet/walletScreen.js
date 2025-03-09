import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
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

const recentTransactionsList = [
  {
    id: '1',
    transactionTitle: 'Harry Potter and The Philosopher’s Stone',
    receiverOrSender: 'J.K Rowling',
    amount: '$2.50',
    transactionDate: '20 Jan 2020',
  },
  {
    id: '2',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'Bank of Baroda',
    amount: '$2.50',
    transactionDate: '16 Jan 2020',
    isReceive: true,
  },
  {
    id: '3',
    transactionTitle: 'War and Peace',
    receiverOrSender: 'Leo Toistoy',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
  },
  {
    id: '4',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'By Google Pay',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
    isReceive: true,
  },
  {
    id: '5',
    transactionTitle: 'Last Breath',
    receiverOrSender: 'Durjoy Datta',
    amount: '$2.50',
    transactionDate: '10 Jan 2020',
  },
  {
    id: '6',
    transactionTitle: 'Harry Potter and The Philosopher’s Stone',
    receiverOrSender: 'J.K Rowling',
    amount: '$2.50',
    transactionDate: '20 Jan 2020',
  },
  {
    id: '7',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'Bank of Baroda',
    amount: '$2.50',
    transactionDate: '16 Jan 2020',
    isReceive: true,
  },
  {
    id: '8',
    transactionTitle: 'War and Peace',
    receiverOrSender: 'Leo Toistoy',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
  },
  {
    id: '9',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'By Google Pay',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
    isReceive: true,
  },
  {
    id: '10',
    transactionTitle: 'Last Breath',
    receiverOrSender: 'Durjoy Datta',
    amount: '$2.50',
    transactionDate: '10 Jan 2020',
  },
  {
    id: '11',
    transactionTitle: 'Harry Potter and The Philosopher’s Stone',
    receiverOrSender: 'J.K Rowling',
    amount: '$2.50',
    transactionDate: '20 Jan 2020',
  },
  {
    id: '12',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'Bank of Baroda',
    amount: '$2.50',
    transactionDate: '16 Jan 2020',
    isReceive: true,
  },
  {
    id: '13',
    transactionTitle: 'War and Peace',
    receiverOrSender: 'Leo Toistoy',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
  },
  {
    id: '14',
    transactionTitle: 'Money Added to Wallet',
    receiverOrSender: 'By Google Pay',
    amount: '$2.50',
    transactionDate: '15 Jan 2020',
    isReceive: true,
  },
  {
    id: '15',
    transactionTitle: 'Last Breath',
    receiverOrSender: 'Durjoy Datta',
    amount: '$2.50',
    transactionDate: '10 Jan 2020',
  },
];

const WalletScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {balanceAndAddMoney()}
        {recentTransactions()}
      </View>
    </View>
  );

  function recentTransactions() {
    const renderItem = ({ item }) => (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                maxWidth: screenWidth - 140.0,
                ...Fonts.blackColor14Regular,
              }}>
              {item.transactionTitle}
            </Text>
            <Text
              style={{
                marginTop: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor12Regular,
              }}>
              {item.receiverOrSender}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={
                item.isReceive
                  ? { ...Fonts.greenColor14Regular }
                  : { ...Fonts.redColor14Regular }
              }>
              {item.amount}
            </Text>
            <Text
              style={{
                marginTop: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor12Regular,
              }}>
              {item.transactionDate}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.grayColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding - 3.0,
          }}
        />
      </View>
    );
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                marginBottom: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor16Medium,
              }}>
              Recent Transactions
            </Text>
          }
          data={recentTransactionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function balanceAndAddMoney() {
    return (
      <View style={styles.balanceAndAddMoneyWrapStyle}>
        <View style={{ marginRight: Sizes.fixPadding * 4.0 }}>
          <Text style={{ ...Fonts.blackColor16Regular }}>Available Balance</Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.primaryColor22Regular,
            }}>
            $15.50
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.push('addMoney/addMoneyScreen')}
          style={styles.addMoneyButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18SemiBold }}>Add Money</Text>
        </TouchableOpacity>
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
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Medium,
          }}>
          Wallet
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
  addMoneyButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    flex: 1,
  },
  balanceAndAddMoneyWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
});

export default WalletScreen;