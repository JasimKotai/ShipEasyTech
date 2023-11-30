import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Modals from '../components/Modals';
import Header from '../components/Header';
import HelpAndSupport from './HelpAndSupport';

const ShipmentsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };
  //   <TouchableOpacity onPress={toggleModal}>
  //   <Text>Show Modal</Text>
  // </TouchableOpacity>
  // <Modals visible={modalVisible} onClose={toggleModal} />
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
      <HelpAndSupport/>
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
});
