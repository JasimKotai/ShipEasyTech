import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {TEXT_BLACK, TEXT_BLACK2, TEXT_LIGHT_BLACK} from '../assets/fontStyles';
import {useNavigation} from '@react-navigation/native';

const Width = Dimensions.get('window').width;
const QuickRecharge = ({navigation, refRBSheet2}) => {
  const [amount, setAmount] = useState('500');
  const toCouponScreen = () => {
    navigation.navigate('CouponsScreen', {refRBSheet2});
    refRBSheet2.current.close();
  };
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.7)'}
      />
      <View style={styles.parent}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../assets/images/wallet1.png')}
            style={{width: Width / 16, height: Width / 16, tintColor: 'green'}}
          />
          <Text style={styles.title}>Recharge Wallet</Text>
        </View>
        {/* add amount view */}
        <View style={{padding: 10, marginTop: 5}}>
          <Text style={{color: TEXT_BLACK2, fontFamily: 'Poppins-Regular'}}>
            Add Amount
          </Text>
          <View
            style={{
              backgroundColor: LIGHT_GREEN,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              // paddingVertical: 5,
              elevation: 2,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                flex: 0.15,
                textAlign: 'center',
                fontFamily: 'Rubik-Regular',
              }}>
              ₹
            </Text>
            <TextInput
              onChangeText={setAmount}
              value={amount}
              style={{
                backgroundColor: '#fff',
                flex: 0.7,
                paddingHorizontal: 10,
                paddingVertical: 6,
                color: '#404040',
              }}
              placeholderTextColor={TEXT_LIGHT_BLACK}
              keyboardType="number-pad"
              maxLength={7}
            />
            <TouchableOpacity
              onPress={() => {
                setAmount('500');
              }}
              style={{
                flex: 0.15,
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/images/close1.png')}
                style={{width: 14, height: 14}}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#737373',
              fontSize: 12,
              marginTop: 6,
            }}>
            Minimum recharge value is ₹500 and maximum recharge value is ₹50
            Lakhs
          </Text>
        </View>
        {/* add money buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <TouchableOpacity style={styles.addMoneyBtns}>
            <Image
              source={require('../assets/images/add.png')}
              style={styles.addMoneyBtnsImg}
            />
            <Text style={styles.addMoneyBtnsText}>₹100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addMoneyBtns}>
            <Image
              source={require('../assets/images/add.png')}
              style={styles.addMoneyBtnsImg}
            />
            <Text style={styles.addMoneyBtnsText}>₹500</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addMoneyBtns}>
            <Image
              source={require('../assets/images/add.png')}
              style={styles.addMoneyBtnsImg}
            />
            <Text style={styles.addMoneyBtnsText}>₹1000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addMoneyBtns}>
            <Image
              source={require('../assets/images/add.png')}
              style={styles.addMoneyBtnsImg}
            />
            <Text style={styles.addMoneyBtnsText}>₹5000</Text>
          </TouchableOpacity>
        </View>
        {/* coupon code view */}
        <View style={styles.couponCodeView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/coupon2.png')}
              style={{width: 30, height: 30}}
            />
            <Text
              style={{
                color: TEXT_BLACK2,
                marginLeft: 10,
              }}>
              Select Coupon Code
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              toCouponScreen();
            }}>
            <Text style={styles.ViewCouponBtnTxt}>View Coupons</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.addMoneyMainBtn}>
          <Text
            style={{
              color: '#ffff',
              fontFamily: 'Poppins-Regular',
            }}>
            Add Money
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default QuickRecharge;
const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flex: 1,
  },
  closeBtn: {
    width: Width / 10,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 17,
    color: TEXT_BLACK2,
    fontFamily: 'Rubik-SemiBold',
    marginLeft: 10,
  },
  addMoneyBtns: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    width: Width / 4.7,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 1,
  },
  addMoneyBtnsText: {
    color: '#404040',
    fontWeight: '600',
  },
  addMoneyBtnsImg: {width: 19, height: 18, resizeMode: 'contain'},
  couponCodeView: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  ViewCouponBtnTxt: {
    color: 'green',
    fontFamily: 'Onest-Bold',
  },
  addMoneyMainBtn: {
    backgroundColor: '#000',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 40,
  },
});
