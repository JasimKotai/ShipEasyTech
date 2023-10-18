import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';

const Orders = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Header
        title="Orders"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* search button */}
      <View style={styles.searchButtonView}>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={require('../assets/images/search-icon.png')}
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
    </View>
  );
};

export default Orders;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  searchButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -height / 11,
  },
  searchBtn: {
    marginRight: 10,
  },
  searchBtnImg: {
    width: width / 15,
    height: width / 17,
    resizeMode: 'contain',
  },
});
