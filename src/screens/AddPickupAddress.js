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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { GREEN_COLOR, LIGHT_GREEN } from '../assets/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
const data = [
  { label: 'Item 1', value: 'hello world' },
  { label: 'Item 2', value: 'hello world 2' },
  { label: 'Item 2', value: 'hello world 2' },
  { label: 'Item 2', value: 'hello world 2' },
  { label: 'Item 2', value: 'hello world 2' },
];

const AddPickupAddress = ({ navigation }) => {
  const { user, customer } = useSelector(state => state.userSlice);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(false);
  const [rtoCheckedButton, setrtoCheckedButton] = useState(false);
  const [dropDownButton, setdropDownButton] = useState(false);
  const [pickupAddress, setPickupAddress] = useState({
    user_id: user.id,
    address_type: "",
    contact_person: "",
    contact_person_no: "",
    contact_person_email: "",
    contact_person_alt_no: "",
    complete_address: "",
    landmark: "",
    postcode: "",
    city: "",
    state: "",
    country: "India",
    is_default: "",
  })
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        {/* back button */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <Image
            source={require('../assets/images/back.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Add Pickup Address</Text>
      </View>
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
          style={{ flex: 1, resizeMode: 'cover', width: width }}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          padding: 10,
          paddingBottom: 50,
          backgroundColor: '#e6ffef',
        }}>
        {/* location */}
        <View style={styles.currentLocationView}>
          <Image
            source={require('../assets/images/location.png')}
            style={{ width: 20, height: 20, tintColor: GREEN_COLOR }}
          />
          <Text
            numberOfLines={1}
            style={{
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            location
          </Text>
        </View>
        {/* location address view text */}
        <View
          style={{
            backgroundColor: '#ffff',
            paddingHorizontal: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          <Text style={styles.addressText1}>kolkata west bengal 700091</Text>
          <View style={styles.primaryAddressView}>
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
                      ? [styles.primaryBtn, { borderWidth: 0 }]
                      : styles.primaryBtn
                  }>
                  {primaryAddress ? (
                    <Image
                      source={require('../assets/images/check1.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
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
              color: '#000',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
            }}>
            Pick Up Address
          </Text>
        </View>

        <View style={styles.PickUpAddressParentView}>
          
          <TextInput
            placeholder="Contact Person Name"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.contact_person}
            onChangeText={text => setPickupAddress({ ...pickupAddress, contact_person: text })}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.contact_person_no}
            onChangeText={text => setPickupAddress({ ...pickupAddress, contact_person_no: text })}
            keyboardType='number-pad'
            maxLength={10}
          />
          <TextInput
            placeholder="Alternate Phone Number (Optional)"
            placeholderTextColor={'#808080'}
            style={styles.addressInput}
            value={pickupAddress.contact_person_alt_no}
            onChangeText={text => setPickupAddress({ ...pickupAddress, contact_person_alt_no: text })}
            keyboardType='number-pad'
            maxLength={10}
          />
          <TextInput
            placeholder="Email Id"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.contact_person_email}
            onChangeText={text => setPickupAddress({ ...pickupAddress, contact_person_email: text })}
          />
          <TextInput
            placeholder="Complete Address"
            multiline
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.complete_address}
            onChangeText={text => setPickupAddress({ ...pickupAddress, complete_address: text })}
          />
        
          <TextInput
            placeholder="Landmark (Optional)"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.landmark}
            onChangeText={text => setPickupAddress({ ...pickupAddress, landmark: text })}
          />
          <TextInput
            placeholder="Postal Code"
            placeholderTextColor={'#808080'}
            value={pickupAddress.postcode}
            onChangeText={text => setPickupAddress({ ...pickupAddress, postcode: text })}
            style={styles.addressInput}
            keyboardType='number-pad'
            maxLength={6}
          />
          <TextInput
            placeholder="City"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.city}
            onChangeText={text => setPickupAddress({ ...pickupAddress, city: text })}
          />
          <TextInput
            placeholder="State"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.state}
            onChangeText={text => setPickupAddress({ ...pickupAddress, state: text })}
          />
          <TextInput
            placeholder="Country"
            style={styles.addressInput}
            placeholderTextColor={'#808080'}
            value={pickupAddress.country}
            // onChangeText={text=>setPickupAddress({...pickupAddress, address_type: text})}
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
            <View style={{ marginBottom: 20, marginVertical: 5 }}>
              <Text style={{ fontSize: 12, color: '#999999' }}>
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
                  dropDownButton && { borderColor: 'blue' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                containerStyle={{ marginTop: 5, borderRadius: 5 }}
                activeColor="#e6ffef"
                itemContainerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  marginTop: 5,
                }}
                itemTextStyle={{ color: '#000' }}
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
                  style={{ height: 1, backgroundColor: '#ccc', flex: 0.46 }}
                />
                <Text
                  style={{ fontFamily: 'Poppins-SemiBold', color: '#b3b3b3' }}>
                  OR
                </Text>
                <View
                  style={{ height: 1, backgroundColor: '#ccc', flex: 0.46 }}
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
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#000' }}>
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
          style={{
            marginVertical: 10,
            marginBottom: 20,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#ffff',
              fontFamily: 'Poppins-Regular',
            }}>
            Save Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  header: {
    backgroundColor: '#e6ffef',
    height: height / 7,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'center',
    marginBottom: 5,
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    // marginLeft: width / 6,
    textAlign: 'center',
    // marginLeft: 64,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-start',
    top: 40,
    left: 20,
  },
  mapView: {
    flex: 1,
    backgroundColor: '#585858',
  },
  currentLocationView: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  addressText1: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  primaryAddressView: {
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#808080',
  },
  primaryAddressViewChild: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  primaryBtn: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: '#a6a6a6',
  },
  PickUpAddressParentView: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#a6a6a6',
    backgroundColor: '#ffff',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#a6a6a6',
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
    padding: 0,
    marginHorizontal: 10,
    marginTop: 10,
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
});
