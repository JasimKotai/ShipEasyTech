import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Test from '../components/Test';
import Header from '../components/Header';
import {GREEN_COLOR} from '../assets/Colors';
import Wallet from '../components/Wallet';
import Passbook from '../components/Passbook';

const WalletAndPassbook = ({navigation}) => {
  const [switchScreen, setSwitchScreen] = useState('Wallet');
  return (
    <View style={styles.container}>
      {/* <Test /> */}
      <Header
        title="Wallet & Passbook"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#e6ffef" />
      {/* Wallet and Passbook buttons */}
      <View style={styles.walletAndPassbookView}>
        <TouchableOpacity
          onPress={() => {
            setSwitchScreen('Wallet');
          }}
          style={[
            styles.WalletBtn,
            {
              backgroundColor:
                switchScreen === 'Wallet' ? '#000000' : '#f2f2f2',
            },
          ]}>
          <Text
            style={[
              styles.WalletBtnText,
              {color: switchScreen === 'Wallet' ? '#FFF' : '#000'},
            ]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSwitchScreen('Passbook');
          }}
          style={[
            styles.WalletBtn,
            {
              backgroundColor:
                switchScreen === 'Passbook' ? '#000000' : '#f2f2f2',
            },
          ]}>
          <Text
            style={[
              styles.WalletBtnText,
              {color: switchScreen === 'Passbook' ? '#FFF' : '#000'},
            ]}>
            Passbook
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {switchScreen === 'Wallet' ? <Wallet /> : <Passbook />}
      </View>
    </View>
  );
};

export default WalletAndPassbook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  walletAndPassbookView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    padding: 5,
    elevation: 5,
    backgroundColor: '#ffffff',
    marginVertical: 3,
  },
  WalletBtn: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    elevation: 2,
  },
  WalletBtnText: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});
