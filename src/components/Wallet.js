import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR} from '../assets/Colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';

const Width = Dimensions.get('window').width;

const Wallet = ({route, appliedCoupon}) => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('500');
  const {user, customer} = useSelector(state => state.userSlice);

  const [coupon, setCoupon] = useState();
  // console.log('COUPON : ', coupon);

  useFocusEffect(
    React.useCallback(() => {
      if (appliedCoupon) {
        setCoupon(appliedCoupon);
      }
    }, [appliedCoupon]),
  );

  // console.log('Wallet screen ', user);
  // console.log(user.name);
  // const newAmount = Number(amount) + 5000;

  const handleRazorPay = async () => {
    const options = {
      description: 'Credits towards consultation',
      // image: require('../assets/images/logo1.png'),
      currency: 'INR',
      key: 'rzp_test_v25tyhnZrSNdeo',
      amount: Number(amount) * 100,
      name: user.company_name,
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: user.email,
        contact: user.phone,
        name: user.name,
      },
      theme: {color: '#ff0000'},
    };

    try {
      const data = await RazorpayCheckout.open(options);
      // Handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    } catch (error) {
      // Handle failure
      console.log('razor pay error ; ', error);
      alert(`Error: ${error.code} | ${error.description}`);
    }
  };

  // const [dataFromBanana, setDataFromBanana] = useState('');

  // useEffect(() => {
  //   // Handle data received from BananaScreen
  //   if (dataFromBanana) {
  //     console.log('Data received from BananaScreen:', dataFromBanana);
  //   }
  // }, [dataFromBanana]);

  const navigateToCouponsScreen = () => {
    navigation.navigate('CouponsScreen');
  };
  return (
    <View style={styles.container}>
      {/* Wallet balance and Amount Hold  */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.child1}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-around',
            }}>
            <View style={styles.WalletBallanceView}>
              <Text style={styles.WalletBallance}>Wallet Balance</Text>
              <Text
                numberOfLines={2}
                style={{color: '#000', fontWeight: 'bold'}}>
                ₹0.00
              </Text>
            </View>
            <View style={styles.WalletBallanceView}>
              <Text style={styles.WalletBallance}>Amount on Hold</Text>
              <Text
                numberOfLines={2}
                style={{color: '#000', fontWeight: 'bold'}}>
                ₹0.00
              </Text>
            </View>
          </View>
          {/* horizontal line */}
          <View
            style={{
              borderBottomWidth: 1,
              marginHorizontal: 10,
              borderColor: '#cccccc',
              marginBottom: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TransactionHistory');
            }}
            style={{
              width: '60%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: GREEN_COLOR,
                textAlign: 'center',
                // fontFamily: 'Roboto-Bold',
                fontFamily: 'Poppins-SemiBold',
              }}>
              View Transaction History
            </Text>
          </TouchableOpacity>
        </View>
        {/* add amount parent view */}
        <View style={styles.child1}>
          <Text style={styles.AddAmountText}>Add Amount</Text>
          <View style={styles.AddAmountChildView}>
            <Text style={styles.RupeesText}>₹</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.amountInput}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              onPress={() => {
                setAmount('500');
              }}
              style={styles.amountResetBTN}>
              <Image
                source={require('../assets/images/close1.png')}
                style={{width: 20, height: 15, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          {/* 100 500 1000 5000 buttons View*/}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            {/* add 100 button  */}
            <TouchableOpacity
              onPress={() => {
                const newAmount = Number(amount) + 100;
                setAmount(String(newAmount));
              }}
              style={styles.add100Btn}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.add100BtnImg}
              />
              <Text style={styles.add100BtnText}>100</Text>
            </TouchableOpacity>
            {/* add 500 button  */}
            <TouchableOpacity
              onPress={() => {
                const newAmount = Number(amount) + 500;
                setAmount(String(newAmount));
              }}
              style={styles.add100Btn}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.add100BtnImg}
              />
              <Text style={styles.add100BtnText}>500</Text>
            </TouchableOpacity>
            {/* add 1000 button  */}
            <TouchableOpacity
              onPress={() => {
                const newAmount = Number(amount) + 1000;
                setAmount(String(newAmount));
              }}
              style={styles.add100Btn}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.add100BtnImg}
              />
              <Text style={styles.add100BtnText}>1000</Text>
            </TouchableOpacity>
            {/* add 5000 button  */}
            <TouchableOpacity
              onPress={() => {
                const newAmount = Number(amount) + 5000;
                setAmount(String(newAmount));
              }}
              style={styles.add100Btn}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.add100BtnImg}
              />
              <Text style={styles.add100BtnText}>5000</Text>
            </TouchableOpacity>
          </View>
          {/* coupons view */}
          <>
            {coupon ? (
              <View
                style={[
                  styles.couponView,
                  // {backgroundColor: EXTRA_LIGHT_GREEN},
                ]}>
                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'blueviolet',
                  }}>
                  <Image
                    source={require('../assets/images/coupon2.png')}
                    style={{width: Width / 10, height: Width / 10}}
                  />
                </View>
                <View
                  style={{
                    flex: 0.6,
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    Coupon{' '}
                    <Text style={{color: GREEN_COLOR}}>
                      {coupon.type} {coupon.value}
                    </Text>{' '}
                    applied!
                  </Text>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    {coupon.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setCoupon();
                  }}
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    // backgroundColor: '#fff',
                    // elevation: 1,
                    paddingVertical: 4,
                  }}>
                  <Text
                    style={{color: GREEN_COLOR, fontFamily: 'Poppins-Regular'}}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.couponView}>
                <Image
                  source={require('../assets/images/coupon2.png')}
                  style={{width: 25, height: 25}}
                />
                <Text style={{color: '#666666', fontFamily: 'Roboto-Bold'}}>
                  Select Coupon Code
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigateToCouponsScreen();
                  }}>
                  <Text style={{color: GREEN_COLOR, fontFamily: 'Roboto-Bold'}}>
                    View Coupons
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>

          {/* Add Money button */}
          <TouchableOpacity
            onPress={() => {
              handleRazorPay();
            }}
            style={styles.addMoneyBtn}>
            <Text style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
              Add Money
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  child1: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 20,
    marginTop: 15,
  },
  WalletBallanceView: {
    flex: 0.45,
    alignItems: 'center',
  },
  WalletBallance: {
    fontFamily: 'Roboto-Bold',
    color: '#404040',
  },
  AddAmountText: {
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  AddAmountChildView: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  RupeesText: {
    flex: 0.15,
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  amountInput: {
    flex: 0.7,
    padding: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    color: '#000',
  },
  amountResetBTN: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add100Btn: {
    flexDirection: 'row',
    elevation: 1,
    backgroundColor: '#f2f2f2',
    flex: 0.23,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    borderRadius: 5,
  },
  add100BtnText: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  add100BtnImg: {
    width: 18,
    height: 16,
    // tintColor: GREEN_COLOR,
    resizeMode: 'cover',
  },
  addMoneyBtn: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: Width / 1.5,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  couponView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 7,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    elevation: 1,
  },
  // selectedCouponView: {
  //   marginTop: 20,
  //   paddingVertical: 7,
  //   backgroundColor: '#f2f2f2',
  //   borderRadius: 5,
  // },
});
