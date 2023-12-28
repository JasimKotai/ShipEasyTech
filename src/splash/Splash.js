// /* eslint-disable */
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {saveUserData} from '../config/UserSlice';

import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import {GREEN_COLOR} from '../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const [getCurrentVersion, setGetCurrentVersion] = useState('');
  const [getLatestVersion, setGetLatestVersion] = useState('');
  const [message, setMessage] = useState('');
  // console.log('app version is :', DeviceInfo.getVersion());
  // const currentVersion = DeviceInfo.getVersion();

  // useEffect(() => {
  //   handleGetVersion();
  // }, []);
  // const handleGetVersion = async () => {
  //   const versions = await firestore().collection('versions').get();
  //   console.log(versions.docs[0].data().version);
  //   console.log(versions.docs[0].data());
  // };

  const checkAppVersion = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      setGetCurrentVersion(currentVersion);
      const versions = await firestore().collection('versions').get();
      const latestVersion = versions.docs[0].data().version;
      const Msg = versions.docs[0].data().message;
      setMessage(Msg);
      setGetLatestVersion(latestVersion);
      // console.log(currentVersion, latestVersion);
      if (currentVersion !== latestVersion) {
        console.log('Splash Screen - New version available');
        setModalVisible(!modalVisible);
      } else {
        await handleUserData();
      }
    } catch (error) {
      console.log('Error fetching version:', error);
    }
  };

  const handleUserData = async () => {
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
      console.log('Error handling user data:', error);
    }
  };

  useEffect(() => {
    checkAppVersion();
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalParent}>
          <View style={styles.modalChild}>
            {/* msg view */}
            <View style={styles.msgView}>
              <Text style={[styles.msgTxt, {color: '#000'}]}>Message!!</Text>
              <Text style={[styles.msgTxt2]}>{message}</Text>
              {/* current version view*/}
              <View style={styles.currentVersion}>
                <Text style={styles.msgTxt}>
                  Current Version{'  '}:{'  '}
                </Text>
                <Text style={[styles.msgTxt]}>{getCurrentVersion}</Text>
              </View>
              {/* latest version view*/}
              <View style={styles.currentVersion}>
                <Text style={styles.msgTxt}>
                  Latest Version{'  '}:{'  '}
                </Text>
                <Text style={[styles.msgTxt, {color: GREEN_COLOR}]}>
                  {getLatestVersion}
                </Text>
              </View>
              <TouchableOpacity style={styles.UpdateButton}>
                <Text style={styles.UpdateButtonTxt}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalParent: {
    position: 'absolute',
    width: windowWidth,
    height: windowheight,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  modalChild: {
    width: windowWidth / 1.2,
    height: windowheight / 2.6,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  msgTxt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
  },
  msgTxt2: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-SemiBold',
  },
  msgView: {
    backgroundColor: '#fff',
    // backgroundColor: 'blueviolet',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
    // elevation: 1,
    shadowColor: GREEN_COLOR,
  },
  currentVersion: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 4,
    borderRadius: 25,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '95%',
  },
  UpdateButton: {
    backgroundColor: '#000',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 25,
    marginTop: 33,
  },
  UpdateButtonTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
