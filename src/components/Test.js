// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import React, {useState} from 'react';
// import RazorpayCheckout from 'react-native-razorpay';

// const Test = () => {
//   // const handleRazorPay = () => {
//   //   var options = {
//   //     description: 'Credits towards consultation',
//   //     image: 'https://i.imgur.com/3g7nmJC.jpg',
//   //     currency: 'INR',
//   //     key: 'rzp_test_v25tyhnZrSNdeo',
//   //     amount: '5000',
//   //     name: 'Acme Corp',
//   //     order_id: '', //Replace this with an order_id created using Orders API.
//   //     prefill: {
//   //       email: 'gaurav.kumar@example.com',
//   //       contact: '9191919191',
//   //       name: 'Gaurav Kumar',
//   //     },
//   //     theme: {color: '#53a20e'},
//   //   };
//   //   RazorpayCheckout.open(options)
//   //     .then(data => {
//   //       // handle success
//   //       alert(`Success: ${data.razorpay_payment_id}`);
//   //     })
//   //     .catch(error => {
//   //       // handle failure
//   //       console.log('razor pay error ; ', error);
//   //       alert(`Error: ${error.code} | ${error.description}`);
//   //     });
//   // };

//   const handleRazorPay = async () => {
//     const options = {
//       description: 'Credits towards consultation',
//       image: require('../assets/images/logo1.png'),
//       currency: 'INR',
//       key: 'rzp_test_v25tyhnZrSNdeo',
//       amount: 50 * 100,
//       name: 'Ship Easy Tech',
//       order_id: '', //Replace this with an order_id created using Orders API.
//       prefill: {
//         email: 'gaurav.kumar@example.com',
//         contact: '9191919191',
//         name: 'Gaurav Kumar',
//       },
//       theme: {color: '#53a20e'},
//     };

//     try {
//       const data = await RazorpayCheckout.open(options);
//       // Handle success
//       alert(`Success: ${data.razorpay_payment_id}`);
//     } catch (error) {
//       // Handle failure
//       console.log('razor pay error ; ', error);
//       alert(`Error: ${error.code} | ${error.description}`);
//     }
//   };
//   let scanArea = null;
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => {
//           handleRazorPay();
//         }}
//         style={styles.btn}>
//         <Text>Press</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Test;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btn: {
//     backgroundColor: 'gray',
//     borderWidth: 5,
//     borderColor: 'aliceblue',
//     padding: 10,
//     paddingHorizontal: 20,
//   },
// });

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Test = () => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
