import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const ReturnOrders = () => {
  return (
    <View style={styles.container}>
      <View style={styles.NoResultView}>
        <Image
          source={require('../assets/images/shipment.png')}
          style={{
            width: 120,
            height: 80,
            backfaceVisibility: 'visible',
            backgroundColor: 'black',
            borderRadius: 10,
            tintColor: 'white',
            resizeMode: 'center'
          }}
        />
        <Text style={styles.NoResultTxt}>No Result</Text>
      </View>
    </View>
  );
};

export default ReturnOrders;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
  },
  NoResultView: {
    margin: 10,
    elevation: 5,
    padding: 20,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 10,
  },
  NoResultTxt: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-SemiBold',
    marginTop: 10,
  },
});
