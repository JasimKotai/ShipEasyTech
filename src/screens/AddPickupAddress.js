import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Linking,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  localStorage,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import {TEXT_BLACK2, TEXT_LIGHT_BLACK} from '../assets/fontStyles';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
  {label: 'Item 1', value: 'hello world'},
  {label: 'Item 2', value: 'hello world 2'},
  {label: 'Item 2', value: 'hello world 2'},
  {label: 'Item 2', value: 'hello world 2'},
  {label: 'Item 2', value: 'hello world 2'},
];

const AddPickupAddress = ({navigation}) => {
  const scrollViewRef = useRef();

  const {user, customer} = useSelector(state => state.userSlice);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(false);
  const [rtoCheckedButton, setrtoCheckedButton] = useState(false);
  const [dropDownButton, setdropDownButton] = useState(false);
  const [pickupAddress, setPickupAddress] = useState({
    user_id: user.id,
    address_type: '',
    contact_person: '',
    contact_person_no: '',
    contact_person_email: '',
    contact_person_alt_no: '',
    complete_address: '',
    landmark: '',
    postcode: '',
    city: '',
    state: '',
    country: 'India',
    is_default: 'Home',
  });
  // console.log(currentLocation);
  const handleLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        const granted = await PermissionsAndroid.request(permission);
        // console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('location Permission granted android');
          //   geolocation();
        } else {
          console.log(' location Permission denied');
          Linking.openSettings();
        }
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const geolocation = () => {
    Geolocation.getCurrentPosition(info => console.log(info));
  };

  const handleSaveAddress = () => {
    if (
      pickupAddress.contact_person.length === 0 ||
      pickupAddress.contact_person_no.length < 10 ||
      pickupAddress.contact_person_email.length === 0 ||
      pickupAddress.complete_address.length === 0 ||
      pickupAddress.postcode.length === 0 ||
      pickupAddress.city.length === 0 ||
      pickupAddress.state.length === 0 ||
      pickupAddress.country.length === 0
    ) {
      console.log('some fields are empty');
      handleValidation();
    } else {
      // console.log('all field are filled');
      handleSetData();
    }
  };

  const [checkEmptyFields, setCheckEmptyFields] = useState({
    contact_person: false,
    contact_person_no: false,
    contact_person_email: false,
    complete_address: false,
    postcode: false,
    city: false,
    state: false,
    country: false,
  });

  // console.log('checkEmptyFields --- ', checkEmptyFields);

  const handleValidation = () => {
    scrollViewRef.current.scrollTo({y: height / 4.5, animated: true});
    setCheckEmptyFields({
      ...checkEmptyFields,
      contact_person: pickupAddress.contact_person.length === 0,
      contact_person_no: pickupAddress.contact_person_no.length < 10,
      contact_person_email: pickupAddress.contact_person_email.length === 0,
      complete_address: pickupAddress.complete_address.length === 0,
      postcode: pickupAddress.postcode.length === 0,
      city: pickupAddress.city.length === 0,
      state: pickupAddress.state.length === 0,
      country: pickupAddress.country.length === 0,
    });
  };

  const handleSetData = async () => {
    try {
      const key = 'SavedAddress';
      const newData = pickupAddress;

      const existingData = JSON.parse(await AsyncStorage.getItem(key)) || [];
      const updatedData = [...existingData, newData];

      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      Alert.alert('Address Saved', 'successful');
      navigation.goBack();
    } catch (error) {
      console.error('AddPickUpAddress Screen Error handling data: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Header
        title="Add Pickup Address"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.mapView}>
        {/* <MapView
          initialRegion={{
            latitude: 22.5727991,
            longitude: 88.436594,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        /> */}
        <Image
          source={require('../assets/images/map-image.jpeg')}
          style={{flex: 1, resizeMode: 'cover', width: width}}
        />
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          handleLocationPermission();
        }}
        style={{backgroundColor: 'red', padding: 20}}>
        <Text>Press</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          geolocation();
        }}
        style={{backgroundColor: 'red', padding: 20}}>
        <Text>Press</Text>
      </TouchableOpacity> */}
      <View style={{flex: 1, paddingTop: 10, backgroundColor: '#e6ffef'}}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 0,
            paddingBottom: 50,
            backgroundColor: '#e6ffef',
          }}>
          {/* location address view text */}
          <View style={styles.LocationAddressView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Image
                source={require('../assets/images/location.png')}
                style={{width: 18, height: 18, tintColor: GREEN_COLOR}}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: '#404040',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                location
              </Text>
            </View>
            <Text style={styles.addressText1}>kolkata west bengal 700091</Text>
            <View style={styles.primaryAddressViewChild}>
              <Text
                style={{
                  color: '#808080',
                  fontFamily: 'Poppins-Regular',
                }}>
                Set This Address as Primary
              </Text>
              {/* set primary address button */}
              <TouchableOpacity
                onPress={() => {
                  setPrimaryAddress(!primaryAddress);
                }}>
                <View
                  style={
                    primaryAddress
                      ? [styles.primaryBtn, {backgroundColor: GREEN_COLOR}]
                      : styles.primaryBtn
                  }>
                  {primaryAddress ? (
                    <Image
                      source={require('../assets/images/check-mark.png')}
                      style={{width: 20, height: 20}}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* pick up address  */}
          <View
            style={{
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: '#404040',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Pick Up Address
            </Text>
          </View>

          <View style={styles.PickUpAddressParentView}>
            {/* home or office or other radio button view */}
            <View style={styles.homeOROfficeAddressView}>
              {/* home address */}
              <TouchableOpacity
                onPress={() => {
                  setPickupAddress({...pickupAddress, is_default: 'Home'});
                }}
                style={styles.homeAddressBtn}>
                <View style={styles.homeOROfficeAddressChil}>
                  <View
                    style={{
                      backgroundColor:
                        pickupAddress.is_default == 'Home'
                          ? GREEN_COLOR
                          : '#ffff',
                      width: 18,
                      height: 18,
                      borderRadius: 20,
                    }}
                  />
                </View>

                <Text
                  style={{color: TEXT_BLACK2, fontFamily: 'Poppins-Regular'}}>
                  Home
                </Text>
              </TouchableOpacity>
              {/* office address*/}
              <TouchableOpacity
                onPress={() => {
                  setPickupAddress({...pickupAddress, is_default: 'Office'});
                }}
                style={styles.homeAddressBtn}>
                <View style={styles.homeOROfficeAddressChil}>
                  <View
                    style={{
                      backgroundColor:
                        pickupAddress.is_default == 'Office'
                          ? GREEN_COLOR
                          : '#ffff',
                      width: 18,
                      height: 18,
                      borderRadius: 20,
                    }}
                  />
                </View>

                <Text
                  style={{color: TEXT_BLACK2, fontFamily: 'Poppins-Regular'}}>
                  Office
                </Text>
              </TouchableOpacity>
              {/* Others address*/}
              <TouchableOpacity
                onPress={() => {
                  setPickupAddress({...pickupAddress, is_default: 'Others'});
                }}
                style={styles.homeAddressBtn}>
                <View style={styles.homeOROfficeAddressChil}>
                  <View
                    style={{
                      backgroundColor:
                        pickupAddress.is_default == 'Others'
                          ? GREEN_COLOR
                          : '#ffff',
                      width: 18,
                      height: 18,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <Text
                  style={{color: TEXT_BLACK2, fontFamily: 'Poppins-Regular'}}>
                  Others
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Contact Person Name"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.contact_person ? 'red' : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.contact_person}
              onChangeText={text => {
                setPickupAddress({...pickupAddress, contact_person: text});

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  contact_person: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="Phone Number"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.contact_person_no
                    ? 'red'
                    : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.contact_person_no}
              onChangeText={text => {
                // setPickupAddress({...pickupAddress, contact_person_no: text})
                const filteredText = text.replace(/[^0-9]/g, '');
                setPickupAddress({
                  ...pickupAddress,
                  contact_person_no: filteredText,
                });

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  contact_person_no: text.length < 10,
                }));
              }}
              keyboardType="number-pad"
              maxLength={10}
            />
            <TextInput
              placeholder="Alternate Phone Number (Optional)"
              placeholderTextColor={'#808080'}
              style={styles.addressInput}
              value={pickupAddress.contact_person_alt_no}
              onChangeText={text =>
                setPickupAddress({
                  ...pickupAddress,
                  contact_person_alt_no: text,
                })
              }
              keyboardType="number-pad"
              maxLength={10}
            />
            <TextInput
              placeholder="Email Id"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.contact_person_email
                    ? 'red'
                    : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.contact_person_email}
              onChangeText={text => {
                setPickupAddress({
                  ...pickupAddress,
                  contact_person_email: text,
                });

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  contact_person_email: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="Complete Address"
              multiline
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.complete_address
                    ? 'red'
                    : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.complete_address}
              onChangeText={text => {
                setPickupAddress({...pickupAddress, complete_address: text});

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  complete_address: text.length === 0,
                }));
              }}
            />

            <TextInput
              placeholder="Landmark (Optional)"
              style={styles.addressInput}
              placeholderTextColor={'#808080'}
              value={pickupAddress.landmark}
              onChangeText={text =>
                setPickupAddress({...pickupAddress, landmark: text})
              }
            />
            <TextInput
              placeholder="Postal Code"
              placeholderTextColor={'#808080'}
              value={pickupAddress.postcode}
              onChangeText={text => {
                setPickupAddress({...pickupAddress, postcode: text});

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  postcode: text.length === 0,
                }));
              }}
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.postcode ? 'red' : '#ccc',
                },
              ]}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TextInput
              placeholder="City"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.city ? 'red' : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.city}
              onChangeText={text => {
                setPickupAddress({...pickupAddress, city: text});

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  city: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="State"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.state ? 'red' : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.state}
              onChangeText={text => {
                setPickupAddress({...pickupAddress, state: text});

                setCheckEmptyFields(prevCheckEmptyFields => ({
                  ...prevCheckEmptyFields,
                  state: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="Country"
              style={[
                styles.addressInput,
                {
                  borderColor: checkEmptyFields.country ? 'red' : '#ccc',
                },
              ]}
              placeholderTextColor={'#808080'}
              value={pickupAddress.country}
              // onChangeText={text => {
              //   setPickupAddress({...pickupAddress, country: text});

              //   setCheckEmptyFields(prevCheckEmptyFields => ({
              //     ...prevCheckEmptyFields,
              //     country: text.length === 0,
              //   }));
              // }}
              editable={false}
            />
          </View>
          {/* RTO address */}
          {/* <View style={{ padding: 10 }}>
          <Text style={styles.RTOAddressTitle}>RTO Address</Text>
        </View> */}
          {/* <View style={styles.RTOAddress}>
          <View style={styles.RTOAddressButtonView}> */}
          {/* <Text
              style={{
                color: '#808080',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              Use different address as RTO Address
            </Text> */}
          {/* set primary address button */}
          {/* <TouchableOpacity
              onPress={() => {
                setrtoCheckedButton(!rtoCheckedButton);
              }}>
              <View
                style={
                  rtoCheckedButton
                    ? [styles.RTOCheckedButton, { borderWidth: 0 }]
                    : styles.RTOCheckedButton
                }>
                {rtoCheckedButton ? (
                  <Image
                    source={require('../assets/images/check1.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ) : null}
              </View>
            </TouchableOpacity> */}
          {/* </View>
        </View> */}
          {rtoCheckedButton ? (
            <>
              <View style={{marginBottom: 20, marginVertical: 5}}>
                <Text style={{fontSize: 12, color: '#999999'}}>
                  Note : RTO is only applicable for Ecom express
                </Text>
              </View>
              {/* RTO select existing address */}
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: '#ffff',
                  padding: 10,
                  marginBottom: 10,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#000',
                    fontSize: 15,
                  }}>
                  Select Existing Address
                </Text>
                {/* select rto address */}
                {/* DropDown start*/}
                <Dropdown
                  style={[
                    styles.dropdown,
                    dropDownButton && {borderColor: 'blue'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  // search
                  containerStyle={{marginTop: 5, borderRadius: 5}}
                  activeColor="#e6ffef"
                  itemContainerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    marginTop: 5,
                  }}
                  itemTextStyle={{color: '#000'}}
                  maxHeight={190}
                  showsVerticalScrollIndicator={false}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select RTO Address'}
                  searchPlaceholder="Search..."
                  // value={value}
                  // onChange={item => {
                  //   setValue(item.value);
                  //   setIsFocus(false);
                  // }}
                />
                {/* DropDown end*/}

                {/* OR divider */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{height: 1, backgroundColor: '#ccc', flex: 0.46}}
                  />
                  <Text
                    style={{fontFamily: 'Poppins-SemiBold', color: '#b3b3b3'}}>
                    OR
                  </Text>
                  <View
                    style={{height: 1, backgroundColor: '#ccc', flex: 0.46}}
                  />
                </View>
                {/* Add new address button in RTO */}
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: GREEN_COLOR,
                    width: width / 2,
                    alignSelf: 'center',
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: LIGHT_GREEN,
                  }}>
                  <Text style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                    + Add New Address
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop: 5,
                    color: '#b3b3b3',
                  }}>
                  Note: New address will be saved as a pickup address
                </Text>
              </View>
            </>
          ) : null}
          <TouchableOpacity
            onPress={handleSaveAddress}
            style={styles.SaveAddressButton}>
            <Text
              style={{
                fontSize: 15,
                color: 'aliceblue',
                fontFamily: 'Poppins-Regular',
              }}>
              Save Address
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddPickupAddress;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  mapView: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#585858',
  },
  LocationAddressView: {
    backgroundColor: '#ffff',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 15,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  addressText1: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  primaryAddressViewChild: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    elevation: 1,
    borderRadius: 5,
  },
  primaryBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  PickUpAddressParentView: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
    padding: 0,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  RTOAddress: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    // marginBottom: 20,
  },
  RTOAddressTitle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  RTOAddressButtonView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingRight: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
  RTOCheckedButton: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: '#a6a6a6',
  },
  dropdown: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  iconStyle: {
    width: 30,
    resizeMode: 'cover',
    tintColor: GREEN_COLOR,
    height: 30,
  },
  homeOROfficeAddressView: {
    height: 45,
    backgroundColor: '#ffff',
    flexDirection: 'row',
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  homeOROfficeAddressChil: {
    backgroundColor: '#f2f2f2',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'aliceblue',
  },
  homeAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width / 4.5,
    borderRadius: 5,
    // backgroundColor: 'red'
  },
  homeAddressBtnImg: {
    width: 17,
    height: 17,
  },
  SaveAddressButton: {
    paddingVertical: 8,
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
