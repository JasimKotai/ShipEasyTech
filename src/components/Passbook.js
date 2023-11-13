import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Passbook = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notFoundView}>
        <Image
          source={require('../assets/images/not-found.png')}
          style={{width: 100, height: 100}}
        />
      </View>
    </View>
  );
};

export default Passbook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundView: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
