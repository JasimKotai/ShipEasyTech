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
  FlatList,
  Alert,
  localStorage,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {English} from '../Languages/EnglishLan';
import {Hindi} from '../Languages/HindiLan';
import {Dropdown} from 'react-native-element-dropdown';
import Header from '../components/Header';
import {saveCreateOrderData} from '../config/UserSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const QuickShipmentScreen = ({navigation}) => {
  const refRBSheet = useRef();
  const [renderOnes, setrenderOnes] = useState(null);

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const [cashOrPrepaid, setCashOrPrepaid] = useState('COD');
  const [productWeightDetails, setProductWeightDetails] = useState({
    weight: '',
    length: '',
    breadth: '',
    height: '',
    payment_type: '',
    invoice: '',
    order_number: '',
    platform: '',
    courier_company: '',
  });
  const [products, setProducts] = useState({
    product_title: '',
    quentity: '',
    price: '',
    sku: '',
    pickup_address: '',
    courier_charge: '',
    // ProductCategory: '',
    // HSNCategory: '',
    // TaxRate: '',
    // Discount: '',
  });
  const [otherCharges, setOtherCharges] = useState(false);
  const [showmore, setShowmore] = useState(false);

  const {user} = useSelector(state => state.userSlice);
  const dispatch = useDispatch();

  const platform = [
    {label: '1', value: 'shopify'},
    {label: '2', value: 'WooCommerce'},
    {label: '2', value: 'Wix'},
    {label: '2', value: 'Magento'},
    {label: '2', value: 'BigCommercex'},
  ];
  const Courier = [{label: '1', value: 'Ecom Express'}];

  const generateRandNum = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const generateInvoiceNumber = () => {
    const randNum = generateRandNum();
    setProductWeightDetails({
      ...productWeightDetails,
      invoice: randNum.toString(),
    });
  };

  const generateOrderNumber = () => {
    const randNum = generateRandNum();
    const prefix = user.name.slice(0, 4).toUpperCase();
    setProductWeightDetails({
      ...productWeightDetails,
      order_number: prefix + randNum.toString(),
    });
  };

  const [emptyFields, setEmptyFields] = useState({
    weight: false,
    length: false,
    breadth: false,
    height: false,
    payment_type: false,
    invoice: false,
    order_number: false,
    platform: false,
    courier_company: false,
    product_title: false,
    quentity: false,
    price: false,
    sku: false,
    pickup_address: false,
    courier_charge: false,
  });

  // console.log(emptyFields.product_title);
  // console.log(emptyFields.quentity);
  // console.log(emptyFields.price);
  // console.log(emptyFields.sku);
  // console.log(emptyFields.weight);
  // console.log(emptyFields.length);
  // console.log(emptyFields.breadth);
  // console.log(emptyFields.height, '__++__');

  const scrollViewRef = useRef();

  const handleNextButton = () => {
    navigation.navigate('CustomerDetails');

    // if (
    //   products.product_title.length < 2 ||
    //   products.quentity.length === 0 ||
    //   products.price.length === 0 ||
    //   products.sku.length < 3 ||
    //   productWeightDetails.weight.length === 0 ||
    //   productWeightDetails.length.length === 0 ||
    //   productWeightDetails.breadth.length === 0 ||
    //   productWeightDetails.height.length === 0
    // ) {
    //   console.log('no..');
    //   scrollViewRef.current?.scrollTo({y: height / 5, animated: true});
    //   handleValidation();
    // } else if (
    //   productWeightDetails.platform.length === 0 ||
    //   productWeightDetails.courier_company.length === 0
    // ) {
    //   console.log('else if..');
    //   scrollViewRef.current?.scrollTo({y: height / 1.5, animated: true});
    //   handleValidation();
    // } else if (selectPickupAddress.length === 0) {
    //   Alert.alert('Address', 'select a address');
    // } else {
    //   console.log('function call......');
    //   productWeightDetails.payment_type = cashOrPrepaid;
    //   products.pickup_address = '8';
    //   products.courier_charge = '90.97';
    //   dispatch(saveCreateOrderData({...productWeightDetails, ...products}));
    //   navigation.navigate('CustomerDetails');
    // }
  };

  // console.log("products====>", products);
  // console.log('productWeightDetails====>', productWeightDetails);

  const validateField = (fieldName, value, minLength = 0) => {
    if (minLength > 0) {
      return value.length === 0 || value.length < minLength;
    }
    return value.length === 0;
  };

  const handleValidation = () => {
    setEmptyFields(prevEmptyFields => ({
      ...prevEmptyFields,
      product_title: validateField('product_title', products.product_title, 2),
      quentity: validateField('quentity', products.quentity),
      price: validateField('price', products.price),
      sku: validateField('sku', products.sku, 3),
      weight: validateField('weight', productWeightDetails.weight),
      length: validateField('length', productWeightDetails.length),
      breadth: validateField('breadth', productWeightDetails.breadth),
      height: validateField('height', productWeightDetails.height),
      platform: validateField('platform', productWeightDetails.platform),
      courier_company: validateField(
        'courier_company',
        productWeightDetails.courier_company,
      ),
    }));
  };

  // const users = [
  //   {
  //     name: 'John Doe',
  //     phoneNumber: '123-456-7890',
  //     address: '123 Main St, City A',
  //   },
  //   {
  //     name: 'Alice Johnson',
  //     phoneNumber: '234-567-8901',
  //     address: '456 Elm St, City B',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     phoneNumber: '345-678-9012',
  //     address: '789 Oak St, City C',
  //   },
  //   {
  //     name: 'Michael Brown',
  //     phoneNumber: '456-789-0123',
  //     address: '101 Pine St, City D',
  //   },
  //   {
  //     name: 'Emily Wilson',
  //     phoneNumber: '567-890-1234',
  //     address: '222 Cedar St, City E',
  //   },
  //   {
  //     name: 'David Lee',
  //     phoneNumber: '678-901-2345',
  //     address: '333 Maple St, City F',
  //   },
  //   {
  //     name: 'Sarah Clark',
  //     phoneNumber: '789-012-3456',
  //     address: '444 Birch St, City G',
  //   },
  //   {
  //     name: 'Alex Turner',
  //     phoneNumber: '890-123-4567',
  //     address: '555 Willow St, City H',
  //   },
  //   {
  //     name: 'Olivia Parker',
  //     phoneNumber: '901-234-5678',
  //     address: '666 Elm St, City I',
  //   },
  //   {
  //     name: 'Ethan Phillips',
  //     phoneNumber: '012-345-6789',
  //     address: '777 Oak St, City J',
  //   },
  //   {
  //     name: 'Sophia Roberts',
  //     phoneNumber: '112-233-4455',
  //     address: '888 Pine St, City K',
  //   },
  //   {
  //     name: 'William Harris',
  //     phoneNumber: '223-334-5566',
  //     address: '999 Cedar St, City L',
  //   },
  //   {
  //     name: 'Ava Thompson',
  //     phoneNumber: '334-445-6677',
  //     address: '1010 Maple St, City M',
  //   },
  //   {
  //     name: 'James Davis',
  //     phoneNumber: '445-556-7788',
  //     address: '1111 Birch St, City N',
  //   },
  //   {
  //     name: 'Mia Martinez',
  //     phoneNumber: '556-667-8899',
  //     address: '1212 Willow St, City O',
  //   },
  //   {
  //     name: 'Benjamin Hill',
  //     phoneNumber: '667-778-9000',
  //     address: '1313 Elm St, City P',
  //   },
  //   {
  //     name: 'Charlotte Young',
  //     phoneNumber: '778-889-0011',
  //     address: '1414 Oak St, City Q',
  //   },
  //   {
  //     name: 'Logan Scott',
  //     phoneNumber: '889-900-1122',
  //     address: '1515 Pine St, City R',
  //   },
  //   {
  //     name: 'Grace Allen',
  //     phoneNumber: '900-011-2233',
  //     address: '1616 Cedar St, City S',
  //   },
  //   {
  //     name: 'Daniel King',
  //     phoneNumber: '011-122-3344',
  //     address: '1717 Maple St, City T',
  //   },
  // ];

  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectPickupAddress, setSelectPickupAddress] = useState([]);

  const handleSearch = text => {
    setSearchText(text);

    if (text === '') {
      setFilteredUsers([]);
    } else {
      const filteredData = savedAddress.filter(userName =>
        userName.contact_person.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredUsers(filteredData);
    }
  };

  const [savedAddress, setSavedAddress] = useState([]);
  const reverseData = savedAddress.reverse();
  // console.log('------ async data: ', savedAddress);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const retrievedData =
            JSON.parse(await AsyncStorage.getItem('SavedAddress')) || [];
          setSavedAddress(retrievedData);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
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
        ref={scrollViewRef}
        style={{flex: 1, paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        {/* pick up address view */}
        <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>Select Pickup Address</Text>
          {/* <View style={styles.enterLocationView}> */}
          <View style={styles.selectLocationView}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{
                flex: 1,
                paddingLeft: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flex: 0.9}}>
                {selectPickupAddress.length === 0 ? (
                  <Text
                    style={{
                      color: '#666666',
                      fontSize: 13,
                      fontFamily: 'Rubik-Regular',
                    }}
                    numberOfLines={1}>
                    Select Pickup Address
                  </Text>
                ) : (
                  <Text style={{color: '#404040'}} numberOfLines={1}>
                    {selectPickupAddress.complete_address}
                  </Text>
                )}
              </View>

              <View style={{flex: 0.1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/drop-down.png')}
                  style={{
                    width: 15,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: GREEN_COLOR,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* gps location button */}
          <View style={styles.AddPickupAddress}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddPickupAddress');
              }}
              style={styles.AddPickupAddressButton}>
              <Image
                source={require('../assets/images/location.png')}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: GREEN_COLOR,
                }}
              />
              <Text
                style={{
                  color: GREEN_COLOR,
                  fontFamily: 'Rubik-SemiBold',
                }}>
                Add Pickup Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Delivery pincode */}
        {/* <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>
            Delivery Pincode
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
        </View> */}

        {/* product details */}
        <View style={styles.pickupAddressView}>
          <Text style={styles.pickupAddressText}>Product Details</Text>

          {/* wrapper view */}
          <View style={{backgroundColor: '#ffff'}}>
            <View
              style={[
                styles.selectLocationView,
                {borderColor: emptyFields.product_title ? 'red' : '#ccc'},
              ]}>
              <TextInput
                placeholder="Product Name"
                placeholderTextColor={'#808080'}
                style={[styles.enterLocationInput]}
                value={products.product_title}
                onChangeText={text => {
                  setProducts({...products, product_title: text});
                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    product_title: text.length < 2,
                  }));
                }}
              />
            </View>
            {/* quantity and unit price */}
            <View style={[styles.quantityUnitPriceView]}>
              <TextInput
                placeholder="Quantity"
                style={[
                  styles.QuantityInput,
                  {borderColor: emptyFields.quentity ? 'red' : '#ccc'},
                ]}
                keyboardType="number-pad"
                placeholderTextColor={'#808080'}
                value={products.quentity}
                onChangeText={text => {
                  setProducts({...products, quentity: text});
                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    quentity: text.length === 0,
                  }));
                }}
              />
              <TextInput
                placeholder="Unit Price"
                style={[
                  styles.QuantityInput,
                  {borderColor: emptyFields.price ? 'red' : '#ccc'},
                ]}
                keyboardType="number-pad"
                placeholderTextColor={'#808080'}
                value={products.price}
                onChangeText={text => {
                  setProducts({...products, price: text});
                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    price: text.length === 0,
                  }));
                }}
              />
            </View>
            <TextInput
              placeholder="SKU"
              style={[
                styles.SKUInput,
                {borderColor: emptyFields.sku ? 'red' : '#ccc'},
              ]}
              placeholderTextColor={'#808080'}
              value={products.sku}
              onChangeText={text => {
                setProducts({...products, sku: text});
                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  sku: text.length < 3,
                }));
              }}
            />
            {/* show more button start*/}
            {/* <TouchableOpacity
              onPress={() => {
                setShowmore(!showmore);
              }}
              style={styles.showMore}>
              <Text style={styles.showMoreText}>
                {showmore ? 'Show Less -' : 'Show More +'}
              </Text>
            </TouchableOpacity> */}
            {/* show more button end*/}
            {/* product category button
              {console.log("showMore==>", item.showMore)} */}
            {showmore ? (
              <>
                {/* <TouchableOpacity style={styles.productCategoryBtn}>
                    <Text style={{ color: '#999999' }}>
                      Product Category (Optional)
                    </Text>
                    {productCategory ? (
                      <Text numberOfLines={1} style={{ color: '#000' }}>
                        {productCategory}
                      </Text>
                    ) : null}
                  </TouchableOpacity> */}
                {/* HSN (Optional) input */}
                <TextInput
                  placeholder="HSN (Optional)"
                  placeholderTextColor={'#808080'}
                  value={products.HSNCategory}
                  style={styles.HSNInput}
                  onChangeText={text =>
                    setProducts({...products, HSNInput: text})
                  }
                />
                {/* Tax Rate & Discount inputs view start */}
                <View style={styles.TaxRateDiscountView}>
                  <TextInput
                    placeholder="Tax Rate (Optional)"
                    style={styles.TaxRateDiscountInput}
                    placeholderTextColor={'#808080'}
                    value={products.TaxRate}
                    onChangeText={text =>
                      setProducts({...products, TaxRate: text})
                    }
                  />
                  <TextInput
                    placeholder="Discount (Optional)"
                    style={styles.TaxRateDiscountInput}
                    placeholderTextColor={'#808080'}
                    value={products.Discount}
                    onChangeText={text =>
                      setProducts({...products, Discount: text})
                    }
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
        </View>

        {/* Weight */}
        <View style={styles.WeightParentView}>
          <Text style={styles.pickupAddressText}>Weight</Text>
          <View
            style={[
              styles.WeightChildView1,
              {borderColor: emptyFields.weight ? 'red' : '#ccc'},
            ]}>
            <TextInput
              placeholder="Enter the weight of package in Kgs"
              placeholderTextColor={'#808080'}
              keyboardType="decimal-pad"
              style={styles.WeightInput}
              value={productWeightDetails.weight}
              onChangeText={text => {
                const parts = text.split('.');
                if (
                  parts[0].length <= 5 &&
                  (parts[1] === undefined || parts[1].length <= 3)
                ) {
                  setProductWeightDetails({
                    ...productWeightDetails,
                    weight: text,
                  });
                }

                setEmptyFields(prevEmptyFields => ({
                  ...prevEmptyFields,
                  weight: text.length === 0,
                }));
              }}
            />
            <View style={styles.WeightChildView2}>
              <Text style={{color: 'green', fontFamily: 'Poppins-SemiBold'}}>
                KG
              </Text>
            </View>
          </View>
          <Text style={{color: '#595959', fontSize: 10}}>
            Max 3 digits after decimal value
          </Text>
          <Text style={{color: '#404040', fontSize: 12, marginBottom: 20}}>
            Note : The minimum chargeable weight is 50 gm
          </Text>

          {/* <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.pickupAddressText}>Package Type</Text>
            <Image
              source={require('../assets/images/i.png')}
              style={{ width: 20, height: 20, marginLeft: 10 }}
            />
          </View> */}
          {/* DropDown start*/}
          {/* <Dropdown
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
          /> */}
          {/* DropDown end*/}
          {/* add new package button */}
          {/* <TouchableOpacity style={{ width: width / 2.2 }}>
            <Text style={styles.addNewPackageBtnText}>+ Add New Package</Text>
          </TouchableOpacity> */}

          <Text style={styles.pickupAddressText}>Package Dimensions</Text>
          {/* package dimension view */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={[
                styles.lengthInputView,
                {borderColor: emptyFields.length ? 'red' : '#ccc'},
              ]}>
              <TextInput
                placeholder="Length"
                placeholderTextColor={'#666666'}
                style={styles.lengthInput}
                keyboardType="number-pad"
                maxLength={7}
                value={productWeightDetails.length}
                onChangeText={text => {
                  setProductWeightDetails({
                    ...productWeightDetails,
                    length: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    length: text.length === 0,
                  }));
                }}
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
            <View
              style={[
                styles.lengthInputView,
                {borderColor: emptyFields.breadth ? 'red' : '#ccc'},
              ]}>
              <TextInput
                placeholder="Breadth"
                placeholderTextColor={'#666666'}
                style={styles.lengthInput}
                keyboardType="number-pad"
                maxLength={7}
                value={productWeightDetails.breadth}
                onChangeText={text => {
                  setProductWeightDetails({
                    ...productWeightDetails,
                    breadth: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    breadth: text.length === 0,
                  }));
                }}
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
            <View
              style={[
                styles.lengthInputView,
                {borderColor: emptyFields.height ? 'red' : '#ccc'},
              ]}>
              <TextInput
                placeholder="Heigth"
                placeholderTextColor={'#666666'}
                style={styles.lengthInput}
                keyboardType="number-pad"
                maxLength={7}
                value={productWeightDetails.height}
                onChangeText={text => {
                  setProductWeightDetails({
                    ...productWeightDetails,
                    height: text,
                  });

                  setEmptyFields(prevEmptyFields => ({
                    ...prevEmptyFields,
                    height: text.length === 0,
                  }));
                }}
              />
              <Text style={styles.lengthCMText}>cm</Text>
            </View>
          </View>
          <Text style={{color: '#808080', fontSize: 12}}>
            Note : Dimensions value should be greater than 0.50 cm
          </Text>
        </View>

        {/* order and invoice view */}
        <View style={styles.orderInvocesParent}>
          {/* invoice no */}
          <View style={styles.orderInvocesChild1}>
            <TextInput
              placeholder="Invoice No"
              style={styles.orderInvocesInput}
              placeholderTextColor={'#666666'}
              value={productWeightDetails.invoice}
              onChangeText={text =>
                setProductWeightDetails({
                  ...productWeightDetails,
                  invoice: text,
                })
              }
            />
            <TouchableOpacity
              style={styles.orderInvocesGenerateBtn}
              onPress={() => generateInvoiceNumber()}>
              <Image
                source={require('../assets/images/auto-generate.png')}
                style={styles.orderInvocesGenerateBtnIMG}
              />
            </TouchableOpacity>
          </View>

          {/* order no */}
          <View style={styles.orderInvocesChild1}>
            <TextInput
              placeholder="Order No"
              style={styles.orderInvocesInput}
              placeholderTextColor={'#666666'}
              value={productWeightDetails.order_number}
              onChangeText={text =>
                setProductWeightDetails({
                  ...productWeightDetails,
                  order_number: text,
                })
              }
            />
            <TouchableOpacity
              style={styles.orderInvocesGenerateBtn}
              onPress={() => generateOrderNumber()}>
              <Image
                source={require('../assets/images/auto-generate.png')}
                style={styles.orderInvocesGenerateBtnIMG}
              />
            </TouchableOpacity>
          </View>

          {/* drop down for platform */}
          <Dropdown
            style={[
              styles.dropdown,
              {borderColor: emptyFields.platform ? 'red' : '#ccc'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={{
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: '#404040',
            }}
            iconStyle={styles.iconStyle}
            data={platform}
            // search
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
            labelField="value"
            valueField="value"
            placeholder={'Platform'}
            searchPlaceholder="Search..."
            value={productWeightDetails.platform}
            onChange={item => {
              setProductWeightDetails({
                ...productWeightDetails,
                platform: item.value,
              });

              setEmptyFields(prevEmptyFields => ({
                ...prevEmptyFields,
                platform: item.value === 0,
              }));
            }}
          />
          {/* drop down forcourier partner */}
          <Dropdown
            style={[
              styles.dropdown,
              {borderColor: emptyFields.courier_company ? 'red' : '#ccc'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={{
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: '#404040',
            }}
            iconStyle={styles.iconStyle}
            data={Courier}
            // search
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
            itemTextStyle={{color: '#404040'}}
            maxHeight={150}
            showsVerticalScrollIndicator={false}
            labelField="value"
            valueField="value"
            placeholder={'Courier Partner'}
            searchPlaceholder="Search..."
            value={productWeightDetails.courier_company}
            onChange={item => {
              setProductWeightDetails({
                ...productWeightDetails,
                courier_company: item.value,
              });

              setEmptyFields(prevEmptyFields => ({
                ...prevEmptyFields,
                courier_company: item.value === 0,
              }));
            }}
          />
        </View>

        {/* payment cash on delivery or prepaid */}
        <View style={styles.PaymentParentView}>
          <Text style={styles.pickupAddressText}>Payment</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.cashOnDeliveryView}>
              <TouchableOpacity
                onPress={() => {
                  setCashOrPrepaid('COD');
                }}
                style={styles.cashOnDeliveryBtn}>
                <View
                  style={{
                    backgroundColor:
                      cashOrPrepaid === 'COD' ? GREEN_COLOR : '#f2f2f2',
                    flex: 1,
                    borderRadius: 25,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#404040',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                }}>
                Cash On Delivery
              </Text>
            </View>
            <View
              style={[
                styles.cashOnDeliveryView,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setCashOrPrepaid('PPD');
                }}
                style={styles.cashOnDeliveryBtn}>
                <View
                  style={{
                    backgroundColor:
                      cashOrPrepaid === 'PPD' ? GREEN_COLOR : '#f2f2f2',
                    flex: 1,
                    borderRadius: 25,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#404040',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                }}>
                Prepaid
              </Text>
            </View>
          </View>
          {/* divider */}
          <View
            style={{height: 1, backgroundColor: '#cccc', marginVertical: 10}}
          />
          {/* sub total */}
          <View style={styles.subTotalView}>
            <Text style={{color: '#404040', fontFamily: 'Poppins-Regular'}}>
              Subtotal
            </Text>
            <Text style={{color: '#404040'}}>
              ₹ {products?.quentity * products.price}
            </Text>
          </View>

          {/* other charges button */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          {/* otherCharge shipping chages giftwrap transation discount */}
          {otherCharges ? (
            <View style={{marginVertical: 10}}>
              {/* shipping charge */}
              <View style={styles.otherChargesInputView}>
                <Text style={{flex: 0.5, color: '#000'}}>Shipping Charges</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
              {/* gift wrap */}
              <View style={styles.otherChargesInputView}>
                <Text style={{flex: 0.5, color: '#000'}}>GiftWrap Charges</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor={'#808080'}
                  style={styles.otherChargesInput}
                />
              </View>
              {/* transaction */}
              <View style={styles.otherChargesInputView}>
                <Text style={{flex: 0.5, color: '#000'}}>
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
                <Text style={{flex: 0.5, color: '#000'}}>Discount</Text>
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
              <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                Total
              </Text>
              <Text style={{color: '#000'}}>
                ₹ {products?.quentity * products.price}
              </Text>
            </View>
            <Text style={{color: '#808080', fontSize: 12, marginLeft: 10}}>
              Note : In case a shipment gets lost, the amount entered above will
              be refunded to youraccount.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleNextButton();
          }}
          style={styles.NextButton}>
          <Text style={styles.NextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* bottom sheet for select pickup address */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={height / 1.1}
        animationType="slide"
        openDuration={300}
        closeDuration={300}
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
            style={styles.RBSheetCloseButton}
            onPress={() => refRBSheet.current.close()}>
            <Image
              source={require('../assets/images/close1.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: GREEN_COLOR,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Pickup Address"
            placeholderTextColor={'#808080'}
            value={searchText}
            onChangeText={handleSearch}
            style={styles.searchBarInRBSheet}
          />
          {searchText !== '' && filteredUsers.length === 0 && (
            <View style={styles.NoResultView}>
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
            data={searchText === '' ? reverseData : filteredUsers}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            renderItem={({item, index}) => {
              const firstLetter = item.contact_person.charAt(0);
              return (
                <View style={styles.RBSheetFlatListParentView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectPickupAddress(item);
                      refRBSheet.current.close();
                    }}
                    style={{flexDirection: 'row'}}>
                    <View style={styles.RBSheetFlatListButtonView}>
                      <Text
                        style={{
                          color: '#000',
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
                        {item.contact_person}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#737373',
                          fontSize: 13,
                        }}>
                        {item.complete_address}
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
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingLeft: 10,
    // marginHorizontal: 10,
    marginVertical: 4,
    elevation: 1,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  title2text: {
    color: '#404040',
    fontFamily: 'Rubik-SemiBold',
    // fontSize: 14,
    marginLeft: 10,
  },
  pickupAddressView: {
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  pickupAddressText: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
  },
  selectLocationView: {
    flexDirection: 'row',
    height: height / 18,
    backgroundColor: '#ffff',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
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
  AddPickupAddress: {
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#808080',
    marginVertical: 10,
  },
  AddPickupAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 1,
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
    borderWidth: 1,
    borderColor: '#ccc',
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
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: '#ccc',
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
    elevation: 2,
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
  },
  WeightChildView1: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  WeightChildView2: {
    alignItems: 'center',
    flex: 0.2,
    // backgroundColor: GREEN_COLOR,
    backgroundColor: 'aliceblue',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 1,
    borderColor: '#f2f2f2',
  },
  dropdown: {
    height: height / 18,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#404040',
  },
  iconStyle: {
    width: 30,
    resizeMode: 'cover',
    tintColor: '#404040',
    height: 30,
    marginRight: 6,
  },
  addNewPackageBtnText: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
  },
  lengthInputView: {
    borderWidth: 1,
    borderColor: '#cccc',
    borderRadius: 4,
    flex: 0.32,
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  lengthInput: {
    paddingVertical: 8,
    margin: 0,
    color: '#000',
    fontSize: 13,
    paddingLeft: 4,
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#f2f2f2',
  },
  lengthCMText: {
    color: 'green',
    textAlignVertical: 'center',
    backgroundColor: 'aliceblue',
    paddingHorizontal: 4.5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 5,
  },
  PaymentParentView: {
    backgroundColor: '#fff',
    elevation: 2,
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
  cashOnDeliveryBtn: {
    backgroundColor: '#fff',
    padding: 2,
    borderWidth: 2,
    borderColor: '#cce7ff',
    width: 22,
    height: 22,
    borderRadius: 25,
  },
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
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NextButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
  },
  orderInvocesParent: {
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  orderInvocesChild1: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  orderInvocesInput: {
    height: height / 18,
    paddingVertical: 0,
    color: '#000',
    flex: 0.9,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 10,
  },
  orderInvocesGenerateBtn: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  orderInvocesGenerateBtnIMG: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#404040',
  },
  // RBSheet Styles
  RBSheetCloseButton: {
    marginRight: 20,
    marginTop: 10,
    alignSelf: 'flex-end',
    borderRadius: 30,
    padding: 9,
  },
  searchBarInRBSheet: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 1,
    color: '#404040',
  },
  NoResultView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RBSheetFlatListParentView: {
    backgroundColor: '#ffff',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 7,
    padding: 7,
    elevation: 2,
  },
  RBSheetFlatListButtonView: {
    backgroundColor: LIGHT_GREEN,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
