import {View, Text, Dimensions, StyleSheet, FlatList} from 'react-native';
import React from 'react';

const AllOrders = () => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const data = [1, 2, 3];
  return (
    <View style={styles.container}>
      <FlatList />
    </View>
  );
};

export default AllOrders;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
