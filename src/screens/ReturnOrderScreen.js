import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/Header';

const ReturnOrderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        title="Return Order - Add Details"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>ReturnOrderScreen</Text>
    </View>
  );
};

export default ReturnOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
