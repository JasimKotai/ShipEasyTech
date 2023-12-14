import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GREEN_COLOR} from '../assets/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import {BASE_URL_DEV, BASE_URL_LIVE, BASE_URL_LOCAL} from '../config/api';

const SignUpScreen = ({navigation}) => {
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [firstName, setFirstName] = useState('');
  const [isFocused, setIsFocused] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    company_name: '',
    email: '',
    password_confirmation: '',
    order_size: 'Setting up a new business',
  });
  // console.log(userDetails);
  const [secureEntry, setSecureEntry] = useState(true);
  const [checkLength, setChecklength] = useState(null);
  // console.log('checkLength', checkLength);
  const [smallLetter, setSmallLetter] = useState(null);
  // console.log('smallLetter', smallLetter);
  const [capitalLetter, setCapitalLetter] = useState(null);
  // console.log('capitalLetter', capitalLetter);
  const [checkOneNumber, setCheckOneNumber] = useState(null);
  // console.log('checkOneNumber', checkOneNumber);
  const [checkSpecialChar, setCheckSpecialChar] = useState(null);
  // console.log('checkSpecialChar', checkSpecialChar);
  const [checkPwdlValidation, setPwdValidation] = useState(false);
  const [showOrderButtons, setShowOrderButtons] = useState(false);
  const [state, setState] = useState(false);
  // console.log(
  //   '=+',
  //   checkLength,
  //   smallLetter,
  //   capitalLetter,
  //   checkOneNumber,
  //   checkSpecialChar,
  // );
  // console.log('=========================================================');

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [company_name, setcompany_name] = useState(null);
  const [email, setEmail] = useState(null);
  const [password_confirmation, setpassword_confirmation] = useState(null);
  // console.log(name, phone, company_name, email, 'cnrf', password_confirmation);

  const handleSignUp = () => {
    if (
      name !== null &&
      phone !== null &&
      company_name !== null &&
      email !== null &&
      password_confirmation !== null &&
      name &&
      phone &&
      company_name &&
      email &&
      password_confirmation
    ) {
      console.log('api call signup screen');
      handleSignUpAPI();
    } else {
      console.log('validation call signup screen');
      Validation();
    }
  };

  const Validation = () => {
    if (name == null) {
      setName(false);
    }
    if (phone == null) {
      setPhone(false);
    }
    if (company_name == null) {
      setcompany_name(false);
    }
    if (email == null) {
      setEmail(false);
    }
    if (
      password_confirmation == null
      // &&
      // checkLength == false &&
      // smallLetter == false &&
      // capitalLetter == false &&
      // checkOneNumber == false &&
      // checkSpecialChar == false
    ) {
      setpassword_confirmation(false);
    }
  };

  const validateEmail = text => {
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    );
    const checkEmail = emailRegex.test(text);
    // console.log('==', checkEmail);
    if (checkEmail !== true) {
      setEmail(false);
    }
  };

  const validatePassword = text => {
    const passwordRegex = new RegExp(
      '^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-#?@$%^&*]).*$',
    );
    const checkInputLength = RegExp('^(?=.{6,})');
    const checkSmallLetter = RegExp('^(?=.*[a-z])');
    const checkCapitalLetter = RegExp('^(?=.*[A-Z])');
    const checkNumber = RegExp('^(?=.*[0-9])');
    const specialChar = RegExp('^(?=.*[-#?@$%^&*])');

    const length = checkInputLength.test(text);
    const small = checkSmallLetter.test(text);
    const Capital = checkCapitalLetter.test(text);
    const num = checkNumber.test(text);
    const specialCh = specialChar.test(text);
    if (length === true) {
      setChecklength(true);
      setpassword_confirmation(true);
    } else {
      setChecklength(false);
      setpassword_confirmation(false);
    }
    if (small === true) {
      setSmallLetter(true);
      setpassword_confirmation(true);
    } else {
      setSmallLetter(false);
      setpassword_confirmation(false);
    }
    if (Capital === true) {
      setCapitalLetter(true);
      setpassword_confirmation(true);
    } else {
      setCapitalLetter(false);
      setpassword_confirmation(true);
    }
    if (num === true) {
      setCheckOneNumber(true);
      setpassword_confirmation(true);
    } else {
      setCheckOneNumber(false);
      setpassword_confirmation(false);
    }
    if (specialCh === true) {
      setCheckSpecialChar(true);
      setpassword_confirmation(true);
    } else {
      setCheckSpecialChar(false);
      setpassword_confirmation(false);
    }
  };
  const handleSignUpAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL_LIVE}/verify-register`,
        userDetails,
      );
      if (response.data) {
        // console.log('SignUpScreen', response.data);
        navigation.navigate('VerifyOTP', {
          temp_data: response.data.temp_data[0],
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('SignUpScreen error log;', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#e6ffef'} />
      <View style={styles.Parent}>
        {/* logo view */}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: width / 2,
            width: width,
          }}>
          {/* logo image */}
          <Image
            source={require('../assets/images/logo1.png')}
            style={{
              width: width / 2,
              height: 100,
              resizeMode: 'contain',
              //   backgroundColor: 'red',
            }}
          />
        </View>
        {/* scroll view start */}
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* transparent view start */}
          <View
            style={{
              width: width,
              height: width / 2,
              backgroundColor: 'transparent',
              marginBottom: 20,
            }}
          />
          {/* transparent view end */}
          <View style={styles.ParentView1}>
            <Text style={styles.Title}>Sign Up Using</Text>
            <View style={styles.facebookAndGoogleIconView}>
              <View style={styles.facebookAndGoogleChildView}>
                <TouchableOpacity style={styles.facebookBtn}>
                  <Image
                    source={require('../assets/images/facebook.png')}
                    style={styles.facebookIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.facebookIconText}>Facebook</Text>
              </View>
              <View style={styles.facebookAndGoogleChildView}>
                <TouchableOpacity style={styles.facebookBtn}>
                  <Image
                    source={require('../assets/images/google.png')}
                    style={styles.facebookIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.facebookIconText}>Google</Text>
              </View>
            </View>
          </View>
          {/* divider views start */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFF',
            }}>
            <View style={styles.divider} />
            <Text
              style={{
                color: '#cccccc',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
                marginHorizontal: 10,
              }}>
              Or
            </Text>
            <View style={styles.divider} />
          </View>
          {/* divider views end */}

          <View style={styles.ParentView2}>
            {/* first name & last name view start */}
            <View style={styles.firstAndLastNameView}>
              {/* custom texp input placeholder moving to top on onFocus */}
              <View style={{}}>
                <Text
                  style={[
                    styles.CustomPlaceHolderText,
                    isFocused === 'FN' || userDetails.name
                      ? styles.CustomPlaceHolderTextFocused
                      : {},
                  ]}>
                  Full Name
                </Text>
                {/* textinput for name */}
                <TextInput
                  style={
                    name == false
                      ? [styles.firstAndLastInputText, {borderColor: 'red'}]
                      : styles.firstAndLastInputText
                  }
                  onChangeText={text => {
                    setUserDetails({...userDetails, name: text});
                    setName(text);
                  }}
                  onFocus={() => {
                    setIsFocused('FN');
                  }}
                  cursorColor={'black'}
                  placeholderTextColor={'#666'}
                />
                {name == false ? (
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 10}}>
                    Please enter full name
                  </Text>
                ) : null}
              </View>
              {/* custom texp input placeholder moving to top on onFocus */}
              <View>
                <Text
                  style={[
                    styles.CustomPlaceHolderText,
                    isFocused === 'LN' || userDetails.phone
                      ? styles.CustomPlaceHolderTextFocused
                      : {},
                  ]}>
                  Phone Number
                </Text>
                {/* textinput for last name */}
                <TextInput
                  style={
                    phone == false
                      ? [styles.firstAndLastInputText, {borderColor: 'red'}]
                      : styles.firstAndLastInputText
                  }
                  onChangeText={text => {
                    setUserDetails({...userDetails, phone: text});
                    setPhone(text);
                  }}
                  onFocus={() => {
                    setIsFocused('LN');
                  }}
                  cursorColor={'black'}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholderTextColor={'#666'}
                />
                {phone == false ? (
                  <Text style={{fontSize: 10, color: 'red', marginLeft: 10}}>
                    Please enter phone number
                  </Text>
                ) : null}
              </View>
            </View>
            {/* first name & last name view end */}

            {/* company view start */}
            <View>
              {/* custom texp input placeholder moving to top on onFocus */}
              <Text
                style={[
                  styles.CustCompPlaceHolder,
                  isFocused === 'CN' || userDetails.company_name
                    ? styles.CustCompPlaceHolderFocused
                    : {},
                ]}>
                Company Name
              </Text>
              <TextInput
                style={
                  company_name == false
                    ? [styles.companyNameInput, {borderColor: 'red'}]
                    : styles.companyNameInput
                }
                onChangeText={text => {
                  setUserDetails({...userDetails, company_name: text});
                  setcompany_name(text);
                }}
                onFocus={() => {
                  setIsFocused('CN');
                }}
                cursorColor={'black'}
                placeholderTextColor={'#666'}
              />
              {company_name == false ? (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 30}}>
                  Please enter company name
                </Text>
              ) : null}
            </View>
            {/* company view end */}
            {/* email view start */}
            <View>
              {/* custom texp input placeholder moving to top on onFocus */}
              <Text
                style={[
                  styles.CustCompPlaceHolder,
                  isFocused === 'Email' || userDetails.email
                    ? styles.CustCompPlaceHolderFocused
                    : {},
                ]}>
                Email
              </Text>
              <TextInput
                style={
                  email == false
                    ? [styles.companyNameInput, {borderColor: 'red'}]
                    : styles.companyNameInput
                }
                onChangeText={text => {
                  setUserDetails({...userDetails, email: text});
                  setEmail(text);
                  validateEmail(text);
                }}
                onFocus={() => {
                  setIsFocused('Email');
                }}
                cursorColor={'black'}
                placeholderTextColor={'#666'}
              />
              {email == false ? (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 30}}>
                  Please enter valid email
                </Text>
              ) : null}
            </View>
            {/* email view end */}
            {/* password view start */}
            <View>
              {/* custom texp input placeholder moving to top on onFocus */}
              <Text
                style={[
                  styles.CustCompPlaceHolder,
                  isFocused === 'Password' || userDetails.password_confirmation
                    ? styles.CustCompPlaceHolderFocused
                    : {},
                ]}>
                Password
              </Text>
              {/* show and hide password button */}
              <View
                style={{
                  zIndex: 1,
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 35,
                  right: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntry(!secureEntry);
                  }}>
                  <Image
                    source={
                      secureEntry
                        ? require('../assets/images/hidden.png')
                        : require('../assets/images/show.png')
                    }
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={
                  password_confirmation == false
                    ? [styles.companyNameInput, {borderColor: 'red'}]
                    : styles.companyNameInput
                }
                onChangeText={text => {
                  setUserDetails({...userDetails, password_confirmation: text});
                  validatePassword(text);
                  // setpassword_confirmation(text);
                }}
                onFocus={() => {
                  setIsFocused('Password');
                }}
                cursorColor={'black'}
                secureTextEntry={secureEntry}
                placeholderTextColor={'#666'}
              />
              {password_confirmation == false ? (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 30}}>
                  Please enter valid password
                </Text>
              ) : null}

              {/* validation */}
              {isFocused === 'Password' ? (
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginHorizontal: 20,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        checkLength
                          ? require('../assets/images/check.png')
                          : require('../assets/images/checked.png')
                      }
                      style={
                        checkLength
                          ? {width: 15, height: 15}
                          : styles.PasswordValidationImageIcon
                      }
                    />
                    <Text style={styles.PasswordValidationText}>
                      At least 6 characters long
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        capitalLetter
                          ? require('../assets/images/check.png')
                          : require('../assets/images/checked.png')
                      }
                      style={
                        capitalLetter
                          ? {width: 15, height: 15}
                          : styles.PasswordValidationImageIcon
                      }
                    />
                    <Text style={styles.PasswordValidationText}>
                      At least one capital letter
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        smallLetter
                          ? require('../assets/images/check.png')
                          : require('../assets/images/checked.png')
                      }
                      style={
                        smallLetter
                          ? {width: 15, height: 15}
                          : styles.PasswordValidationImageIcon
                      }
                    />
                    <Text style={styles.PasswordValidationText}>
                      At least one small letter
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        checkOneNumber
                          ? require('../assets/images/check.png')
                          : require('../assets/images/checked.png')
                      }
                      style={
                        checkOneNumber
                          ? {width: 15, height: 15}
                          : styles.PasswordValidationImageIcon
                      }
                    />
                    <Text style={styles.PasswordValidationText}>
                      At least one number
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={
                        checkSpecialChar
                          ? require('../assets/images/check.png')
                          : require('../assets/images/checked.png')
                      }
                      style={
                        checkSpecialChar
                          ? {width: 15, height: 15}
                          : styles.PasswordValidationImageIcon
                      }
                    />
                    <Text style={styles.PasswordValidationText}>
                      At least one special characters -#?@$%^&*
                    </Text>
                  </View>
                  {/* <Text>Password does not meet the above criteria !</Text> */}
                </View>
              ) : null}
            </View>
            {/* password view end */}
            {/* order button start (How many orders do you ship in a month ?) */}
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 15,
              }}>
              <Text style={{fontSize: 12, color: '#808080', marginLeft: 10}}>
                How many orders do you ship in a month ?
              </Text>
              <View
                style={{
                  height: 60,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowOrderButtons(!showOrderButtons);
                  }}
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View style={{flex: 0.9}}>
                    <Text
                      style={{color: '#808080', fontFamily: 'Poppins-Regular'}}>
                      {userDetails.order_size}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 0.1,
                    }}>
                    <Image
                      source={require('../assets/images/down-arrow.png')}
                      style={{width: 17, height: 17}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {showOrderButtons ? (
                <View style={styles.customDropDownView}>
                  <TouchableOpacity
                    onPress={() => {
                      setUserDetails({
                        ...userDetails,
                        order_size: 'Between 1-10 orders',
                      });
                      setShowOrderButtons(!showOrderButtons);
                    }}
                    style={styles.customDropDownBtns}>
                    <Text style={styles.customDropDownTxt}>
                      Between 1-10 orders
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setUserDetails({
                        ...userDetails,
                        order_size: '11-100 orders',
                      });
                      setShowOrderButtons(!showOrderButtons);
                    }}
                    style={styles.customDropDownBtns}>
                    <Text style={styles.customDropDownTxt}>11-100 orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setUserDetails({
                        ...userDetails,
                        order_size: '101-1000 orders',
                      });
                      setShowOrderButtons(!showOrderButtons);
                    }}
                    style={styles.customDropDownBtns}>
                    <Text style={styles.customDropDownTxt}>
                      101-1000 orders
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            {/* order button end (How many orders do you ship in a month ?) */}
            {/* privacy policy */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: '#808080',
                  fontSize: 11,
                  fontFamily: 'Poppins-Regular',
                }}>
                By signing up, you agree to our{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: GREEN_COLOR,
                    fontSize: 11,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Privacy Policy{'  '}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#808080',
                  fontSize: 11,
                  fontFamily: 'Poppins-Regular',
                }}>
                &{'  '}
              </Text>

              <TouchableOpacity>
                <Text
                  style={{
                    color: GREEN_COLOR,
                    fontSize: 11,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  T&C
                </Text>
              </TouchableOpacity>
            </View>
            {/* signup button */}
            <View style={{marginHorizontal: 20, marginTop: height / 30}}>
              <TouchableOpacity
                onPress={() => {
                  handleSignUp();
                  // handleSignUpAPI();
                }}
                style={styles.SignupBtn}>
                {loading ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.SignupBtnText}>Signing...</Text>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <Text style={styles.SignupBtnText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
            {/* already have account view */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                paddingBottom: 10,
              }}>
              <Text style={{color: '#808080', fontFamily: 'Poppins-Regular'}}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}>
                <Text
                  style={{color: GREEN_COLOR, fontFamily: 'Poppins-Regular'}}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            {/* divider */}
            <View
              style={{
                height: 2,
                width: width / 2,
                backgroundColor: '#eeeeee',
                alignSelf: 'center',
              }}
            />
            {/* something else button*/}
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{alignSelf: 'center', marginTop: 20, marginBottom: 50}}>
              <Text style={{color: GREEN_COLOR, fontFamily: 'Poppins-Regular'}}>
                I want to do something else
              </Text>
            </TouchableOpacity>
            {/* RBSheet start here  */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
              }}>
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                animationType="slide"
                customStyles={{
                  wrapper: {
                    // backgroundColor: 'transparent',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  },
                  draggableIcon: {
                    // backgroundColor: '#000',
                    backgroundColor: 'transparent',
                  },
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFF',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.close()}
                    style={{alignSelf: 'flex-end'}}>
                    <Image
                      source={require('../assets/images/close1.png')}
                      style={{width: 20, height: 20, tintColor: '#b3b3b3'}}
                    />
                  </TouchableOpacity>
                  <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                    Select what you want to do
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <Image
                      source={require('../assets/images/new-moon.png')}
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: '#b3b3b3',
                      }}
                    />
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Poppins-Bold',
                        marginLeft: 20,
                      }}>
                      Track a Shipment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <Image
                      source={require('../assets/images/new-moon.png')}
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: '#b3b3b3',
                      }}
                    />
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Poppins-Bold',
                        marginLeft: 20,
                      }}>
                      Calculate Shipping Rates
                    </Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>
            {/* RBSheet end here  */}
          </View>
        </ScrollView>
        {/* scroll view end */}
      </View>
    </View>
  );
};

export default SignUpScreen;
const width = Dimensions.get('window').width;
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
  ParentView1: {
    flex: 1,
    backgroundColor: '#FFFF',
    // width: width,
    // height: height,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  Title: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  facebookAndGoogleIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookAndGoogleChildView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  facebookIconText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  facebookBtn: {
    borderWidth: 0.5,
    borderColor: '#808080',
    borderRadius: 50,
    padding: 12,
  },
  facebookIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  ParentView2: {
    backgroundColor: '#FFFF',
  },
  divider: {
    backgroundColor: '#e6e6e6',
    height: 1,
    width: width / 3,
  },
  firstAndLastNameView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  CustomPlaceHolderText: {
    fontSize: 12,
    position: 'absolute',
    top: 20,
    left: 10,
    color: '#808080',
  },
  CustomPlaceHolderTextFocused: {
    fontSize: 12,
    position: 'absolute',
    top: 3,
    left: 10,
    color: '#808080',
  },
  firstAndLastInputText: {
    width: width / 2.5,
    height: 60,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingLeft: 10,
    lineHeight: 10,
    fontSize: 12,
    paddingBottom: 20,
    textAlignVertical: 'bottom',
    color: '#404040',
  },
  companyNameInput: {
    marginHorizontal: 20,
    height: 60,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingLeft: 10,
    lineHeight: 10,
    fontSize: 12,
    paddingBottom: 20,
    textAlignVertical: 'bottom',
    marginTop: 20,
    color: '#404040',
  },
  CustCompPlaceHolder: {
    fontSize: 12,
    position: 'absolute',
    top: 40,
    left: 30,
    color: '#808080',
  },
  CustCompPlaceHolderFocused: {
    fontSize: 12,
    position: 'absolute',
    top: 22,
    left: 30,
    color: '#808080',
  },
  SignupBtn: {
    paddingVertical: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  SignupBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  PasswordValidationText: {
    color: '#808080',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 10,
  },
  PasswordValidationImageIcon: {
    width: 15,
    height: 15,
    tintColor: '#808080',
  },
  customDropDownView: {
    backgroundColor: '#ffff',
    paddingVertical: 5,
    borderWidth: 0.4,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginTop: 5,
  },
  customDropDownBtns: {
    backgroundColor: '#ffff',
    paddingVertical: 10,
    paddingLeft: 5,
    borderBottomWidth: 0.4,
    borderColor: '#cccccc',
    marginHorizontal: 5,
  },
  customDropDownTxt: {color: '#808080', fontFamily: 'Poppins-Regular'},
});
