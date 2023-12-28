import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GREEN_COLOR} from '../assets/Colors';
import DropDown from '../components/DropDown';
import ReUsableButtons from '../components/ReUsableButtons';
import DropDown2 from '../components/DropDown2';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../config/UserSlice';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const MoreScreen = ({navigation}) => {
  const imagePath = '../assets/images/up-arrow.png';

  // const [loginDetails, setLoginDetails] = useState('');
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [channelIntegrations, setChannelIntegration] = useState(false);
  const {user, customer} = useSelector(state => state.userSlice);

  const dispatch = useDispatch();

  console.log('more screen user=====>', user);

  // useEffect(() => {
  //   const getUserName = async () => {
  //     try {
  //       const res = await AsyncStorage.getItem('userLoginDetails');
  //       const parse = JSON.parse(res);
  //       // console.log('+++', parse.user.name);
  //       setLoginDetails(parse);
  //     } catch (error) {
  //       console.log('Contact screen log:', error);
  //     }
  //   };
  //   getUserName();
  // }, []);

  const handleLogout = () => {
    dispatch(userLogout(navigation));
  };

  return (
    <>
      <StatusBar hidden={false} translucent backgroundColor={'#e6ffef'} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* profile and company name view */}
        <View style={styles.ProfileView}>
          <View style={styles.ProfileViewChild1}>
            {/* profile picture */}
            <Image
              source={
                userProfileImage
                  ? require('../assets/images/logo1.png')
                  : require('../assets/images/profile-user.png')
              }
              style={{width: 70, height: 70}}
            />
            {/* company name */}
            <View
              style={{
                paddingHorizontal: 10,
                paddingRight: 20,
                flex: 1,
              }}>
              <Text numberOfLines={1} style={styles.company_name_Style}>
                {user?.company_name ? user?.company_name : null}
              </Text>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/badge.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={styles.badgeText}>BRONZE</Text>
            </View> */}
            </View>
            {/* View Profile button is here */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={styles.ViewProfileBtn}>
              <Text style={styles.ViewProfileBtntext}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* drop down start */}
        <View style={styles.dropDownParent}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  color: '#404040',
                  fontFamily: 'Poppins-Regular',
                }}>
                KAM Name :
              </Text>
              <Text
                style={{
                  color: '#595959',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 6,
                  fontSize: 13,
                }}>
                Customer Support
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setDropDown(!dropDown);
              }}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 4,
              }}>
              <Image
                source={
                  dropDown
                    ? require('../assets/images/up-arrow.png')
                    : require('../assets/images/down-arrow.png')
                }
                style={{width: Width / 20, height: Width / 20}}
              />
            </TouchableOpacity>
          </View>
          {/* dropdown hidden component  */}
          {dropDown ? <DropDown /> : null}
        </View>
        {/* drop down end */}
        <View style={styles.reusableBtnsView}>
          <ReUsableButtons
            image={require('../assets/images/dashboard1.png')}
            title="Dashboard"
            path="Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
          />
          {/* <ReUsableButtons
          image={require('../assets/images/customer.png')}
          title="Customers"
        /> */}
          <ReUsableButtons
            image={require('../assets/images/wallet.png')}
            title="Wallet & Passbook"
            // navigation={navigation}
            path="WalletAndPassbook"
            onPress={() => navigation.navigate('WalletAndPassbook')}
          />
          {/* <ReUsableButtons
          image={require('../assets/images/weight-scale.png')}
          title="Weight Discrepanies"
        /> */}
          <ReUsableButtons
            image={require('../assets/images/list.png')}
            title="Manifests"
            path="Manifests"
            onPress={() => navigation.navigate('Manifests')}
          />
          {/* channel integrations button */}
          {/* <TouchableOpacity
          onPress={() => {
            setChannelIntegration(!channelIntegrations);
          }}
          style={styles.channelIntegrationBtn}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/channel.png')}
              style={{width: 25, height: 25, tintColor: GREEN_COLOR}}
            />
            <Text style={styles.channelIntegrationBtnText}>
              Channel Integrations
            </Text>
          </View>
          <Image
            source={
              channelIntegrations
                ? require('../assets/images/up-arrow.png')
                : require('../assets/images/down-arrow.png')
            }
            style={{width: 18, height: 18}}
          />
        </TouchableOpacity>
        {channelIntegrations ? <DropDown2 /> : null} */}
          <ReUsableButtons
            image={require('../assets/images/customer-support.png')}
            title="Help & Support"
            path="HelpAndSupport"
            onPress={() => navigation.navigate('HelpAndSupport')}
          />
          <ReUsableButtons
            image={require('../assets/images/logout.png')}
            title="Logout"
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  {
                    text: 'Cancel',
                  },
                  {
                    text: 'Logout',
                    onPress: () => {
                      handleLogout();
                      console.log('Logged out');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f8ff',
    backgroundColor: '#FFFF',
  },
  ProfileView: {
    flex: 1,
    paddingTop: Height / 25,
  },
  ProfileViewChild1: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: Height / 8,
    // backgroundColor: 'silver',
  },
  company_name_Style: {
    fontSize: 16,
    color: '#404040',
    fontFamily: 'Poppins-Bold',
    marginLeft: 5,
  },
  badgeText: {
    color: '#808080',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 3,
  },
  ViewProfileBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 0.1,
  },
  ViewProfileBtntext: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-Regular',
    fontSize: 13
  },
  dropDownParent: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
    margin: 1,
  },
  reusableBtnsView: {
    flex: 1,
    marginHorizontal: 20,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // borderRadius: 5,
  },
  channelIntegrationBtn: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  channelIntegrationBtnText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    padding: 10,
  },
  dropdown2View: {
    backgroundColor: 'aliceblue',
    marginHorizontal: 20,
    paddingRight: 20,
    flex: 1,
  },
  dropdown2childView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
