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
import React from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import Header from '../components/Header';

const CustomerDetails = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
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
          <Text style={styles.customerTitle}>Enter Customer Details</Text>
          <View>
            <TextInput placeholder=''/>
          </View>
        </View>
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
    color: '#000',
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
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
});
