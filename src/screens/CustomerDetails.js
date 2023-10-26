import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { GREEN_COLOR, LIGHT_GREEN } from '../assets/Colors';
import Header from '../components/Header';
import {
  PRIMARY_TEXT_REG,
  PRIMARY_TEXT_SEM,
  TEXT_BLACK,
  TEXT_BLACK2,
  TEXT_LIGHT_BLACK,
  TEXT_WHITE,
} from '../assets/fontStyles';
import { useDispatch, useSelector } from 'react-redux';
import keyMapping from '../config/keyMapping';

const CustomerDetails = ({ navigation }) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [BillingAddressNotSame, setBillingAddressNotSame] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_phone: "",
    shipping_email: "",
    shipping_address_1: "",
    shipping_address_2: "",
    shipping_city: "",
    shipping_pincode: "",
    shipping_state: "",
    shipping_country: "India",
  });
  const [billingDetails, setBillingDetails] = useState({
    billing_first_name: "",
    billing_last_name: "",
    billing_phone: "",
    billing_email: "",
    billing_address_1: "",
    billing_address_2: "",
    billing_city: "",
    billing_pincode: "",
    billing_state: "",
    billing_country: "India",
  });
  const {create_order_Data} = useSelector(state=> state.userSlice);

  const dispatch = useDispatch();

  // console.log("shippingDetails==>", shippingDetails);
  // console.log("billingDetails==>", billingDetails);

  const createOrder = () => {
    if (!BillingAddressNotSame) {
      for (const key in keyMapping) {
        if (shippingDetails.hasOwnProperty(key) && billingDetails.hasOwnProperty(keyMapping[key])) {
          billingDetails[keyMapping[key]] = shippingDetails[key];
        }
      }
      const mergedObj = {...shippingDetails, ...billingDetails, ...create_order_Data}
      console.log("mergedObj==>", mergedObj);
      // console.log("billingDetails==>", billingDetails);
    } else {
      console.log("shippingDetails==>", shippingDetails);
      console.log("billingDetails==>", billingDetails);
    }
  }


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
        style={{ flex: 1, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.selectCustomerParentView}>
          <Text style={styles.selectCustomerText}>Select Customer</Text>
          <View style={styles.selectCustomerAddress}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={{ fontSize: 10, color: '#999999' }} numberOfLines={1}>
                Selected Customer Address
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectCustomerAddressBtn}>
              <Image
                source={require('../assets/images/search-icon.png')}
                style={{ width: 25, height: 25, tintColor: GREEN_COLOR }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* divider start */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ height: 1, backgroundColor: '#ccc', flex: 0.46 }} />
          <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#b3b3b3' }}>
            OR
          </Text>
          <View style={{ height: 1, backgroundColor: '#ccc', flex: 0.46 }} />
        </View>
        {/* divider end */}
        <View style={styles.enterCustomerDetailsParentView}>
          <Text style={styles.customerTitle}>Add Buyer's Details</Text>
          <Text style={{ color: '#808080', fontSize: 12 }}>
            To whom is the order being delivered? (Buyer's Info)
          </Text>
          {/* Buyer's Details */}
          <View>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_first_name}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_first_name: text })}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
              value={shippingDetails.shipping_last_name}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_last_name: text })}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="number-pad"
              value={shippingDetails.shipping_phone}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_phone: text })}
              maxLength={10}
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
              value={shippingDetails.shipping_email}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_email: text })}
            />
            <Text style={{ fontSize: 11, color: '#808080', marginTop: 10 }}>
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
              style={[styles.buyerDetailInput, { height: height / 16 }]}
              multiline
              value={shippingDetails.shipping_address_1}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_address_1: text })}
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, { height: height / 16 }]}
              multiline
              value={shippingDetails.shipping_address_2}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_address_2: text })}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_city}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_city: text })}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_pincode}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_pincode: text })}
              maxLength={6}
              keyboardType='number-pad'
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={shippingDetails.shipping_state}
              onChangeText={text => setShippingDetails({ ...shippingDetails, shipping_state: text })}
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
              style={{ padding: 5 }}>
              <Image
                source={
                  BillingAddressNotSame
                    ? require('../assets/images/check1.png')
                    : require('../assets/images/empty-checkbox.png')
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <Text style={{ color: TEXT_BLACK2 }}>
              Billing address is not same as Shiping Address
            </Text>
          </View>
        </View>
        {/*  Billing address is not same as Shiping start */}
        {BillingAddressNotSame ? (
          <View style={styles.enterCustomerDetailsParentView}>
            <Text style={{ fontFamily: PRIMARY_TEXT_SEM, color: TEXT_BLACK2 }}>
              Billing Address
            </Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_first_name}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_first_name: text })}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
              value={billingDetails.billing_last_name}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_last_name: text })}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_phone}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_phone: text })}
              keyboardType="number-pad"
              maxLength={10}
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
              value={billingDetails.billing_email}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_email: text })}
            />
            <TextInput
              placeholder="House/Floor number.bulding name or street,Locality"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, { height: height / 16 }]}
              multiline
              value={billingDetails.billing_address_1}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_address_1: text })}
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, { height: height / 16 }]}
              multiline
              value={billingDetails.billing_address_2}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_address_2: text })}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_city}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_city: text })}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_pincode}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_pincode: text })}
              maxLength={6}
              keyboardType='number-pad'
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              value={billingDetails.billing_state}
              onChangeText={text => setBillingDetails({ ...billingDetails, billing_state: text })}
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
        <TouchableOpacity style={styles.AddOrderBtn} onPress={() => createOrder()}>
          <Text style={styles.AddOrderBtnText}>Add Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CustomerDetails;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  title2View: {
    backgroundColor: '#ffff',
    paddingVertical: 10,
    paddingLeft: 10,
    // marginHorizontal: 10,
    marginTop: 5,
    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  title2text: {
    color: '#000',
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
  selectCustomerAddressBtn: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#808080',
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
});
