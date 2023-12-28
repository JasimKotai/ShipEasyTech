// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   KeyboardAvoidingView,
// } from 'react-native';
// import React, {useState} from 'react';
// import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
// import {English} from '../Languages/EnglishLan';
// import {Hindi} from '../Languages/HindiLan';

// const Temp = ({navigation}) => {
//   const height = Dimensions.get('window').height;
//   const width = Dimensions.get('window').width;
//   const [address, setAddress] = useState('empty');
//   const [productName, setProductName] = useState('');
//   const [showMore, setShowMore] = useState('show More +');
//   const [productCategory, setproductCategory] = useState('');
//   const [products, setProducts] = useState([]);
//   const addAnotherProduct = () => {
//     const uniqueId = new Date().getTime(); // Unique identifier for the product
//     setProducts([...products, {renderProductDetails, id: uniqueId}]);
//   };
//   const deleteProduct = index => {
//     const updatedProducts = products.filter((item, i) => i !== index);
//     setProducts(updatedProducts);
//   };
//   const renderProductDetails = (item, index) => {
//     return (
//       <View key={index}>
//         <View style={styles.selectLocationView}>
//           <TextInput
//             placeholder="Product Name"
//             style={styles.enterLocationInput}
//             value={productName}
//             onChangeText={setProductName}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               if (index !== 0) {
//                 deleteProduct(index);
//               }

//               //   deleteProduct(index);
//               //   console.log(index);
//             }}
//             disabled={index === 0}
//             style={styles.locationSearchBtn}>
//             <Image
//               source={require('../assets/images/delete.png')}
//               style={{
//                 width: 25,
//                 height: 25,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//         {/* quantity and unit price */}
//         <View style={styles.quantityUnitPriceView}>
//           <TextInput
//             placeholder="Quantity"
//             style={styles.QuantityInput}
//             keyboardType="number-pad"
//           />
//           <TextInput
//             placeholder="Unit Price"
//             style={styles.QuantityInput}
//             keyboardType="number-pad"
//           />
//         </View>
//         <TextInput placeholder="SKU" style={styles.SKUInput} />
//         {/* show more button start*/}
//         <TouchableOpacity style={styles.showMore}>
//           <Text style={styles.showMoreText}>{showMore}</Text>
//         </TouchableOpacity>
//         {/* show more button end*/}
//         {/* product category button */}
//         <TouchableOpacity style={styles.productCategoryBtn}>
//           <Text style={{fontSize: 10, color: '#999999'}}>
//             Product Category (Optional)
//           </Text>
//           {productCategory ? (
//             <Text numberOfLines={1} style={{color: '#000'}}>
//               {productCategory}
//             </Text>
//           ) : null}
//         </TouchableOpacity>
//         {/* HSN (Optional) input */}
//         <TextInput placeholder="HSN (Optional)" style={styles.HSNInput} />
//         {/* Tax Rate & Discount inputs view start */}
//         <View style={styles.TaxRateDiscountView}>
//           <TextInput
//             placeholder="Tax Rate (Optional)"
//             style={styles.TaxRateDiscountInput}
//           />
//           <TextInput
//             placeholder="Discount (Optional)"
//             style={styles.TaxRateDiscountInput}
//           />
//         </View>
//         {/* Tax Rate & Discount inputs view end */}
//         {/* divider view start*/}
//         <View
//           style={{
//             height: 2,
//             backgroundColor: '#cccccc',
//             marginVertical: 20,
//           }}
//         />
//         {/* divider view end */}
//       </View>
//     );
//   };

//   return (
//     // <KeyboardAvoidingView enabled={true} style={{flex: 1}} behavior={'height'}>
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* back button */}
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack();
//           }}>
//           <Image
//             source={require('../assets/images/back.png')}
//             style={{width: 25, height: 25}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.title}>Quick Shipment</Text>
//         {/* <Text style={styles.title}>{Hindi.Header}</Text> */}
//       </View>
//       <View style={styles.title2View}>
//         <Text style={styles.title2text}>Add Order Details</Text>
//       </View>
//       <ScrollView style={{flex: 1, paddingHorizontal: 5}}>
//         {/* pick up address view */}
//         <View style={styles.pickupAddressView}>
//           <Text style={styles.pickupAddressText}>Select Pickup Address</Text>
//           {/* <View style={styles.enterLocationView}> */}
//           <View style={styles.selectLocationView}>
//             {/* <TextInput
//                   placeholder="Select Pickup Address"
//                   style={styles.enterLocationInput}
//                   value={address}
//                   onChangeText={setAddress}
//                 /> */}
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 paddingHorizontal: 10,
//               }}>
//               <Text style={{fontSize: 10, color: '#999999'}} numberOfLines={1}>
//                 Selected Pickup Address
//               </Text>

