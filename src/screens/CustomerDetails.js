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
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';
import {
  PRIMARY_TEXT_REG,
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
  const width = Dimensions.get('window').width;

  const [BillingAddressNotSame, setBillingAddressNotSame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);

  const refRBSheet = useRef();
  const scrollViewRef = useRef();

  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  // console.log('filtered Users Data : ', filteredUsers);

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
      setIsLoading(true);
      // const response = await axios.post(`${BASE_URL_LIVE}/create-order`, data);
      const response = []; // galti se press na hojae
      console.log('response=====> ', response.data);
      if (response.data.code == '200') {
        // navigation.dispatch('BottomHomeScreen');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Network Error', 'check internet connection');
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
      name: 'Henry Green',
      number: '555-444-3333',
      address: '888 Maple Avenue, City, Country',
    },
  ];

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

  const handleAddOrder = () => {
    if (selectedAddress.length !== 0 && !BillingAddressNotSame) {
      console.log('customer selected and billing is same');
      // call api
    } else if (selectedAddress.length !== 0 && BillingAddressNotSame) {
      if (
        billingDetails.billing_first_name.length > 0 &&
        billingDetails.billing_last_name.length > 0 &&
        billingDetails.billing_phone.length === 10 &&
        billingDetails.billing_email.length > 0 &&
        billingDetails.billing_address_1.length >= 10 &&
        billingDetails.billing_city.length >= 3 &&
        billingDetails.billing_pincode.length === 6 &&
        billingDetails.billing_state.length >= 3 &&
        billingDetails.billing_country.length > 0
      ) {
        console.log('calling api..');
      } else {
        const validation = 'customerSelectedBillingIsNotSame';
        handleShippingValidation(validation);
        console.log('customer selected but billing is not same');
        // console.log('calling validation..');
      }
    } else if (!BillingAddressNotSame) {
      console.log(' billing is same as shipping address....');
      if (
        BillingAddressNotSame === false &&
        shippingDetails.shipping_first_name.length > 0 &&
        shippingDetails.shipping_last_name.length > 0 &&
        shippingDetails.shipping_phone.length === 10 &&
        shippingDetails.shipping_email.length > 0 &&
        shippingDetails.shipping_address_1.length >= 10 &&
        shippingDetails.shipping_city.length >= 3 &&
        shippingDetails.shipping_pincode.length === 6 &&
        shippingDetails.shipping_state.length >= 3 &&
        shippingDetails.shipping_country.length > 0
      ) {
        console.log('calling api...-');
      } else {
        const billingIsSame = 'billingIsSame';
        handleShippingValidation(billingIsSame);
        console.log('calling validation...');
        console.log('shipping and billing is same');
      }
    } else if (BillingAddressNotSame) {
      console.log(' billing is not same as shipping address....');
      handleShippingValidation();
    }
  };

  const [emptyFields, setEmptyFields] = useState({
    shipping_first_name: false,
    shipping_last_name: false,
    shipping_phone: false,
    shipping_email: false,
    shipping_address_1: false,
    shipping_city: false,
    shipping_pincode: false,
    shipping_state: false,
    shipping_country: false,
    // Added fields for billing details
    billing_first_name: false,
    billing_last_name: false,
    billing_phone: false,
    billing_email: false,
    billing_address_1: false,
    billing_address_2: false,
    billing_city: false,
    billing_pincode: false,
    billing_state: false,
    billing_country: false,
  });

  const handleShippingValidation = data => {
    if (data === 'billingIsSame') {
      scrollViewRef.current.scrollTo({y: height / 4, animated: true});

      setEmptyFields(prevEmptyFields => ({
        ...prevEmptyFields,
        shipping_first_name: validateField(
          'shipping_first_name',
          shippingDetails.shipping_first_name,
          1,
        ),
        shipping_last_name: validateField(
          'shipping_last_name',
          shippingDetails.shipping_last_name,
          1,
        ),
        shipping_phone: validateField(
          'shipping_phone',
          shippingDetails.shipping_phone,
          10,
        ),
        shipping_email: validateField(
          'shipping_email',
          shippingDetails.shipping_email,
          1,
        ),
        shipping_address_1: validateField(
          'shipping_address_1',
          shippingDetails.shipping_address_1,
          10,
        ),
        shipping_city: validateField(
          'shipping_city',
          shippingDetails.shipping_city,
          3,
        ),
        shipping_pincode: validateField(
          'shipping_pincode',
          shippingDetails.shipping_pincode,
          6,
        ),
        shipping_state: validateField(
          'shipping_state',
          shippingDetails.shipping_state,
          3,
        ),
        shipping_country: validateField(
          'shipping_country',
          shippingDetails.shipping_country,
          1,
        ),
      }));
    } else if (data === 'customerSelectedBillingIsNotSame') {
      console.log('Hello world');
      setEmptyFields(prevEmptyFields => ({
        ...prevEmptyFields,
        billing_first_name: validateField(
          'billing_first_name',
          billingDetails.billing_first_name,
          1,
        ),
        billing_last_name: validateField(
          'billing_last_name',
          billingDetails.billing_last_name,
          1,
        ),
        billing_phone: validateField(
          'billing_phone',
          billingDetails.billing_phone,
          10,
        ),
        billing_email: validateField(
          'billing_email',
          billingDetails.billing_email,
          1,
        ),
        billing_address_1: validateField(
          'billing_address_1',
          billingDetails.billing_address_1,
          10,
        ),
        billing_address_2: validateField(
          'billing_address_2',
          billingDetails.billing_address_2,
          10,
        ),
        billing_city: validateField(
          'billing_city',
          billingDetails.billing_city,
          3,
        ),
        billing_pincode: validateField(
          'billing_pincode',
          billingDetails.billing_pincode,
          6,
        ),
        billing_state: validateField(
          'billing_state',
          billingDetails.billing_state,
          3,
        ),
        billing_country: validateField(
          'billing_country',
          billingDetails.billing_country,
          1,
        ),
      }));
    } else {
      console.log('its working....');
      setEmptyFields(prevEmptyFields => ({
        ...prevEmptyFields,
        // Update validation for shipping details with modified conditions
        shipping_first_name: validateField(
          'shipping_first_name',
          shippingDetails.shipping_first_name,
          1,
        ),
        shipping_last_name: validateField(
          'shipping_last_name',
          shippingDetails.shipping_last_name,
          1,
        ),
        shipping_phone: validateField(
          'shipping_phone',
          shippingDetails.shipping_phone,
          10,
        ),
        shipping_email: validateField(
          'shipping_email',
          shippingDetails.shipping_email,
          1,
        ),
        shipping_address_1: validateField(
          'shipping_address_1',
          shippingDetails.shipping_address_1,
          10,
        ),
        shipping_city: validateField(
          'shipping_city',
          shippingDetails.shipping_city,
          3,
        ),
        shipping_pincode: validateField(
          'shipping_pincode',
          shippingDetails.shipping_pincode,
          6,
        ),
        shipping_state: validateField(
          'shipping_state',
          shippingDetails.shipping_state,
          3,
        ),
        shipping_country: validateField(
          'shipping_country',
          shippingDetails.shipping_country,
          1,
        ),
        // Update validation for billing details with modified conditions
        billing_first_name: validateField(
          'billing_first_name',
          billingDetails.billing_first_name,
          1,
        ),
        billing_last_name: validateField(
          'billing_last_name',
          billingDetails.billing_last_name,
          1,
        ),
        billing_phone: validateField(
          'billing_phone',
          billingDetails.billing_phone,
          10,
        ),
        billing_email: validateField(
          'billing_email',
          billingDetails.billing_email,
          1,
        ),
        billing_address_1: validateField(
          'billing_address_1',
          billingDetails.billing_address_1,
          10,
        ),
        billing_address_2: validateField(
          'billing_address_2',
          billingDetails.billing_address_2,
          10,
        ),
        billing_city: validateField(
          'billing_city',
          billingDetails.billing_city,
          3,
        ),
        billing_pincode: validateField(
          'billing_pincode',
          billingDetails.billing_pincode,
          6,
        ),
        billing_state: validateField(
          'billing_state',
          billingDetails.billing_state,
          3,
        ),
        billing_country: validateField(
          'billing_country',
          billingDetails.billing_country,
          1,
        ),
      }));
    }
  };

  // Validation function
  const validateField = (fieldName, value, minLength = 0) => {
    return value.length < minLength;
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <StatusBar
            translucent={false}
            backgroundColor={GREEN_COLOR}
            animated
            barStyle={'light-content'}
          />
          <View
            style={{
              position: 'absolute',
              width: width,
              height: height,
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
            <ActivityIndicator size={'medium'} color={GREEN_COLOR} />
          </View>
        </>
      )}
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
        ref={scrollViewRef}
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

        {/* Buyer's Details  */}
        {selectedAddress.length >= 0 && (
          <View style={styles.enterCustomerDetailsParentView}>
            <Text style={styles.customerTitle}>Add Buyer's Details</Text>
            <Text style={{color: '#808080', fontSize: 12}}>
              To whom is the order being delivered? (Buyer's Info)
            </Text>
            <View>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={
                  emptyFields.shipping_first_name ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_first_name
                      ? 'red'
                      : '#ccc',
                  },
                ]}
                value={shippingDetails.shipping_first_name}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_first_name: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_first_name: text.length === 0,
                  }));
                }}
              />
              <TextInput
                placeholder="Last Name"
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_last_name
                      ? 'red'
                      : '#ccc',
                  },
                ]}
                placeholderTextColor={
                  emptyFields.shipping_last_name ? 'red' : '#808080'
                }
                value={shippingDetails.shipping_last_name}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_last_name: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_last_name: text.length === 0,
                  }));
                }}
              />
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor={
                  emptyFields.shipping_phone ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_phone ? 'red' : '#ccc',
                  },
                ]}
                keyboardType="number-pad"
                value={shippingDetails.shipping_phone}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_phone: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_phone: text.length < 10,
                  }));
                }}
                maxLength={10}
              />
              <TextInput
                placeholder="Enter Email Id"
                placeholderTextColor={
                  emptyFields.shipping_email ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_email ? 'red' : '#ccc',
                  },
                ]}
                keyboardType="email-address"
                value={shippingDetails.shipping_email}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_email: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_email: text.length === 0,
                  }));
                }}
              />
              <Text style={{fontSize: 11, color: '#808080', marginTop: 10}}>
                Where is the order being delivered to?{' '}
                <Text
                  style={{
                    color: '#808080',
                    fontFamily: PRIMARY_TEXT_SEM,
                    fontSize: 12,
                  }}>
                  (Buyer's Address)
                </Text>
              </Text>
              <TextInput
                placeholder="House/floor number, bulding name or street, Locality"
                placeholderTextColor={
                  emptyFields.shipping_address_1 ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    height: height / 16,

                    borderColor: emptyFields.shipping_address_1
                      ? 'red'
                      : '#ccc',
                  },
                ]}
                multiline
                value={shippingDetails.shipping_address_1}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_address_1: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_address_1: text.length < 10,
                  }));
                }}
              />
              <TextInput
                placeholder="Any near by post office, market, hospital as landmark"
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
                placeholderTextColor={
                  emptyFields.shipping_city ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_city ? 'red' : '#ccc',
                  },
                ]}
                value={shippingDetails.shipping_city}
                onChangeText={text => {
                  setShippingDetails({...shippingDetails, shipping_city: text});

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_city: text.length < 3,
                  }));
                }}
              />
              <TextInput
                placeholder="Pincode"
                placeholderTextColor={
                  emptyFields.shipping_pincode ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_pincode ? 'red' : '#ccc',
                  },
                ]}
                value={shippingDetails.shipping_pincode}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_pincode: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_pincode: text.length < 6,
                  }));
                }}
                maxLength={6}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="State"
                placeholderTextColor={
                  emptyFields.shipping_state ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_state ? 'red' : '#ccc',
                  },
                ]}
                value={shippingDetails.shipping_state}
                onChangeText={text => {
                  setShippingDetails({
                    ...shippingDetails,
                    shipping_state: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    shipping_state: text.length < 3,
                  }));
                }}
              />
              <TextInput
                placeholder="Country"
                placeholderTextColor={
                  emptyFields.shipping_country ? 'red' : '#808080'
                }
                style={[
                  styles.buyerDetailInput,
                  {
                    borderColor: emptyFields.shipping_country ? 'red' : '#ccc',
                  },
                ]}
                value={shippingDetails.shipping_country}
                // onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_country: text })}
                editable={false}
              />
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            marginBottom: 15,
            alignItems: 'center',
            marginHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor: '#f2f2f2',
            elevation: 2,
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
            Billing address is not same as Shipping Address
          </Text>
        </View>
        {/* Billing address is not same as Shiping start  */}
        {BillingAddressNotSame ? (
          <View style={styles.enterCustomerDetailsParentView}>
            <Text style={{fontFamily: PRIMARY_TEXT_SEM, color: TEXT_BLACK2}}>
              Billing Address
            </Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={
                emptyFields.billing_first_name ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_first_name ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_first_name}
              onChangeText={text => {
                setBillingDetails({
                  ...billingDetails,
                  billing_first_name: text,
                });

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_first_name: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="Last Name"
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_last_name ? 'red' : '#ccc'},
              ]}
              placeholderTextColor={
                emptyFields.billing_last_name ? 'red' : '#808080'
              }
              value={billingDetails.billing_last_name}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_last_name: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_last_name: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={
                emptyFields.billing_phone ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_phone ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_phone}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_phone: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_phone: text.length < 10,
                }));
              }}
              keyboardType="number-pad"
              maxLength={10}
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={
                emptyFields.billing_email ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_email ? 'red' : '#ccc'},
              ]}
              keyboardType="email-address"
              value={billingDetails.billing_email}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_email: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_email: text.length === 0,
                }));
              }}
            />
            <TextInput
              placeholder="House/floor number, building name or street, Locality"
              placeholderTextColor={
                emptyFields.billing_address_1 ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {
                  height: height / 16,
                  borderColor: emptyFields.billing_address_1 ? 'red' : '#ccc',
                },
              ]}
              multiline
              value={billingDetails.billing_address_1}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_address_1: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_address_1: text.length < 10,
                }));
              }}
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
              placeholderTextColor={
                emptyFields.billing_city ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_city ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_city}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_city: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_city: text.length < 3,
                }));
              }}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={
                emptyFields.billing_pincode ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_pincode ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_pincode}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_pincode: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_pincode: text.length < 6,
                }));
              }}
              maxLength={6}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={
                emptyFields.billing_state ? 'red' : '#808080'
              }
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_state ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_state}
              onChangeText={text => {
                setBillingDetails({...billingDetails, billing_state: text});

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  billing_state: text.length < 3,
                }));
              }}
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={'#808080'}
              style={[
                styles.buyerDetailInput,
                {borderColor: emptyFields.billing_country ? 'red' : '#ccc'},
              ]}
              value={billingDetails.billing_country}
              // onChangeText={text => setBillingDetails({ ...billingDetails, billing_country: text })}
              editable={false}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.AddOrderBtn}
          onPress={() => {
            // createOrder();
            handleAddOrder();
          }}>
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
    borderColor: '#ccc',
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
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GREEN_COLOR,
  },
  AddOrderBtnText: {
    color: TEXT_WHITE,
    fontSize: 15,
    fontFamily: PRIMARY_TEXT_REG,
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
    color: '#404040',
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
