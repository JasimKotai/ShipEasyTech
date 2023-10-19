import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {TEXT_BLACK2} from '../assets/fontStyles';
import AllOrders from '../components/AllOrders';
import NewOrders from '../components/NewOrders';
import HyperlocalOrders from '../components/HyperlocalOrders';
import ReturnOrders from '../components/ReturnOrders';

const Orders = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [selectedTopBar, setSelectedTopBar] = useState('All');

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
        <TouchableOpacity
          onPress={() => {
            setSelectedTopBar('All');
          }}
          style={[
            styles.topBarButtons,
            selectedTopBar === 'All' ? {borderColor: GREEN_COLOR} : null,
          ]}>
          <Text style={styles.topBarButtonsTxt}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTopBar('New');
          }}
          style={[
            styles.topBarButtons,
            selectedTopBar === 'New' ? {borderColor: GREEN_COLOR} : null,
          ]}>
          <Text style={styles.topBarButtonsTxt}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTopBar('Hyperlocal');
          }}
          style={[
            styles.topBarButtons,
            selectedTopBar === 'Hyperlocal' ? {borderColor: GREEN_COLOR} : null,
          ]}>
          <Text style={styles.topBarButtonsTxt}>Hyperlocal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTopBar('Returns');
          }}
          style={[
            styles.topBarButtons,
            selectedTopBar === 'Returns' ? {borderColor: GREEN_COLOR} : null,
          ]}>
          <Text style={styles.topBarButtonsTxt}>Returns</Text>
        </TouchableOpacity>
      </View>
      {selectedTopBar === 'All' ? (
        <AllOrders />
      ) : selectedTopBar === 'New' ? (
        <NewOrders />
      ) : selectedTopBar === 'Hyperlocal' ? (
        <HyperlocalOrders />
      ) : selectedTopBar === 'Returns' ? (
        <ReturnOrders />
      ) : null}
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
    width: width / 4,
    borderColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderBottomWidth: 4,
  },
  topBarButtonsTxt: {
    color: TEXT_BLACK2,
    fontFamily: 'Onest-SemiBold',
  },
});
