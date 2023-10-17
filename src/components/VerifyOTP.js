import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_LIVE, BASE_URL_LOCAL } from '../config/api';

const VerifyOTP = ({route, navigation}) => {
  const {temp_data} = route.params;
  console.log("temp_data===>", temp_data);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSignUpAPI = async () => {
    try {
      let data = {
        otp: otp,
        temp_data: [temp_data],
      };
      console.log(data);

      const response = await axios.post(`${BASE_URL_LIVE}/otp-verify`, data);
      Alert.alert('success', response.data.message);
      console.log("response=====>", response.data);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.response.data);
      console.log('verify otp error log;', error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={LIGHT_GREEN} />
      <View style={styles.parent}>
        <View
          style={{
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
              //   backgroundColor: 'red',
            }}
          />
        </View>
        <View style={styles.child}>
          <Text style={styles.text1}>Very Email Address</Text>
          <Text style={styles.text2}>
            An OTP has been sent to your email address
          </Text>
          <Text style={styles.text3}>
            {temp_data?.email} pls enter below
          </Text>
          <TextInput
            placeholderTextColor={'#808080'}
            placeholder="Enter Otp"
            style={styles.otpInput}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity>
            <Text style={styles.ResendOtptext}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#ffff', paddingBottom: 20}}>
          <TouchableOpacity
            onPress={() => {
              handleSignUpAPI();
            }}
            style={styles.submitButton}>
            {loading ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.SignupBtnText}>Wait...</Text>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VerifyOTP;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    backgroundColor: LIGHT_GREEN,
    flex: 1,
    // height: height / 5,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  child: {
    backgroundColor: '#Ffff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
  text1: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  text2: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  text3: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  otpInput: {
    height: 40,
    width: 120,
    borderRadius: 5,
    marginTop: 40,
    padding: 0,
    backgroundColor: 'aliceblue',
    fontSize: 12,
    color: '#000',
    paddingHorizontal: 30,
  },
  submitButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#000',
    marginHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffff',
  },
  ResendOtptext: {
    fontFamily: 'Poppins-Regular',
    color: GREEN_COLOR,
    marginTop: height / 10,
  },
});
