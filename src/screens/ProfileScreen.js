import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles} from '../css/ProfileScreenCSS';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const ProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [userName, setUserName] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [email, setEmail] = useState(null);

  const {user, customer} = useSelector(state => state.userSlice);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setCompanyId(user.id);
      setCompanyName(user.company_name);
      setEmail(user.email);
    }
  }, [user]);
  const handleGalleryPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const AndroidVersion = Platform.Version;
        if (AndroidVersion >= 33) {
          const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
          const granted = await PermissionsAndroid.request(permission);
          // console.log(granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('android 33 permission granted');
            handleGallery();
          } else {
            console.log('android 33 permission denied');
            promptOpenAppSettings();
          }
        } else {
          const permission =
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
          const granted = await PermissionsAndroid.request(permission);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('android 12 permission granted');
            handleGallery();
          } else {
            console.log('android 12 permission denied');
            promptOpenAppSettings();
          }
        }
      }
    } catch (error) {
      console.log('profile scren handleGalleryPermission log:', error);
    }
  };
  // gallery open function

  const handleGallery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 350,
        height: 350,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
      });
      // console.log('handleImagePicker log :', image);
      setProfile(image.path);
    } catch (error) {
      console.log('create screen handleImagePicker log:', error);
    }
  };

  // Function to prompt the user to open the app settings
  const promptOpenAppSettings = () => {
    Alert.alert(
      'Camera Permission Required',
      'Please grant camera permission in order to use this feature.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: openAppSettings},
      ],
    );
  };

  // Function to open the app settings
  const openAppSettings = () => {
    Linking.openSettings();
  };
  return (
    <View style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <Header
        title="Profile"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* profile/company logo picture */}
      <View style={Styles.profileParent}>
        <Text style={Styles.title}>Company Logo</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={handleGalleryPermission}
            style={{
              flex: 0.3,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: Width / 5.5,
                height: Width / 5.5,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: GREEN_COLOR,
              }}>
              <Image
                source={
                  profile !== null
                    ? {uri: profile}
                    : require('../assets/images/profile-user.png')
                }
                style={{
                  width: Width / 6,
                  height: Width / 6,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 0.7,
              // backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{color: '#404040', fontFamily: 'Poppins-SemiBold'}}>
              {companyName !== null ? companyName : 'Company Name'}
            </Text>
          </View>
        </View>
      </View>
      {/* company details start */}
      <View style={Styles.profileParent}>
        <Text style={Styles.title}>Company Details</Text>
        {/* <View
          style={{
            flexDirection: 'row',
          }}> */}

        {/* user name */}
        <View style={Styles.userDetailsView}>
          <View style={Styles.leftView}>
            <Text style={Styles.companyName}>User Name</Text>
            <Text style={[Styles.companyName, {color: '#000', fontSize: 18}]}>
              :
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text numberOfLines={2} style={Styles.companyName2}>
              {userName !== null ? userName : 'not available'}
            </Text>
          </View>
        </View>

        {/* companu ID */}
        <View style={Styles.userDetailsView}>
          <View style={Styles.leftView}>
            <Text style={Styles.companyName}>Company ID</Text>
            <Text style={[Styles.companyName, {color: '#000', fontSize: 18}]}>
              :
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text numberOfLines={2} style={Styles.companyName2}>
              {companyId !== null ? companyId : 'not available'}
            </Text>
          </View>
        </View>

        {/* company name */}
        <View style={Styles.userDetailsView}>
          <View style={Styles.leftView}>
            <Text style={Styles.companyName}>Company Name</Text>
            <Text style={[Styles.companyName, {color: '#000', fontSize: 18}]}>
              :
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text numberOfLines={2} style={Styles.companyName2}>
              {companyName !== null ? companyName : 'not available'}
            </Text>
          </View>
        </View>

        {/* email */}
        <View style={Styles.userDetailsView}>
          <View style={Styles.leftView}>
            <Text style={Styles.companyName}>Email</Text>
            <Text style={[Styles.companyName, {color: '#000', fontSize: 18}]}>
              :
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text numberOfLines={2} style={Styles.companyName2}>
              {email !== null ? email : 'not available'}
            </Text>
          </View>
        </View>
      </View>
      {/* </View> */}

      {/* company details end */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        style={Styles.button}>
        <Text style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
          Edit Company Info
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
