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
import React, {useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';
import {
  PRIMARY_TEXT_REG,
  PRIMARY_TEXT_SEM,
  TEXT_BLACK,
  TEXT_BLACK2,
  TEXT_LIGHT_BLACK,
  TEXT_WHITE,
} from '../assets/fontStyles';

const CustomerDetails = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [BillingAddressNotSame, setBillingAddressNotSame] = useState(false);
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
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 10, color: '#999999'}} numberOfLines={1}>
                Selected Customer Address
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectCustomerAddressBtn}>
              <Image
                source={require('../assets/images/search-icon.png')}
                style={{width: 25, height: 25, tintColor: GREEN_COLOR}}
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
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.46}} />
          <Text style={{fontFamily: 'Poppins-SemiBold', color: '#b3b3b3'}}>
            OR
          </Text>
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.46}} />
        </View>
        {/* divider end */}
        <View style={styles.enterCustomerDetailsParentView}>
          <Text style={styles.customerTitle}>Add Buyer's Details</Text>
          <Text style={{color: '#808080', fontSize: 12}}>
            To whom is the order being delivered? (Buyer's Info)
          </Text>
          {/* Buyer's Details */}
          <View>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
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
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
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
        {/*  Billing address is not same as Shiping start */}
        {BillingAddressNotSame ? (
          <View style={styles.enterCustomerDetailsParentView}>
            <Text style={{fontFamily: PRIMARY_TEXT_SEM, color: TEXT_BLACK2}}>
              Billing Address
            </Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.buyerDetailInput}
              placeholderTextColor={'#808080'}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="Enter Email Id"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="House/Floor number.bulding name or street,Locality"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
            />
            <TextInput
              placeholder="Any near by post office,market,hospital as landmark"
              placeholderTextColor={'#808080'}
              style={[styles.buyerDetailInput, {height: height / 16}]}
              multiline
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={'#808080'}
              style={styles.buyerDetailInput}
            />
          </View>
        ) : null}
        <TouchableOpacity style={styles.AddOrderBtn}>
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
