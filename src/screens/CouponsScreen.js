import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  BackHandler,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const CouponsScreen = ({navigation, route}) => {
  const [enterCouponCode, setEnterCouponCode] = useState('');
  // const {refRBSheet2} = route.params;
  // const [coupon, setCoupon] = useState('');

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBack,
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  const handleCouponApply = item => {
    navigation.navigate('WalletAndPassbook', {appliedCoupon: item});
    // console.log('coupon screen - back pressed ');
    // return false;
  };

  const coupons = [
    {
      id: '1',
      type: 'flat',
      value: 250,
      description: 'Get Rs. 250 cashback on a minimum recharge of Rs. 500',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 1,
      conditions: 'This coupon can be applied for a maximum of 1 time.',
    },
    {
      id: '2',
      type: 'flat',
      value: 600,
      description: 'Get Rs. 600 cashback on a minimum recharge of Rs. 600',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 1,
      conditions: 'This coupon can be applied for a maximum of 1 time.',
    },
    {
      id: '3',
      type: 'percentage',
      value: 20,
      description: 'Get 20% cashback on a minimum recharge of Rs. 1000',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 2,
      conditions: 'This coupon can be applied for a maximum of 2 times.',
    },
    {
      id: '4',
      type: 'flat',
      value: 500,
      description: 'Get Rs. 500 cashback on a minimum recharge of Rs. 800',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 1,
      conditions: 'This coupon can be applied for a maximum of 1 time.',
    },
    {
      id: '5',
      type: 'percentage',
      value: 20,
      description: 'Get 20% cashback on a minimum recharge of Rs. 1000',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 2,
      conditions: 'This coupon can be applied for a maximum of 2 times.',
    },
    {
      id: '10',
      type: 'flat',
      value: 500,
      description: 'Get Rs. 500 cashback on a minimum recharge of Rs. 800',
      expiryDate: '2024-01-01T23:59:59',
      maxUsage: 1,
      conditions: 'This coupon can be applied for a maximum of 1 time.',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="View Offers"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* search bar */}
      <View style={styles.searchBarView}>
        <TextInput
          placeholder="Enter Coupon Code"
          style={styles.searchBar}
          placeholderTextColor={'#808080'}
          value={enterCouponCode}
          onChangeText={setEnterCouponCode}
        />
        {enterCouponCode.length > 0 && (
          <TouchableOpacity style={styles.ApplyBtn}>
            <Text style={styles.ApplyBtnTxt}>Apply</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* render coupon */}
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={coupons}
          showsVerticalScrollIndicator={false}
          // alwaysBounceVertical={false}
          contentContainerStyle={{paddingBottom: 30}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  marginHorizontal: 5,
                  borderRadius: 5,
                  elevation: 1,
                  padding: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 9,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      elevation: 1,
                    }}>
                    <Text
                      style={{color: '#404040', fontFamily: 'Onest-Regular'}}>
                      {item.type} {item.value}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleCouponApply(item);
                    }}
                    style={{
                      backgroundColor: LIGHT_GREEN,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 15,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{color: '#404040', fontFamily: 'Poppins-Regular'}}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#fff', marginTop: 10}}>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Onest-Regular',
                      // fontWeight: '500',
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Onest-Regular',
                    }}>
                    Coupon Expires On {item.expiryDate}
                  </Text>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Onest-Regular',
                    }}>
                    maxUsage : {item.maxUsage}
                  </Text>
                </View>
                {/* T&C button */}
                {/* <TouchableOpacity>
                  <Text
                    style={{
                      color: GREEN_COLOR,
                      fontFamily: 'Onest-Regular',
                      fontWeight: '500',
                    }}>
                    T&C{' '}
                  </Text>
                </TouchableOpacity> */}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CouponsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarView: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    paddingVertical: 1,
    paddingHorizontal: 1,
    elevation: 2,
    shadowColor: GREEN_COLOR,
    // borderWidth: 1,
    borderColor: 'aliceblue',
  },
  searchBar: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 4,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    color: '#404040',
    fontSize: 13,
    fontWeight: '500',
  },
  ApplyBtn: {
    flex: 0.3,
    // backgroundColor: 'blueviolet',
    // backgroundColor: '#404040',
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  ApplyBtnTxt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
  },
});
