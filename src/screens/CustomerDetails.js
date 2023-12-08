import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';
import {
  PRIMARY_TEXT_SEM,
  TEXT_BLACK,
  TEXT_BLACK2,
  TEXT_WHITE,
} from '../assets/fontStyles';
import {useDispatch, useSelector} from 'react-redux';
import keyMapping from '../config/keyMapping';
import axios from 'axios';
import {BASE_URL_LIVE} from '../config/api';
import RBSheet from 'react-native-raw-bottom-sheet';

const CustomerDetails = ({navigation}) => {
  const height = Dimensions.get('window').height;

  const [BillingAddressNotSame, setBillingAddressNotSame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);
  // console.log(selectedAddress);

  const refRBSheet = useRef();
  const [searchAddress, setSearchAddress] = useState('');

  const [shippingDetails, setShippingDetails] = useState({
    shipping_first_name: '',
    shipping_last_name: '',
    shipping_phone: '',
    shipping_email: '',
    shipping_address_1: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_pincode: '',
    shipping_state: '',
    shipping_country: 'India',
  });
  const [billingDetails, setBillingDetails] = useState({
    billing_first_name: '',
    billing_last_name: '',
    billing_phone: '',
    billing_email: '',
    billing_address_1: '',
    billing_address_2: '',
    billing_city: '',
    billing_pincode: '',
    billing_state: '',
    billing_country: 'India',
  });
  const {create_order_Data} = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  // console.log(create_order_Data);
  // console.log("shippingDetails==>", shippingDetails);
  // console.log("billingDetails==>", billingDetails);

  const createOrder = () => {
    if (!BillingAddressNotSame) {
      for (const key in keyMapping) {
        if (
          shippingDetails.hasOwnProperty(key) &&
          billingDetails.hasOwnProperty(keyMapping[key])
        ) {
          billingDetails[keyMapping[key]] = shippingDetails[key];
        }
      }

      const mergedObj = {
        ...shippingDetails,
        ...billingDetails,
        ...create_order_Data,
      };
      console.log('mergedObj==>', mergedObj);
      // handleLogin(mergedObj);
    } else {
      const mergedObj = {
        ...shippingDetails,
        ...billingDetails,
        ...create_order_Data,
      };
      console.log('mergedObj==>', mergedObj);
      // handleLogin(mergedObj);
    }
  };

  const handleLogin = async data => {
    try {
      setIsLoading(true); // Start loading
      // const response = await axios.post(`${BASE_URL_LIVE}/create-order`, data);
      const response = []; // galti se press na hojae
      console.log('response=====> ', response.data);
      if (response.data.code == '200') {
        // navigation.dispatch('BottomHomeScreen');
      }
      setIsLoading(false); // Stop loading
    } catch (error) {
      setIsLoading(false); // Stop loading
      Alert.alert(`Network Error`, `check internet connection`);
      console.log('customer details- login err:', error);
    }
  };

  const usersData = [
    {
      name: 'John Doe',
      number: '123-456-7890',
      address: '123 Main Street, City, Country',
    },
    {
      name: 'Jane Smith',
      number: '987-654-3210',
      address: '456 Oak Avenue, Town, Country',
    },
    {
      name: 'Alice Johnson',
      number: '555-123-4567',
      address: '789 Elm Road, Village, Country',
    },
    {
      name: 'Bob Brown',
      number: '111-222-3333',
      address: '321 Maple Lane, Town, Country',
    },
    {
      name: 'Sarah Davis',
      number: '444-555-6666',
      address: '567 Pine Street, City, Country',
    },
    {
      name: 'Michael Wilson',
      number: '222-333-4444',
      address: '888 Oak Street, Town, Country',
    },
    {
      name: 'Emily Anderson',
      number: '777-888-9999',
      address: '999 Elm Road, Village, Country',
    },
    {
      name: 'Alex Turner',
      number: '555-777-8888',
      address: '456 Birch Lane, City, Country',
    },
    {
      name: 'Olivia Robinson',
      number: '123-987-6543',
      address: '789 Cedar Avenue, Town, Country',
    },
    {
      name: 'Daniel Murphy',
      number: '555-444-3333',
      address: '321 Walnut Street, Village, Country',
    },
    {
      name: 'Sophia Turner',
      number: '111-222-3333',
      address: '654 Pine Avenue, City, Country',
    },
    {
      name: 'William Harris',
      number: '777-888-9999',
      address: '123 Cedar Road, Town, Country',
    },
    {
      name: 'Grace Thompson',
      number: '555-333-2222',
      address: '987 Elm Lane, Village, Country',
    },
    {
      name: 'Ethan Adams',
      number: '222-333-4444',
      address: '111 Oak Street, City, Country',
    },
    {
      name: 'Ava Campbell',
      number: '444-555-6666',
      address: '456 Maple Avenue, Town, Country',
    },
    {
      name: 'James Stewart',
      number: '123-987-6543',
      address: '789 Pine Road, Village, Country',
    },
    {
      name: 'Mia Turner',
      number: '555-777-8888',
      address: '222 Cedar Lane, City, Country',
    },
    {
      name: 'Benjamin Clark',
      number: '111-222-3333',
      address: '654 Elm Street, Town, Country',
    },
    {
      name: 'Charlotte White',
      number: '777-888-9999',
      address: '321 Oak Road, Village, Country',
    },
    {
      name: 'Henry Green',
      number: '555-444-3333',
      address: '888 Maple Avenue, City, Country',
    },
  ];
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  // console.log('filtered Users Data : ', filteredUsers);

  const handleSearch = text => {
    setSearchText(text);

    // Filter users based on the entered text
    const filteredData = usersData.filter(users => {
      const searchTextLowerCase = text.toLowerCase();
      return (
        users.name.toLowerCase().includes(searchTextLowerCase) ||
        users.number.includes(searchText) ||
        users.address.toLowerCase().includes(searchTextLowerCase)
      );
    });

    setFilteredUsers(filteredData);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Customer Details"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.title2View}>
        <Text style={styles.title2text}>Add Customer Details</Text>
      </View>
      <ScrollView
        style={{flex: 1, paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.selectCustomerParentView}>
          <Text style={styles.selectCustomerText}>Select Customer</Text>
          <View style={styles.selectCustomerAddress}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={styles.selectCustomerAddressButton}>
              <Text
                style={{
                  color: '#404040',
                  fontFamily: 'Poppins-Regular',
                }}
                numberOfLines={1}>
                {selectedAddress.length !== 0
                  ? selectedAddress.name
                  : 'Select Customer Address'}
              </Text>
              {selectedAddress.length === 0 && (
                <Image
                  source={require('../assets/images/search-icon.png')}
                  style={{width: 22, height: 22, tintColor: GREEN_COLOR}}
                />
              )}
            </TouchableOpacity>
            {/* clear button for selected customer */}
            {selectedAddress.length !== 0 && (
              <Pressable
                onPress={() => setSelectedAddress([])}
                style={styles.clearSelectedAddressButton}>
                <Image
                  source={require('../assets/images/close.png')}
                  style={{width: 15, height: 15}}
                />
              </Pressable>
            )}
          </View>
        </View>
        {/* divider start  */}
        <View style={styles.DividerParent}>
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.4}} />
          <Text style={{fontFamily: 'Poppins-SemiBold', color: '#666'}}>
            OR
          </Text>
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.4}} />
        </View>
        {/* divider end  */}
        <View style={styles.enterCustomerDetailsParentView}>
          <Text style={styles.customerTitle}>Add Buyer's Details</Text>
          <Text style={{color: '#808080', fontSize: 12}}>
            To whom is the order being delivered? (Buyer's Info)
          </Text>
          {/* Buyer's Details  */}
          <View>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_first_name}
              onChangeText={text =>
                setShippingDetails({
                  ...shippingDetails,
                  shipping_first_name: text,
                })
              }
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
              value={shippingDetails.shipping_last_name}
              onChangeText={text =>
                setShippingDetails({
                  ...shippingDetails,
                  shipping_last_name: text,
                })
              }
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="number-pad"
              value={shippingDetails.shipping_phone}
              onChangeText={text =>
                setShippingDetails({...shippingDetails, shipping_phone: text})
              }
              maxLength={10}
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
              value={shippingDetails.shipping_email}
              onChangeText={text =>
                setShippingDetails({...shippingDetails, shipping_email: text})
              }
            />
            <Text style={{fontSize: 11, color: '#808080', marginTop: 10}}>
              Where is the order being delivered to?{' '}
              <Text
                style={{
                  color: TEXT_BLACK2,
                  fontFamily: PRIMARY_TEXT_SEM,
                  fontSize: 12,
                }}>
                (Buyer's Address)
              </Text>
            </Text>
            <TextInput
              placeholder="House/Floor number.bulding name or street,Locality"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
              value={shippingDetails.shipping_address_1}
              onChangeText={text =>
                setShippingDetails({
                  ...shippingDetails,
                  shipping_address_1: text,
                })
              }
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
              value={shippingDetails.shipping_address_2}
              onChangeText={text =>
                setShippingDetails({
                  ...shippingDetails,
                  shipping_address_2: text,
                })
              }
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_city}
              onChangeText={text =>
                setShippingDetails({...shippingDetails, shipping_city: text})
              }
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_pincode}
              onChangeText={text =>
                setShippingDetails({...shippingDetails, shipping_pincode: text})
              }
              maxLength={6}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_state}
              onChangeText={text =>
                setShippingDetails({...shippingDetails, shipping_state: text})
              }
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_country}
              // onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_country: text })}
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setBillingAddressNotSame(!BillingAddressNotSame);
              }}
              style={{padding: 5}}>
              <Image
                source={
                  BillingAddressNotSame
                    ? require('../assets/images/check1.png')
                    : require('../assets/images/empty-checkbox.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <Text style={{color: TEXT_BLACK2}}>
              Billing address is not same as Shiping Address
            </Text>
          </View>
        </View>
        {/* Billing address is not same as Shiping start  */}
        {BillingAddressNotSame ? (
          <View style={styles.enterCustomerDetailsParentView}>
            <Text style={{fontFamily: PRIMARY_TEXT_SEM, color: TEXT_BLACK2}}>
              Billing Address
            </Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_first_name}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_first_name: text})
              }
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
              value={billingDetails.billing_last_name}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_last_name: text})
              }
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_phone}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_phone: text})
              }
              keyboardType="number-pad"
              maxLength={10}
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
              value={billingDetails.billing_email}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_email: text})
              }
            />
            <TextInput
              placeholder="House/Floor number.bulding name or street,Locality"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
              value={billingDetails.billing_address_1}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_address_1: text})
              }
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
              value={billingDetails.billing_address_2}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_address_2: text})
              }
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_city}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_city: text})
              }
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_pincode}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_pincode: text})
              }
              maxLength={6}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_state}
              onChangeText={text =>
                setBillingDetails({...billingDetails, billing_state: text})
              }
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_country}
              // onChangeText={text => setBillingDetails({ ...billingDetails, billing_country: text })}
              editable={false}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.AddOrderBtn}
          onPress={() => createOrder()}>
          <Text style={styles.AddOrderBtnText}>Add Order</Text>
        </TouchableOpacity>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={height / 1.1}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          draggableIcon: {
            // backgroundColor: '#000',
            padding: 0,
            width: 0,
            height: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View style={{flex: 1, backgroundColor: '#ffff'}}>
          <TouchableOpacity
            style={styles.bottomSheetCloseButton}
            onPress={() => refRBSheet.current.close()}>
            <Image
              source={require('../assets/images/close1.png')}
              style={styles.bottomSheetCloseButtonImage}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Customer"
            placeholderTextColor={'#666'}
            // value={searchAddress}
            // onChangeText={setSearchAddress}
            style={styles.bottomSheetSearchBar}
            onChangeText={handleSearch}
            value={searchText}
          />
          {searchText !== '' && filteredUsers.length === 0 && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#404040', fontFamily: 'Poppins-Regular'}}>
                No results found!
              </Text>
              <Image
                source={require('../assets/images/no-results.png')}
                style={{width: 30, height: 30}}
              />
            </View>
          )}
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              const firstLetter = item.name.charAt(0);
              return (
                <View style={styles.RBSheetFlatListParentView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAddress(item);
                      refRBSheet.current.close();
                    }}
                    style={{flexDirection: 'row'}}>
                    <View style={styles.RBSheetFlatListParentChild}>
                      <Text
                        style={{
                          color: 'green',
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 18,
                        }}>
                        {firstLetter}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#404040',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#737373',
                          fontSize: 13,
                        }}>
                        {item.number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default CustomerDetails;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  title2View: {
    backgroundColor: '#ffff',
    paddingVertical: 8,
    paddingLeft: 10,
    // marginHorizontal: 10,
    marginVertical: 4,
    elevation: 1,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  title2text: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    marginLeft: 10,
  },
  selectCustomerParentView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  selectCustomerText: {
    color: TEXT_BLACK2,
    fontFamily: 'Poppins-SemiBold',
  },
  selectCustomerAddress: {
    flexDirection: 'row',
    height: height / 18,
    backgroundColor: '#ffff',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  selectCustomerAddressButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 15,
    flexDirection: 'row',
  },
  DividerParent: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  enterCustomerDetailsParentView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  customerTitle: {
    color: TEXT_BLACK2,
    fontFamily: 'Poppins-SemiBold',
  },
  buyerDetailInput: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    padding: 0,
    height: height / 18,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  AddOrderBtn: {
    backgroundColor: TEXT_BLACK,
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddOrderBtnText: {
    color: TEXT_WHITE,
    fontSize: 15,
    fontFamily: PRIMARY_TEXT_SEM,
  },
  clearSelectedAddressButton: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  // RBSheet Styles
  bottomSheetCloseButton: {
    marginRight: 20,
    marginVertical: 5,
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 20,
  },
  bottomSheetCloseButtonImage: {
    width: 18,
    height: 18,
    tintColor: GREEN_COLOR,
  },
  bottomSheetSearchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
    // marginVertical: 10,
    padding: 0,
    height: height / 18,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  RBSheetFlatListParentView: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 7,
    padding: 5,
    elevation: 1,
  },
  RBSheetFlatListParentChild: {
    backgroundColor: LIGHT_GREEN,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
