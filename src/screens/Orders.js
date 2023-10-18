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
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {TEXT_BLACK2} from '../assets/fontStyles';

const Orders = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const Buttons = ({title}) => {
    return (
      <TouchableOpacity style={styles.topBarButtons}>
        <Text style={styles.topBarButtonsTxt}>{title}</Text>
      </TouchableOpacity>
    );
  };
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
      {/* top bar buttons */}
      <View
        style={{
          backgroundColor: LIGHT_GREEN,
          marginTop: height / 26,
          flexDirection: 'row',
        }}>
        <Buttons title="All" />
        <Buttons title="New" />
        <Buttons title="Hyperlocal" />
        <Buttons title="Returns" />
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
    justifyContent: 'center',
    marginTop: -height / 11,
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
  topBarButtons: {
    backgroundColor: '#ffffff',
    // padding: 10,
    width: width / 4,
    // borderLeftWidth: 1,
    borderBottomWidth: 2,
    // borderColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  topBarButtonsTxt: {
    color: TEXT_BLACK2,
    fontFamily: 'Onest-SemiBold',
  },
});
