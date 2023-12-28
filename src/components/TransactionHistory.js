import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import Header from './Header';
import {TabView} from 'react-native-tab-view';
import {GREEN_COLOR} from '../assets/Colors';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const WalletHistory = () => (
  <View style={{flex: 1, backgroundColor: '#ffff'}}>
    <View style={styles.walletParent}>
      <View style={styles.transactionIconView}>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            borderRadius: Width,
            elevation: 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: GREEN_COLOR,
          }}>
          <Image
            source={require('../assets/images/transaction.png')}
            style={{width: Width / 10, height: Width / 10}}
          />
        </View>
      </View>
      <View style={styles.walletChild1}>
        <View style={styles.totalCreditView}>
          <Text style={styles.totalCreditTxt}>Total Credited</Text>
          <Text style={styles.RupeesTxt}>₹ 0.00</Text>
        </View>
        <View style={styles.totalCreditView}>
          <Text style={styles.totalCreditTxt}>Total Debited</Text>
          <Text style={styles.RupeesTxt}>₹ 0.00</Text>
        </View>
      </View>
    </View>
  </View>
);

const RechargeHistory = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}}></View>
);
const renderScene = ({route, jumpTo}) => {
  switch (route.key) {
    case 'first':
      return <WalletHistory jumpTo={jumpTo} />;
    case 'second':
      return <RechargeHistory jumpTo={jumpTo} />;
  }
};
const TransactionHistory = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Wallet History'},
    {key: 'second', title: 'Recharge History'},
  ]);
  return (
    <>
      {/* <StatusBar translucent={false} /> */}
      <Header
        title="All History"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        //   renderTabBar={}
        />
      </View>
    </>
  );
};

export default TransactionHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  //   wallet history style
  walletParent: {
    padding: 10,
    // backgroundColor: '#fff',
    // elevation: 1,
    margin: 10,
    borderRadius: 10,
    shadowColor: GREEN_COLOR,
  },
  transactionIconView: {
    width: Width / 4.2,
    height: Width / 4.2,
    backgroundColor: '#f2f2f2',
    elevation: 5,
    borderRadius: Width,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    padding: 8,
    shadowColor: GREEN_COLOR,
  },
  walletChild1: {
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: Width / 8,
  },
  totalCreditView: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  totalCreditTxt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
  },
  RupeesTxt: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
  },
});
