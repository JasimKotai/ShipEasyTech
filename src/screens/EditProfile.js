import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';
import {Styles} from '../css/ProfileScreenCSS';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EditProfile = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [email, setEmail] = useState(null);
  const [website, setWebsite] = useState(null);
  const {user, customer} = useSelector(state => state.userSlice);

  useEffect(() => {
    if (user) {
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
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <Header
        title="Edit Profile"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* profile/company logo picture view start */}
        <View style={Styles.profileParent}>
          <Text style={Styles.title}>Company Logo</Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              borderRadius: 5,
              padding: 10,
              elevation: 0.4,
            }}>
            <TouchableOpacity
              onPress={handleGalleryPermission}
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#FFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: GREEN_COLOR,
                }}>
                <Image
                  source={
                    profile !== null
                      ? {uri: profile}
                      : require('../assets/images/profile-user.png')
                  }
                  style={{
                    width: 117,
                    height: 117,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
              <Image
                source={require('../assets/images/edit.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: GREEN_COLOR,
                  margin: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* profile/company logo picture view end */}

        {/* company details view start */}
        <View style={styles.compamyParentView}>
          <Text style={styles.companyTitle}>Company Details</Text>
          {/* company name */}
          <View style={{marginTop: 5}}>
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              placeholder="Company"
              value={companyName}
              onChangeText={setCompanyName}
              placeholderTextColor={'#808080'}
              style={styles.companyInput}
            />
          </View>
          {/* email */}
          <View style={{marginTop: 5}}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              editable={false}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={'#808080'}
              style={[styles.companyInput, {backgroundColor: '#e6e6e6'}]}
            />
          </View>
          {/* website */}
          <View style={{marginTop: 5}}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              placeholder="http://www.abc.com"
              value={website}
              onChangeText={setWebsite}
              placeholderTextColor={'#808080'}
              style={[styles.companyInput]}
            />
          </View>
        </View>
        {/* company details view end */}
        {/* save button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  compamyParentView: {
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    elevation: 1,
  },
  companyTitle: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
  },
  companyInput: {
    padding: 4,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    elevation: 0.4,
    color: '#404040',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'aliceblue',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  label: {
    color: '#595959',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    backgroundColor: '#000',
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
