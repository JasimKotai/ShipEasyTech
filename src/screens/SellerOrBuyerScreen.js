import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {GREEN_COLOR, PRIMARY_COLOR} from '../assets/Colors';

const SellerOrBuyerScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [check, setCheck] = useState('Seller');
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#e6ffef'} />
      <View style={styles.Parent}>
        {/* logo view */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: width / 2,
            // backgroundColor: 'blue',
          }}>
          {/* logo image */}
          <Image
            source={require('../assets/images/logo1.png')}
            style={{
              width: width / 1.5,
              height: 100,
              resizeMode: 'contain',
              //   backgroundColor: 'red',
            }}
          />
        </View>
        {/* user options for select seller or buyer  */}
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#FFFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          {/* scrollview used for small devices */}

          <View style={styles.child}>
            <View
              style={{
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Text style={styles.TextStyle}>Choose the Option That</Text>
              <Text style={styles.TextStyle}>Best Describes You</Text>
            </View>
            <View style={styles.SelectOptionView}>
              {/* Seller Buttons start */}
              <TouchableOpacity
                onPress={() => {
                  setCheck('Seller');
                }}>
                <View
                  style={[
                    styles.SellerBtn,
                    check == 'Seller'
                      ? {borderWidth: 1, borderColor: GREEN_COLOR}
                      : {borderWidth: 1, borderColor: 'transparent'},
                  ]}>
                  {check == 'Seller' ? (
                    <Image
                      source={require('../assets/images/check.png')}
                      style={{
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        top: -10,
                        right: -10,
                      }}
                    />
                  ) : null}

                  <View style={{flex: 0.2, alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/seller.png')}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{flex: 0.7, padding: 10}}>
                    <Text
                      style={[
                        styles.sellerBtnText,
                        {fontSize: 16, fontFamily: 'Poppins-Bold'},
                      ]}>
                      I am Seller
                    </Text>
                    <Text style={styles.sellerBtnText}>
                      I sell my products online or offline and want to ship them
                      using ShipEasy.Tech
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Seller Buttons end */}
              {/* Buyer button start */}
              <TouchableOpacity
                onPress={() => {
                  setCheck('Buyer');
                }}>
                <View
                  style={[
                    styles.SellerBtn,
                    check == 'Buyer'
                      ? {borderWidth: 1, borderColor: GREEN_COLOR}
                      : {borderWidth: 1, borderColor: 'transparent'},
                  ]}>
                  {check == 'Buyer' ? (
                    <Image
                      source={require('../assets/images/check.png')}
                      style={{
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        top: -10,
                        right: -10,
                      }}
                    />
                  ) : null}
                  <View style={{flex: 0.2, alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/buyer.png')}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{flex: 0.7, padding: 10}}>
                    <Text
                      style={[
                        styles.sellerBtnText,
                        {fontSize: 16, fontFamily: 'Poppins-Bold'},
                      ]}>
                      I am Buyer
                    </Text>
                    <Text style={styles.sellerBtnText}>
                      I'm here to track an order I recently placed with an
                      eCommerce store.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Buyer button end */}

              {/* proceed as seller/buyer button */}
              <View
                style={{flex: 1, marginHorizontal: 20, marginTop: height / 30}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUpScreen');
                  }}
                  style={styles.ProceedBtn}>
                  <Text style={styles.ProceedBtnText}>Proceed as {check}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: height / 50,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#808080',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignInScreen');
                  }}>
                  <Text style={styles.signInBtn}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SellerOrBuyerScreen;
const width = Dimensions.get('window').width;
const aa = width / 30;
// console.log('wisth', aa);

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  Parent: {
    flex: 1,
    backgroundColor: '#ccffdf',
  },
  child: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  TextStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  SelectOptionView: {
    flex: 1,
    backgroundColor: '#FFFF',
    // paddingHorizontal: 20,
  },
  SellerBtn: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'green',
    borderRadius: 10,
    paddingVertical: width / 30,
    marginBottom: width / 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  sellerBtnText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  ProceedBtn: {
    paddingVertical: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  ProceedBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  signInBtn: {
    color: GREEN_COLOR,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginLeft: 5,
  },
});
