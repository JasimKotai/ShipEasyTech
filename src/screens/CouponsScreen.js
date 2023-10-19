import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';

const CouponsScreen = ({navigation, route}) => {
  const {refRBSheet2} = route.params;
  const [coupon, setCoupon] = useState('');
  return (
    <View style={styles.container}>
      <Header
        title="View Offers"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TextInput placeholder="Enter Coupon Code" />
    </View>
  );
};

export default CouponsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
