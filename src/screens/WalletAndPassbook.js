import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Test from '../components/Test';

const WalletAndPassbook = () => {
  return (
    <View style={styles.container}>
      <Test />
    </View>
  );
};

export default WalletAndPassbook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
