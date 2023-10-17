import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {GREEN_COLOR} from '../assets/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_LOCAL} from '@env';
import {CommonActions} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
// console.log('++++++', process.env.BASE_URL);

const SignInScreen = ({navigation}) => {
  const toast = useToast();
  const refRBSheet = useRef();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isFocused, setIsFocused] = useState('');
  // console.log(isFocused);
  const [userDetails, setUserDetails] = useState({
    // Email: '',
    // Password: '',
    email: 'satyasankar09@gmail.com',
    password: 'Rajarani22@',
  });
  // console.log(userDetails);
  const [checkEmailValidation, setEmailValidation] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(
        // `${process.env.BASE_URL}/login`,
        `${BASE_URL_LOCAL}/login`,
        userDetails,
      );
      console.log(response.data);
      if (response.data) {
        const json = JSON.stringify(response.data);
        await AsyncStorage.setItem('userLoginDetails', json);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomHomeScreen'}],
          }),
        );
      }
      setIsLoading(false); // Stop loading
    } catch (error) {
      setIsLoading(false); // Stop loading
      Alert.alert(`Network Error`, `check internet connection`);
      console.log('SignInScreenerror- login err:', error);
    }
  };
  // useEffect(() => {
  //   toast.show('Hello World', {
  //     type: 'success',
  //     placement: 'bottom',
  //     duration: 3000,
  //     animationType: 'zoom-in',
  //   });
  // });

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
          <Image
            source={require('../assets/images/logo1.png')}
            style={{
              width: width / 2,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>
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
            <Text style={styles.Title}>Sign In Using</Text>
            <View style={styles.facebookAndGoogleIconView}>
              {/* facebook icon for login  */}
              <View style={styles.facebookAndGoogleChildView}>
                <TouchableOpacity style={styles.facebookBtn}>
                  <Image
                    source={require('../assets/images/facebook.png')}
                    style={styles.facebookIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.facebookIconText}>Facebook</Text>
              </View>
              {/* google icon for login  */}
              <View style={styles.facebookAndGoogleChildView}>
                <TouchableOpacity style={styles.facebookBtn}>
                  <Image
                    source={require('../assets/images/search.png')}
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
          {/* email  view */}
          <View style={{backgroundColor: '#FFFF'}}>
            <Text
              style={[
                styles.EmailPlaceholder,
                isFocused === 'Email' || userDetails.Email
                  ? styles.EmailPlaceholderFocused
                  : {},
              ]}>
              Email
            </Text>
            <TextInput
              style={styles.EmailInput}
              onChangeText={text => {
                setUserDetails({...userDetails, email: text});
                // validateEmail(text);
              }}
              onFocus={() => {
                setIsFocused('Email');
              }}
              cursorColor={'black'}
            />
          </View>
          {/* password  view */}
          <View style={{backgroundColor: '#FFFF'}}>
            <Text
              style={[
                styles.EmailPlaceholder,
                isFocused === 'Password' || userDetails.Password
                  ? styles.EmailPlaceholderFocused
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
              style={styles.EmailInput}
              onChangeText={text => {
                setUserDetails({...userDetails, password: text});
                // validateEmail(text);
              }}
              onFocus={() => {
                setIsFocused('Password');
              }}
              cursorColor={'black'}
              secureTextEntry={secureEntry}
            />
            {/* forget password */}
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginRight: width / 10,
                marginTop: 20,
              }}>
              <Text style={styles.forgetBtntext}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          {/* sign in btnview */}
          <View style={{backgroundColor: '#FFFF', flex: 1}}>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: height / 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                style={styles.SignupBtn}>
                {isLoading ? (
                  // Step 3: Show ActivityIndicator while loading
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.SignupBtnText}>Logging...</Text>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <Text style={styles.SignupBtnText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
            {/* don't have a account */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                paddingBottom: 10,
              }}>
              <Text style={{color: '#808080', fontFamily: 'Poppins-Regular'}}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUpScreen');
                }}>
                <Text
                  style={{color: GREEN_COLOR, fontFamily: 'Poppins-Regular'}}>
                  Sign Up
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
            <View style={{backgroundColor: '#FFFf', marginBottom: 40}}>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{alignSelf: 'center', marginTop: 20}}>
                <Text
                  style={{color: GREEN_COLOR, fontFamily: 'Poppins-Regular'}}>
                  I want to do something else
                </Text>
              </TouchableOpacity>
            </View>
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
      </View>
    </View>
  );
};

export default SignInScreen;
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
  facebookIconText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  divider: {
    backgroundColor: '#e6e6e6',
    height: 1,
    width: width / 3,
  },
  EmailInput: {
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
  },
  EmailPlaceholder: {
    fontSize: 12,
    position: 'absolute',
    top: 40,
    left: 30,
    color: '#808080',
  },
  EmailPlaceholderFocused: {
    fontSize: 12,
    position: 'absolute',
    top: 22,
    left: 30,
    color: '#808080',
  },
  forgetBtntext: {
    fontSize: 14,
    color: GREEN_COLOR,
    fontFamily: 'Poppins-Regular',
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
});
