import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from './Header';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {BASE_URL_LIVE} from '../config/api';
import {useSelector} from 'react-redux';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const CalculatorScreen = ({navigation}) => {
  const [calculatedPrice, setCalculatedPrice] = useState('0');
  const [loading, setLoading] = useState(false);

  const {user, customer} = useSelector(state => state.userSlice);
  // console.log('---=====---', user.id);

  const [calculatePrice, setCalculatePrice] = useState({
    orderType: '',
    shippingPartner: '',
    Length: '',
    Width: '',
    Height: '',
    Weight: '',
    pickupPin: '',
    destinationPin: '',
    user_id: user.id,
  });
  // console.log('-', calculatePrice);
  // console.log(calculatePrice.orderType);
  // console.log(calculatePrice.shippingPartner);
  // console.log(calculatePrice.Length);
  // console.log(calculatePrice.Width);
  // console.log(calculatePrice.Height);
  // console.log(calculatePrice.pickupPin);
  // console.log(calculatePrice.destinationPin);

  const [checkvaliation, setCheckvaliation] = useState({
    orderType: null,
    shippingPartner: null,
    Length: null,
    Width: null,
    Height: null,
    Weight: null,
    pickupPin: null,
    destinationPin: null,
  });
  // console.log(checkvaliation);

  const handleCalculatedPrice = async () => {
    if (
      checkvaliation.orderType === false &&
      checkvaliation.shippingPartner === false &&
      checkvaliation.Length === false &&
      checkvaliation.Width === false &&
      checkvaliation.Height === false &&
      checkvaliation.Weight === false &&
      checkvaliation.pickupPin === false &&
      checkvaliation.destinationPin === false
    ) {
      // console.log('api call --');
      try {
        setLoading(true);

        const response = await axios.get(
          // 'https://shipeasy.tech/app/public/api/rate/calculator',
          'http://192.168.1.14/shipeasy-prod/public/api/rate/calculator',
          {
            headers: {
              'Content-Type': 'application/javascript',
              Authorization:
                // 'Bearer 19|Wt2nzzdbewfScK9kjd4gRVfBEJecTzv9uTxqN9FO845b73cc',
                'Bearer 26|dj7L79xgARanbeDidtOwNLATIVvbTS7Vym8qL1xs2dcd5152',
            },

            params: calculatePrice,
            // params: {
            //   orderType: 'COD',
            //   shippingPartner: 'XpressBees',
            //   Length: 10,
            //   Width: 66,
            //   Height: 100,
            //   Weight: 200,
            //   pickupPin: 700027,
            //   destinationPin: 232326,
            //   user_id: 27,
            // },
          },
        );
        console.log('------', response.data);
        if (response.data.success !== true) {
          Alert.alert('Message !', response.data.message);
        }
        setLoading(false);
        setCalculatedPrice(response.data.price);
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Something Wrong');
        setLoading(false);
        console.log('handle Calculated Price Err :', error);
      }
    } else {
      handleValidation();
      console.log('validation call --');
    }
  };

  const handleValidation = () => {
    const validateField = (field, minLength = 1) => {
      if (
        calculatePrice[field].length < minLength ||
        calculatePrice[field] === '0' ||
        calculatePrice[field] === '.'
      ) {
        setCheckvaliation(prevValidation => ({
          ...prevValidation,
          [field]: true,
        }));
      } else {
        setCheckvaliation(prevValidation => ({
          ...prevValidation,
          [field]: false,
        }));
      }
    };

    validateField('shippingPartner', 1);
    validateField('orderType', 1);
    validateField('Length');
    validateField('Width');
    validateField('Height');
    validateField('Weight');
    validateField('pickupPin', 6);
    validateField('destinationPin', 6);
  };

  const shippingPartners = [
    {
      value: 'EcomExpress',
      label: 'Ecom Express',
    },
    {
      value: 'XpressBees',
      label: 'Xpress Bees',
    },
  ];

  const orderType = [
    {
      value: 'COD',
      label: 'COD',
    },
    {
      value: 'PPD',
      label: 'PPD',
    },
  ];

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={EXTRA_LIGHT_GREEN}
      />
      <View style={styles.container}>
        <Header
          // title="Shipping Rate Calculator"
          title="Calculator"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          style={{flex: 1}}>
          {/* loading view */}
          {loading && (
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                position: 'absolute',
                zIndex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={GREEN_COLOR} />
            </View>
          )}

          <Text style={styles.title}>Shipping Rate Calculator</Text>
          <View style={styles.parent}>
            <View style={{marginTop: 10}}>
              <Text style={styles.smallTxt}>Shipping Partner</Text>
              <Dropdown
                style={styles.shippingDropDown}
                iconStyle={styles.DropdownIcon}
                data={shippingPartners}
                containerStyle={{marginTop: 5, borderRadius: 5}}
                activeColor="#e6ffef"
                itemContainerStyle={{}}
                itemTextStyle={{color: '#404040'}}
                maxHeight={180}
                showsVerticalScrollIndicator={false}
                selectedTextStyle={{color: '#404040'}}
                labelField="label"
                valueField="value"
                placeholder={'SELECT'}
                placeholderStyle={styles.DropdownPlaceHolder}
                searchPlaceholder="Search..."
                value={calculatePrice?.shippingPartner || ''}
                onChange={item => {
                  setCalculatePrice(prevState => ({
                    ...prevState,
                    shippingPartner: item.value,
                  }));
                  setCheckvaliation(prevValidation => ({
                    ...prevValidation,
                    shippingPartner: false,
                  }));
                }}
              />
              <Text style={styles.validationtxt}>
                {checkvaliation.shippingPartner
                  ? "Shipping Partner can't be empty"
                  : null}
              </Text>
            </View>
            {/* order type  */}
            <View style={{marginTop: 10}}>
              <Text style={styles.smallTxt}>Order Type</Text>
              <Dropdown
                style={styles.shippingDropDown}
                iconStyle={styles.DropdownIcon}
                data={orderType}
                containerStyle={{marginTop: 5, borderRadius: 5}}
                activeColor="#e6ffef"
                itemContainerStyle={{}}
                itemTextStyle={{color: '#404040'}}
                selectedTextStyle={{color: '#404040'}}
                maxHeight={180}
                showsVerticalScrollIndicator={false}
                labelField="label"
                valueField="value"
                placeholder={'SELECT'}
                placeholderStyle={styles.DropdownPlaceHolder}
                searchPlaceholder="Search..."
                value={calculatePrice?.orderType || ''}
                onChange={item => {
                  setCalculatePrice(prev => ({
                    ...prev,
                    orderType: item.value,
                  }));
                  setCheckvaliation(prevValidation => ({
                    ...prevValidation,
                    orderType: false,
                  }));
                }}
              />
              <Text style={styles.validationtxt}>
                {checkvaliation.orderType ? "Order Type can't be empty" : null}
              </Text>
            </View>
            {/* length width */}
            <View style={styles.Child}>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Length</Text>
                <TextInput
                  placeholder="in cm"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.Length}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      Length: text,
                    }));

                    if (text.length === 1 && (text === '0' || text === '.')) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Length: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Length: false,
                      }));
                    }

                    // if (text.length == 0) {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: true,
                    //   }));
                    // } else {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: false,
                    //   }));
                    // }
                  }}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.Length ? "Length can't be empty" : null}
                </Text>
              </View>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Width</Text>
                <TextInput
                  placeholder="in cm"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.Width}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      Width: text,
                    }));

                    if (text.length === 1 && (text === '0' || text === '.')) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Width: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Width: false,
                      }));
                    }

                    // if (text.length == 0) {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: true,
                    //   }));
                    // } else {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: false,
                    //   }));
                    // }
                  }}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.Width ? "Width can't be empty" : null}
                </Text>
              </View>
            </View>
            {/* height weight */}
            <View style={styles.Child}>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Height</Text>
                <TextInput
                  placeholder="in cm"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.Height}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      Height: text,
                    }));

                    if (text.length === 1 && (text === '0' || text === '.')) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Height: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Height: false,
                      }));
                    }

                    // if (text.length == 0) {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: true,
                    //   }));
                    // } else {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: false,
                    //   }));
                    // }
                  }}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.Height ? "Height can't be empty" : null}
                </Text>
              </View>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Weight</Text>
                <TextInput
                  placeholder="in gm"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.Weight}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      Weight: text,
                    }));

                    if (text.length === 1 && (text === '0' || text === '.')) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Weight: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        Weight: false,
                      }));
                    }

                    // if (text.length == 0) {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: true,
                    //   }));
                    // } else {
                    //   setCheckvaliation(prevValidation => ({
                    //     ...prevValidation,
                    //     Length: false,
                    //   }));
                    // }
                  }}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.Weight ? "Weight can't be empty" : null}
                </Text>
              </View>
            </View>
            {/* pickup pin destination pin */}
            <View style={styles.Child}>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Pickup Pin</Text>
                <TextInput
                  placeholder="postcode"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.pickupPin}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      pickupPin: text,
                    }));

                    if (text.length < 6) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        pickupPin: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        pickupPin: false,
                      }));
                    }
                    if (text.length === 0) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        pickupPin: false,
                      }));
                    }
                  }}
                  maxLength={6}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.pickupPin ? 'invalid pincode' : null}
                </Text>
              </View>
              <View style={styles.LengthView}>
                <Text style={styles.smallTxt}>Destination Pin</Text>
                <TextInput
                  placeholder="postcode"
                  placeholderTextColor={'#999999'}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  value={calculatePrice?.destinationPin}
                  onChangeText={text => {
                    setCalculatePrice(prev => ({
                      ...prev,
                      destinationPin: text,
                    }));

                    if (text.length < 6) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        destinationPin: true,
                      }));
                    } else {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        destinationPin: false,
                      }));
                    }
                    if (text.length === 0) {
                      setCheckvaliation(prevValidation => ({
                        ...prevValidation,
                        destinationPin: false,
                      }));
                    }
                  }}
                  maxLength={6}
                />
                <Text style={styles.validationtxt}>
                  {checkvaliation.destinationPin ? 'invalid pincode' : null}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ButtonView}>
            <View style={styles.priceView}>
              <Text
                style={{
                  color: '#404040',
                  flex: 0.4,
                  // backgroundColor: 'red',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Price :{' '}
              </Text>
              <Text
                style={{
                  flex: 0.6,
                  //   backgroundColor: 'black',
                  textAlignVertical: 'center',
                  color: 'green',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {calculatedPrice}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleCalculatedPrice}
              // onPress={handleValidation}
              style={styles.priceBtn}>
              <Text style={styles.priceBtnTxt}>Get Price</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CalculatorScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  title: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: Width / 18,
    marginTop: 10,
  },
  parent: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
    elevation: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 2,
  },
  smallTxt: {
    fontSize: 12,
    color: '#595959',
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
  },
  shippingDropDown: {
    backgroundColor: '#fff',
    elevation: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  DropdownIcon: {
    width: Width / 12,
    height: Width / 12,
    tintColor: '#404040',
  },
  DropdownPlaceHolder: {
    color: '#595959',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  Child: {
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LengthView: {
    width: '45%',
  },
  TextInput: {
    padding: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'aliceblue',
    borderRadius: 5,
    elevation: 1,
    paddingHorizontal: 10,
    color: '#404040',
    fontFamily: 'Roboto-Medium',
  },
  ButtonView: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
    padding: 5,
    paddingVertical: 15,
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  priceView: {
    flex: 0.45,
    backgroundColor: '#fff',
    borderRadius: 5,
    // elevation: 0.5,
    borderWidth: 1,
    borderColor: 'aliceblue',
    flexDirection: 'row',
  },
  priceBtn: {
    flex: 0.45,
    backgroundColor: '#000',
    // backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#fff',
    height: 45,
  },
  priceBtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  validationtxt: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
    fontSize: 10,
  },
});
