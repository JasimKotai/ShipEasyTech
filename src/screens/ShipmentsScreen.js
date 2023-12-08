import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import Header from '../components/Header';

const ShipmentsScreen = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Header
        title="Shipments"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* search button */}
      <View style={styles.searchButtonView}>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={require('../assets/images/search.png')}
            style={styles.searchBtnImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={require('../assets/images/filter.png')}
            style={styles.searchBtnImg}
          />
        </TouchableOpacity>
      </View>
      {/* parent view */}
      <View
        style={{
          flex: 1,
          marginTop: 5,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 2,
            margin: 20,
            flex: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/shipment.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={{color: '#404040'}}>No Shipments to show here</Text>
          <TouchableOpacity>
            <Text>Add Your First Shipment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShipmentsScreen;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchButtonView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: height / 21,
    backgroundColor: '#f0f8ff',
    width: width / 4,
    borderRadius: 15,
    padding: 5,
    alignSelf: 'flex-end',
    right: width / 20,
  },
  searchBtn: {
    marginRight: 10,
  },
  searchBtnImg: {
    width: width / 14,
    height: width / 16,
    resizeMode: 'contain',
    tintColor: '#000',
  },
});
