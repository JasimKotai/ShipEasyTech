import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../config/UserSlice';

const Splash = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();


  useEffect(() => {
    setTimeout(() => {
      const handleUserLoginData = async () => {
        try {
          const res = await AsyncStorage.getItem('@userDetails');
          const userData = JSON.parse(res);
          if (userData !== null) {
            dispatch(saveUserData(userData));
            navigation.replace('BottomHomeScreen');
          } else {
            navigation.replace('SignInScreen');
          }
        } catch (error) {
          console.log('Contact screen log:', error);
        }
      };
      handleUserLoginData();
    }, 1000);
  }, []);
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo1.png')}
          style={{
            width: windowWidth / 1.5,
            resizeMode: 'contain',
          }}
        />
      </View>
    </>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    flex: 1,
  },
});
