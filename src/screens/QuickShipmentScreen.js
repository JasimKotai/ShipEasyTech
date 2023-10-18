import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GREEN_COLOR, LIGHT_GREEN } from '../assets/Colors';
import { English } from '../Languages/EnglishLan';
import { Hindi } from '../Languages/HindiLan';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../components/Header';


const productDetails = {
  // id: keyCounter++,
  productName: '',
  Quantity: '',
  UnitPrice: '',
  SKU: '',
  ProductCategory: '',
  HSNCategory: '',
  TaxRate: '',
  Discount: '',
}

const QuickShipmentScreen = ({ navigation }) => {
  const [renderOnes, setrenderOnes] = useState(null);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [address, setAddress] = useState('empty');
  const [showMore, setShowMore] = useState(null);
  const [productCategory, setproductCategory] = useState('');
  const [products, setProducts] = useState([productDetails]);
  const [dropDownButton, setdropDownButton] = useState(false);
  const [cashOrPrepaid, setCashOrPrepaid] = useState('COD');
  const [otherCharges, setOtherCharges] = useState(false);

  let keyCounter = 1;
  // const [productData, setproductData] = useState([]);
  // console.log(productDetails);

  const addAnotherProduct = () => {
    setProducts(prevState => {
      const prevList = [...prevState, productDetails];
    });
  };

  // useEffect(() => {
  //   addAnotherProduct();
  //   console.log('QuickShipmentScreen useEffect calls renderOnes');
  // }, [renderOnes]);
  const deleteProduct = index => {
    console.log("delete product index", index);
    console.log("outside if delete products length", products?.length);

    if (products?.length > 1) {
      console.log("from if delete products length", products?.length);
      const updatedProducts = products.filter((item, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  const data = [
    { label: 'Item 1', value: 'hello world' },
    { label: 'Item 2', value: 'hello world 2' },
    { label: 'Item 2', value: 'hello world 2' },
    { label: 'Item 2', value: 'hello world 2' },
    { label: 'Item 2', value: 'hello world 2' },
  ];

  console.log("products====>", products);

  // const renderProductDetails = (item, index) => {
  //   return (

  //   );
  // };

  // useEffect(() => {
  //   setProducts([...products, productDetailsLayout]);
  // }, [])

  return (
    // <KeyboardAvoidingView enabled={true} style={{flex: 1}} behavior={'height'}>
    <View style={styles.container}>
      <Header
        title="Quick Shipment"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.title2View}>
        <Text style={styles.title2text}>Add Order Details</Text>
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}>
        {/* pick up address view */}
        <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>Select Pickup Address</Text>
          {/* <View style={styles.enterLocationView}> */}
          <View style={styles.selectLocationView}>
            {/* <TextInput
                placeholder="Select Pickup Address"
                style={styles.enterLocationInput}
                value={address}
                onChangeText={setAddress}
              /> */}
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={{ fontSize: 10, color: '#999999' }} numberOfLines={1}>
                Selected Pickup Address
              </Text>

              <Text style={{ color: '#000' }} numberOfLines={1}>
                {address}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationSearchBtn}>
              <Image
                source={require('../assets/images/search-icon.png')}
                style={{ width: 25, height: 25, tintColor: GREEN_COLOR }}
              />
            </TouchableOpacity>
          </View>
          {/* gps location button */}
          <View style={styles.pickupLocationView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddPickupAddress');
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        {/* Delivery pincode */}
        <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>
            Delivery Pincode
            {/* <Text style={{color: '#cccccc'}}>(Optional)</Text> */}
          </Text>
          <View style={styles.selectLocationView}>
            <TextInput
              placeholder="Pincode"
              style={styles.enterLocationInput}
              keyboardAppearance="default"
              keyboardType="number-pad"
              placeholderTextColor={'#808080'}
            />
          </View>
          <Text style={{ color: '#bfbfbf', fontSize: 10 }}>
            Note : Entering pincode will check pincode is available or not
          </Text>
        </View>
        {/* product details */}

        <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>Product Details</Text>

          {/* wrapper view */}
          {products?.map((item, index) => (
            <View key={index} style={{ backgroundColor: '#ffff' }}>
              <StatusBar barStyle={'dark-content'} />
              <View style={styles.selectLocationView}>
                <TextInput
                  placeholder="Product Name"
                  placeholderTextColor={'#808080'}
                  style={styles.enterLocationInput}
                  onChangeText={text =>
                    setproductDetails({ ...productDetails, productName: text })
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    deleteProduct(index);
                  }}
                  // disabled={products?.length < 2 ? true : false}
                  style={styles.locationSearchBtn}>
                  <Image
                    source={require('../assets/images/delete.png')}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* quantity and unit price */}
              <View style={styles.quantityUnitPriceView}>
                <TextInput
                  placeholder="Quantity"
                  style={styles.QuantityInput}
                  keyboardType="number-pad"
                  placeholderTextColor={'#808080'}
                  onChangeText={text =>
                    setproductDetails({ ...productDetails, Quantity: text })
                  }
                />
                <TextInput
                  placeholder="Unit Price"
                  style={styles.QuantityInput}
                  keyboardType="number-pad"
                  placeholderTextColor={'#808080'}
                  onChangeText={text =>
                    setproductDetails({ ...productDetails, UnitPrice: text })
                  }
                />
              </View>
              <TextInput
                placeholder="SKU"
                style={styles.SKUInput}
                placeholderTextColor={'#808080'}
                onChangeText={text =>
                  setproductDetails({ ...productDetails, SKU: text })
                }
              />
              {/* show more button start*/}
              <TouchableOpacity
                onPress={() => {
                  setShowMore(index);
                }}
                style={styles.showMore}>
                <Text style={styles.showMoreText}>
                  {showMore === index ? 'Show Less -' : 'Show More +'}
                </Text>
              </TouchableOpacity>
              {/* show more button end*/}
              {/* product category button */}
              {console.log("showMore==>", showMore)}
              {showMore === index ? (
                <>
                  <TouchableOpacity style={styles.productCategoryBtn}>
                    <Text style={{ color: '#999999' }}>
                      Product Category (Optional)
                    </Text>
                    {productCategory ? (
                      <Text numberOfLines={1} style={{ color: '#000' }}>
                        {productCategory}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                  {/* HSN (Optional) input */}
                  <TextInput
                    placeholder="HSN (Optional)"
                    placeholderTextColor={'#808080'}
                    style={styles.HSNInput}
                  />
                  {/* Tax Rate & Discount inputs view start */}
                  <View style={styles.TaxRateDiscountView}>
                    <TextInput
                      placeholder="Tax Rate (Optional)"
                      style={styles.TaxRateDiscountInput}
                      placeholderTextColor={'#808080'}
                    />
                    <TextInput
                      placeholder="Discount (Optional)"
                      style={styles.TaxRateDiscountInput}
                      placeholderTextColor={'#808080'}
                    />
                  </View>
                  {/* Tax Rate & Discount inputs view end */}
                  {/* divider view start*/}
                  <View
                    style={{
                      height: 2,
                      backgroundColor: '#808080',
                      marginVertical: 20,
                    }}
                  />
                </>
              ) : null}

              {/* divider view end */}
            </View>
          ))}

          <TouchableOpacity
            onPress={() => {
              addAnotherProduct();
            }}
            style={styles.AddAnotherBtn}>
            <Text style={styles.AddAnotherBtnText}>+ Add Another Product</Text>
          </TouchableOpacity>
        </View>
        {/* Weight */}
        <View style={styles.WeightParentView}>
          <Text style={styles.pickupAddressText}>Weight</Text>
          <View style={styles.WeightChildView1}>
            <TextInput
              placeholder="Enter the weight of package in Kgs"
              placeholderTextColor={'#808080'}
              style={styles.WeightInput}
            />
            <View style={styles.WeightChildView2}>
              <Text style={{ color: '#ffff', fontFamily: 'Poppins-SemiBold' }}>
                KG
              </Text>
            </View>
          </View>
          <Text style={{ color: '#808080', fontSize: 10 }}>
            Max 3 digits after decimal value
          </Text>
          <Text style={{ color: '#000', fontSize: 12 }}>
            Note : The minimum chargeable weight is 50 gm
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.pickupAddressText}>Package Type</Text>
            <Image
              source={require('../assets/images/i.png')}
              style={{ width: 20, height: 20, marginLeft: 10 }}
            />
          </View>
          {/* DropDown start*/}
          <Dropdown
            style={[styles.dropdown, dropDownButton && { borderColor: 'blue' }]}
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
            maxHeight={150}
            showsVerticalScrollIndicator={false}
            labelField="label"
            valueField="value"
            placeholder={'Select Package'}
            searchPlaceholder="Search..."
          // value={value}
          // onChange={item => {
          //   setValue(item.value);
          //   setIsFocus(false);
          // }}
          />
          {/* DropDown end*/}
          {/* add new package button */}
          <TouchableOpacity style={{ width: width / 2.2 }}>
            <Text style={styles.addNewPackageBtnText}>+ Add New Package</Text>
          </TouchableOpacity>
          <Text style={styles.pickupAddressText}>Package Dimensions</Text>
          {/* package dimension view */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View style={styles.lengthInputView}>
              <TextInput
                placeholder="Length"
                placeholderTextColor={'#808080'}
                style={styles.lengthInput}
                keyboardType="number-pad"
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
            <View style={styles.lengthInputView}>
              <TextInput
                placeholder="Breadth"
                placeholderTextColor={'#808080'}
                style={styles.lengthInput}
                keyboardType="number-pad"
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
            <View style={styles.lengthInputView}>
              <TextInput
                placeholder="Heigth"
                placeholderTextColor={'#808080'}
                style={styles.lengthInput}
                keyboardType="number-pad"
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
          </View>
          <Text style={{ color: '#808080', fontSize: 12 }}>
            Note : Dimensions value should be greater than 0.50 cm
          </Text>
        </View>
        {/* payment cash on delivery or prepaid */}
        <View style={styles.PaymentParentView}>
          <Text style={styles.pickupAddressText}>Payment</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.cashOnDeliveryView}>
              <TouchableOpacity
                onPress={() => {
                  setCashOrPrepaid('COD');
                }}
                style={styles.cashOnDeliveryBtn}>
                <Image
                  source={require('../assets/images/new-moon.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor:
                      cashOrPrepaid === 'COD' ? GREEN_COLOR : '#b3b3b3',
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                }}>
                Cash On Delivery
              </Text>
            </View>
            <View
              style={[
                styles.cashOnDeliveryView,
                { alignItems: 'center', justifyContent: 'center' },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setCashOrPrepaid('Prepaid');
                }}
                style={styles.cashOnDeliveryBtn}>
                <Image
                  source={require('../assets/images/new-moon.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    tintColor:
                      cashOrPrepaid === 'Prepaid' ? GREEN_COLOR : '#b3b3b3',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                }}>
                Prepaid
              </Text>
            </View>
          </View>
          {/* divider */}
          <View
            style={{ height: 1, backgroundColor: '#cccc', marginVertical: 10 }}
          />
          {/* sub total */}
          <View style={styles.subTotalView}>
            <Text style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>
              Subtotal
            </Text>
            <Text style={{ color: '#000' }}>₹ 100000</Text>
          </View>
          {/* other charges button */}
          <TouchableOpacity
            onPress={() => {
              setOtherCharges(!otherCharges);
            }}
            style={styles.otherChargesBtn}>
            <Text style={{ color: '#000' }}>Other Charges</Text>
            <Image
              source={
                otherCharges
                  ? require('../assets/images/up-arrow.png')
                  : require('../assets/images/down-arrow.png')
              }
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
          {/* otherCharge shipping chages giftwrap transation discount */}
          {otherCharges ? (
            <View style={{ marginVertical: 10 }}>
              {/* shipping charge */}
              <View style={styles.otherChargesInputView}>
                <Text style={{ flex: 0.5, color: '#000' }}>Shipping Charges</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
              {/* gift wrap */}
              <View style={styles.otherChargesInputView}>
                <Text style={{ flex: 0.5, color: '#000' }}>GiftWrap Charges</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
              {/* transaction */}
              <View style={styles.otherChargesInputView}>
                <Text style={{ flex: 0.5, color: '#000' }}>
                  Transaction Charges
                </Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
              {/* Discount */}
              <View style={styles.otherChargesInputView}>
                <Text style={{ flex: 0.5, color: '#000' }}>Discount</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
            </View>
          ) : null}
          {/* total amount view */}
          <View
            style={{
              backgroundColor: '#e6ffef',
              paddingVertical: 20,
              marginTop: 10,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text style={{ color: '#000', fontFamily: 'Poppins-Regular' }}>
                Total
              </Text>
              <Text style={{ color: '#000' }}>₹ 1000000</Text>
            </View>
            <Text style={{ color: '#808080', fontSize: 12, marginLeft: 10 }}>
              Note : In case a shipment gets lost, the amount entered above will
              be refunded to youraccount.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CustomerDetails');
          }}
          style={styles.NextButton}>
          <Text style={styles.NextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    //{/* </KeyboardAvoidingView> */}
  );
};

export default QuickShipmentScreen;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// console.log(width/6);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  header: {
    backgroundColor: '#e6ffef',
    height: height / 7,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginLeft: width / 6,
    // marginLeft: 64,
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
    fontSize: 16,
    marginLeft: 10,
  },
  pickupAddressView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  pickupAddressText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  selectLocationView: {
    flexDirection: 'row',
    height: height / 18,
    backgroundColor: '#ffff',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  enterLocationInput: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    color: '#000',
    // backgroundColor: 'red',
    height: height / 18,
    paddingVertical: 0,
  },
  locationSearchBtn: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#808080',
  },
  pickupLocationView: {
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#808080',
    marginVertical: 10,
  },
  quantityUnitPriceView: {
    height: height / 18,
    marginVertical: 10,
    flexDirection: 'row',
    // borderWidth: 0.5,
    // borderColor: '#808080',
    // borderRadius: 5,
    justifyContent: 'space-between',
  },
  QuantityInput: {
    flex: 0.47,
    borderWidth: 0.4,
    borderColor: '#808080',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: height / 18,
    paddingVertical: 0,
    alignItems: 'center',
    // backgroundColor: 'green',
    color: '#000',
  },
  SKUInput: {
    flex: 1,
    // backgroundColor: 'red',
    height: height / 18,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    paddingVertical: 0,
    borderColor: '#808080',
    color: '#000',
    alignItems: 'center',
  },
  showMore: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  showMoreText: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-Regular',
  },
  productCategoryBtn: {
    flex: 1,
    height: height / 18,
    borderWidth: 0.5,
    borderColor: '#808080',
    // backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  HSNInput: {
    borderWidth: 0.5,
    borderColor: '#808080',
    marginTop: 10,
    borderRadius: 5,
    flex: 1,
    height: height / 18,
    color: '#000',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  TaxRateDiscountView: {
    flexDirection: 'row',
    flex: 1,
    height: height / 18,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  TaxRateDiscountInput: {
    // backgroundColor: 'red',
    flex: 0.47,
    height: height / 18,
    borderWidth: 0.5,
    borderColor: '#808080',
    borderRadius: 5,
    paddingVertical: 0,
    color: '#000',
  },
  AddAnotherBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  AddAnotherBtnText: {
    color: '#ffff',
    fontFamily: 'Poppins-SemiBold',
  },
  WeightParentView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  WeightInput: {
    flex: 0.8,
    height: height / 18,
    color: '#000',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
    // borderWidth: 1
    borderRightWidth: 1,
    borderColor: '#808080',
  },
  WeightChildView1: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#808080',
  },
  WeightChildView2: {
    alignItems: 'center',
    flex: 0.2,
    backgroundColor: GREEN_COLOR,
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
  addNewPackageBtnText: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
  },
  lengthInputView: {
    borderWidth: 1,
    borderColor: '#cccc',
    borderRadius: 6,
    flex: 0.3,
    color: '#000',
    height: height / 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lengthInput: {
    padding: 0,
    margin: 0,
    height: height / 18,
    color: '#000',
    paddingLeft: 4,
    // backgroundColor: 'red',
  },
  lengthCMText: {
    color: '#ffff',
    backgroundColor: GREEN_COLOR,
    lineHeight: height / 18,
    paddingHorizontal: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  PaymentParentView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  cashOnDeliveryView: {
    flexDirection: 'row',
    flex: 0.5,
    // backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: 'center',
  },
  cashOnDeliveryBtn: { backgroundColor: '#999999', padding: 5, borderRadius: 40 },
  subTotalView: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  otherChargesBtn: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#e6ffef',
    borderRadius: 5,
    width: width / 2.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otherChargesInputView: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  otherChargesInput: {
    flex: 0.5,
    height: 35,
    padding: 0,
    margin: 0,
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: '#f2f2f2',
    paddingHorizontal: 10,
    color: '#000',
  },
  NextButton: {
    backgroundColor: '#000',
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NextButtonText: {
    color: '#ffff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
