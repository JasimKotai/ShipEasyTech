import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../components/Header';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {Styles} from '../css/ReturnOrderScreenCSS';
import RBSheet from 'react-native-raw-bottom-sheet';
import indiaStates from '../components/indiaStates';
import {Dropdown} from 'react-native-element-dropdown';

const ReturnOrderScreen = ({navigation}) => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const [returnAddress, setReturnAddress] = useState(''); // for buttons
  const [customerAddress, setCustomerAddress] = useState(''); // for buttons
  const [returnAddressSearch, setReturnAddressSearch] = useState('');
  const [customerAddressSearch, setCustomerAddressSearch] = useState('');

  return (
    <View style={Styles.container}>
      <Header
        title="Return Order - Add Details"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        style={{flex: 1, paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        {/* Return Address View */}
        <View style={Styles.pickupAddressView}>
          <Text style={Styles.pickupAddressText}>Select Return Address</Text>
          <View style={Styles.selectLocationView}>
            {/* Return Address drop down button */}
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{
                flex: 1,
                paddingHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                {returnAddress.length === 0 ? (
                  <Text style={{color: '#404040'}} numberOfLines={1}>
                    Select Return Address
                  </Text>
                ) : (
                  <Text style={{color: '#000'}} numberOfLines={1}>
                    {returnAddress}
                  </Text>
                )}
              </View>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={{
                  width: 25,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: GREEN_COLOR,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* gps location button  */}
          <View style={Styles.pickupLocationView}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('AddPickupAddress');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/location.png')}
                style={{
                  width: 18,
                  height: 18,
                  tintColor: GREEN_COLOR,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: GREEN_COLOR,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Add Pickup Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* select existing customer for pickup */}
        <View style={Styles.pickupAddressView}>
          <Text style={Styles.pickupAddressText}>
            Select Existing Customer Address
          </Text>
          <View style={Styles.selectLocationView}>
            {/* Return Address drop down button */}
            <TouchableOpacity
              onPress={() => {
                refRBSheet2.current.open();
              }}
              style={{
                flex: 1,
                paddingHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                {customerAddress.length === 0 ? (
                  <Text style={{color: '#404040'}} numberOfLines={1}>
                    Select Existing Customer Address
                  </Text>
                ) : (
                  <Text style={{color: '#000'}} numberOfLines={1}>
                    {customerAddress}
                  </Text>
                )}
              </View>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={{
                  width: 25,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: GREEN_COLOR,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* divider start */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.45}} />
          <Text style={{fontFamily: 'Poppins-SemiBold', color: '#b3b3b3'}}>
            OR
          </Text>
          <View style={{height: 1, backgroundColor: '#ccc', flex: 0.45}} />
        </View>
        {/* divider end */}
        {/* enter customer details for pickup */}

        <View style={Styles.customerDetailParentView}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 10,
            }}>
            Enter Customer Details for Pickup
          </Text>
          <TextInput
            placeholder="First Name"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          <TextInput
            placeholder="Last Name"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          <TextInput
            placeholder="Email"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Phone Number"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
            keyboardType="number-pad"
            maxLength={10}
          />
          <TextInput
            placeholder="Alternate Phone Number (Optional)"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
            keyboardType="number-pad"
            maxLength={10}
          />
          <TextInput
            placeholder="House No, Building Name etc"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          <TextInput
            placeholder="Locality Street Name"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          <TextInput
            placeholder="Landmark (Optional)"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          <TextInput
            placeholder="Pincode"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
            maxLength={6}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="City"
            style={Styles.customerAddressInputs}
            placeholderTextColor={'#808080'}
            // value={}
            // onChangeText={text =>
            // }
          />
          {/* drop down for india states */}
          <Dropdown
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            iconStyle={Styles.iconStyle}
            data={indiaStates}
            containerStyle={{
              marginTop: 5,
              // backgroundColor: 'red',
              borderRadius: 5,
              // width: 100
            }}
            activeColor="#e6ffef"
            itemContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
            itemTextStyle={{color: '#000'}}
            maxHeight={250}
            showsVerticalScrollIndicator={false}
            labelField="name"
            valueField="name"
            placeholder={'State'}
            searchPlaceholder="Search..."
            // value={productWeightDetails.platform}
            // onChange={item => {
            //   setProductWeightDetails({
            //     ...productWeightDetails,
            //     platform: item,
            //   });
            // }}
          />
          {/* drop down for country */}
          <Dropdown
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            iconStyle={Styles.iconStyle}
            data={[{name: 'India'}]}
            containerStyle={{
              marginTop: 5,
              borderRadius: 5,
            }}
            activeColor="#e6ffef"
            itemContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginTop: 5,
            }}
            itemTextStyle={{color: '#000'}}
            maxHeight={150}
            showsVerticalScrollIndicator={false}
            labelField="name"
            valueField="value"
            placeholder={'Country'}
            searchPlaceholder="Search..."
            // value={productWeightDetails.platform}
            // onChange={item => {
            //   setProductWeightDetails({
            //     ...productWeightDetails,
            //     platform: item,
            //   });
            // }}
          />
        </View>

        {/* bottom sheet for select return address // 1*/}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height / 1.1}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            draggableIcon: {...Styles.draggableIconStyle},
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <View style={{flex: 1, backgroundColor: '#ffff'}}>
            <TouchableOpacity
              style={Styles.RBSheetCloseBtn}
              onPress={() => refRBSheet.current.close()}>
              <Image
                source={require('../assets/images/close1.png')}
                style={Styles.RBSheetCloseBtnImg}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Search Pickup Address"
              placeholderTextColor={'#808080'}
              value={returnAddressSearch}
              onChangeText={setReturnAddressSearch}
              style={Styles.RBSheetSearchBar}
            />
            <FlatList
              data={[1]}
              renderItem={() => {
                return (
                  <View style={Styles.RBSheetFlatListParent}>
                    <View style={Styles.RBSheetFlatListChild}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 18,
                        }}>
                        Q
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#404040',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        hello world
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#737373',
                          fontSize: 13,
                        }}>
                        1234567890
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </RBSheet>
        {/* bottom sheet for customer address // 2*/}
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height / 1.1}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            draggableIcon: {...Styles.draggableIconStyle},
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <View style={{flex: 1, backgroundColor: '#ffff'}}>
            <TouchableOpacity
              style={Styles.RBSheetCloseBtn}
              onPress={() => refRBSheet2.current.close()}>
              <Image
                source={require('../assets/images/close1.png')}
                style={Styles.RBSheetCloseBtnImg}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Search Pickup Address"
              placeholderTextColor={'#808080'}
              value={returnAddressSearch}
              onChangeText={setReturnAddressSearch}
              style={Styles.RBSheetSearchBar}
            />
            <FlatList
              data={[1, 1]}
              renderItem={() => {
                return (
                  <View style={Styles.RBSheetFlatListParent}>
                    <View style={Styles.RBSheetFlatListChild}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 18,
                        }}>
                        Q
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#404040',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        hello world
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#737373',
                          fontSize: 13,
                        }}>
                        1234567890
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default ReturnOrderScreen;