//               <Text style={{color: '#000'}} numberOfLines={1}>
//                 {address}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.locationSearchBtn}>
//               <Image
//                 source={require('../assets/images/search-icon.png')}
//                 style={{width: 25, height: 25, tintColor: GREEN_COLOR}}
//               />
//             </TouchableOpacity>
//           </View>
//           {/* gps location button */}
//           <View style={styles.pickupLocationView}>
//             <TouchableOpacity
//               style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Image
//                 source={require('../assets/images/location.png')}
//                 style={{
//                   width: 18,
//                   height: 18,
//                   tintColor: GREEN_COLOR,
//                   resizeMode: 'contain',
//                 }}
//               />
//               <Text
//                 style={{
//                   color: GREEN_COLOR,
//                   fontFamily: 'Montserrat-SemiBold',
//                 }}>
//                 Add Pickup Address
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Delivery pincode */}
//         <View style={styles.pickupAddressView}>
//           <Text style={styles.pickupAddressText}>
//             Delivery Pincode <Text style={{color: '#cccccc'}}>(Optional)</Text>
//           </Text>
//           <View style={styles.selectLocationView}>
//             <TextInput
//               placeholder="Pincode"
//               style={styles.enterLocationInput}
//               keyboardAppearance="default"
//               keyboardType="number-pad"
//             />
//           </View>
//           <Text style={{color: '#bfbfbf', fontSize: 10}}>
//             Note : Entering pincode will check pincode is available or not
//           </Text>
//         </View>
//         {/* product details */}

//         <View style={styles.pickupAddressView}>
//           <Text style={styles.pickupAddressText}>Product Details</Text>

//           {/* wrapper view */}
//           {products.map((item, index) => {
//             return renderProductDetails(item, index);
//           })}
//           <TouchableOpacity
//             onPress={() => {
//               addAnotherProduct();
//             }}
//             style={styles.AddAnotherBtn}>
//             <Text style={styles.AddAnotherBtnText}>+ Add Another Product</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//     //{/* </KeyboardAvoidingView> */}
//   );
// };

// export default Temp;
// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;
// // console.log(width/6);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFF',
//   },
//   header: {
//     backgroundColor: '#e6ffef',
//     height: height / 7,
//     borderBottomLeftRadius: 60,
//     borderBottomRightRadius: 60,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingLeft: 20,
//   },
//   title: {
//     color: '#000',
//     fontFamily: 'Poppins-Regular',
//     fontSize: 20,
//     marginLeft: width / 6,
//     // marginLeft: 64,
//   },
//   title2View: {
//     backgroundColor: '#ffff',
//     paddingVertical: 10,
//     paddingLeft: 10,
//     // marginHorizontal: 10,
//     marginTop: 5,
//     elevation: 5,
//   },
//   title2text: {
//     color: '#000',
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   pickupAddressView: {
//     backgroundColor: '#fff',
//     elevation: 5,
//     marginHorizontal: 5,
//     marginVertical: 10,
//     // borderWidth: 0.6,
//     padding: 10,
//     borderRadius: 5,
//   },
//   pickupAddressText: {
//     color: '#000',
//     fontFamily: 'Poppins-Regular',
//   },
//   selectLocationView: {
//     flexDirection: 'row',
//     height: height / 18,
//     backgroundColor: '#ffff',
//     marginTop: 10,
//     borderRadius: 5,
//     borderWidth: 0.5,
//     borderColor: '#808080',
//   },
//   enterLocationInput: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     color: '#000',
//     // backgroundColor: 'red',
//     height: height / 18,
//     paddingVertical: 0,
//   },
//   locationSearchBtn: {
//     flex: 0.2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderLeftWidth: 0.5,
//     borderColor: '#808080',
//   },
//   pickupLocationView: {
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderColor: '#808080',
//     marginVertical: 10,
//   },
//   quantityUnitPriceView: {
//     height: height / 18,
//     marginVertical: 10,
//     flexDirection: 'row',
//     // borderWidth: 0.5,
//     // borderColor: '#808080',
//     // borderRadius: 5,
//     justifyContent: 'space-between',
//   },
//   QuantityInput: {
//     flex: 0.47,
//     borderWidth: 0.4,
//     borderColor: '#808080',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     height: height / 18,
//     paddingVertical: 0,
//     alignItems: 'center',
//     // backgroundColor: 'green',
//   },
//   SKUInput: {
//     flex: 1,
//     // backgroundColor: 'red',
//     height: height / 18,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     borderWidth: 0.5,
//     paddingVertical: 0,
//     borderColor: '#808080',
//     color: '#000',
//     alignItems: 'center',
//   },
//   showMore: {
//     width: 120,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   showMoreText: {
//     color: GREEN_COLOR,
//     fontFamily: 'Poppins-Regular',
//   },
//   productCategoryBtn: {
//     flex: 1,
//     height: height / 18,
//     borderWidth: 0.5,
//     borderColor: '#808080',
//     // backgroundColor: 'red',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//   },
//   HSNInput: {
//     borderWidth: 0.5,
//     borderColor: '#808080',
//     marginTop: 10,
//     borderRadius: 5,
//     flex: 1,
//     height: height / 18,
//     color: '#000',
//     alignItems: 'center',
//     paddingVertical: 0,
//     paddingHorizontal: 10,
//   },
//   TaxRateDiscountView: {
//     flexDirection: 'row',
//     flex: 1,
//     height: height / 18,
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   TaxRateDiscountInput: {
//     // backgroundColor: 'red',
//     flex: 0.47,
//     height: height / 18,
//     borderWidth: 0.5,
//     borderColor: '#808080',
//     borderRadius: 5,
//     paddingVertical: 0,
//     color: '#000',
//   },
//   AddAnotherBtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: GREEN_COLOR,
//     backgroundColor: LIGHT_GREEN,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   AddAnotherBtnText: {
//     color: '#000',
//     fontFamily: 'Poppins-SemiBold',
//   },
// });
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Temp = () => {
  return (
    <View>
      <Text>Temp</Text>
    </View>
  );
};

export default Temp;

const styles = StyleSheet.create({});
