import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Test from '../components/Test';
import Header from '../components/Header';
import {GREEN_COLOR} from '../assets/Colors';
import Wallet from '../components/Wallet';
import Passbook from '../components/Passbook';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';

const WalletAndPassbook = ({navigation, route}) => {
  const [appliedCoupon, setAppliedCoupon] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.appliedCoupon) {
        // console.log('WalletANDPass : ', route.params?.appliedCoupon);
        setAppliedCoupon(route.params?.appliedCoupon);
      }
    }, [route]),
  );

  const [switchScreen, setSwitchScreen] = useState('Wallet');
  const layout = useWindowDimensions();

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'first':
        return <Wallet jumpTo={jumpTo} appliedCoupon={appliedCoupon} />;
      case 'second':
        return <Passbook jumpTo={jumpTo} />;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Wallet'},
    {key: 'second', title: 'Passbook'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: GREEN_COLOR}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{color: '#404040'}}
    />
  );

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
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      {/* Wallet and Passbook buttons */}
      {/* <View style={styles.walletAndPassbookView}>
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
      </View> */}
    </View>
  );
};

export default WalletAndPassbook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  walletAndPassbookView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    padding: 5,
    elevation: 1,
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
    elevation: 1,
  },
  WalletBtnText: {
    color: '#404040',
    // fontFamily: 'Roboto-Bold',
    fontFamily: 'Poppins-SemiBold',
  },
});
