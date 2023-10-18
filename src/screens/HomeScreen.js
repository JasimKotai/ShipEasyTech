import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import QuickActionBtns from '../components/QuickActionBtns';
import ActionsRequiredBtns from '../components/ActionsRequiredBtns';
import BarChartScreen from '../components/BarChartScreen';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddOrderSheet from '../components/AddOrderSheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSelector} from 'react-redux';
import QuickRecharge from './QuickRecharge';

const HomeScreen = ({navigation}) => {
  const {user, customer, token} = useSelector(state => state.userSlice);
  const refRBSheet = useRef();
  const textInputRef = useRef(null);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [kyc, setKyc] = useState('');
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(true); // dont dlete
  const [showMetricsDay, setShowMetricsDay] = useState(false);
  const [shipmentButton, setShipmentButton] = useState('Last 30 days');
  const [modalVisible, setModalVisible] = useState(false);

  const handleFocusedKeyboard = () => {
    //dont delete
    textInputRef.current.focus();
    setFocus(true);
  };
  const handleCloseKeyboard = () => {
    // dont delete
    textInputRef.current.blur();
    Keyboard.dismiss();
    setFocus(false);
  };
  const data = [1, 1, 1, 1];
  //opening RBSheet dont delete
  const handleAddorder = () => {
    refRBSheet.current.open();
  };

  // barcode
  const handleRequestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        const granted = await PermissionsAndroid.request(permission); //await
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('DashBoard: camera permission granted');
          // handleCamera();
        } else {
          console.log('Permission denied');
        }
      }
    } catch (error) {
      console.log('DashBoard log:', error);
    }
  };

  const handleBarCodeScreen = () => {
    navigation.navigate('BarCodeScreen');
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      {/* quick recharge (modal) */}
      <QuickRecharge visible={modalVisible} onClose={toggleModal} />
      {/* handleAddorder */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 1.5}
        customStyles={{
          wrapper: {
            // backgroundColor: 'transparent',
            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            // backgroundColor: '#000',
            // backgroundColor: 'transparent',
            width: 0,
            height: 0,
            padding: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              marginRight: 20,
              marginTop: 15,
              alignSelf: 'flex-end',
            }}
            onPress={() => refRBSheet.current.close()}>
            <Image
              source={require('../assets/images/close.png')}
              style={{width: 15, height: 15, tintColor: GREEN_COLOR}}
            />
          </TouchableOpacity>
          <AddOrderSheet REF={refRBSheet} />
        </View>
      </RBSheet>
      {/* header */}
      <View style={styles.headerView}>
        <View style={styles.headerStyle}>
          <Image
            source={require('../assets/images/logo1.png')}
            style={{width: 115, height: 35, resizeMode: 'contain'}}
          />
          {/* wallet button */}
          <TouchableOpacity>
            <View style={styles.walletButton}>
              <Image
                source={require('../assets/images/wallet1.png')}
                style={styles.walletBtnIcon}
                tintColor={'#57bc53'}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: '#57bc53',
                  fontSize: 13,
                  fontFamily: 'Montserrat-Bold',
                }}>
                ₹0.00
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* search bar start */}
      {/* <View style={styles.searchBarView}>
        {focus ? (
          <TouchableOpacity
            onPress={() => {
              // setFocus(false);
              handleCloseKeyboard();
            }}>
            <Image
              source={require('../assets/images/back.png')}
              style={{
                width: 20,
                tintColor: '#808080',
                height: 20,
                marginHorizontal: 5,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // setFocus(true); // handleFocusedKeyboard me true kar rhe hai islie yaha pe comment hai
              handleFocusedKeyboard();
            }}>
            <Image
              source={require('../assets/images/search-icon.png')}
              style={{
                width: 20,
                tintColor: '#808080',
                height: 20,
                marginHorizontal: 5,
              }}
            />
          </TouchableOpacity>
        )}

        <TextInput
          placeholder="Search"
          placeholderTextColor={'#808080'}
          value={search}
          onChangeText={setSearch}
          ref={textInputRef}
          onFocus={() => {
            setFocus(true);
          }}
          style={{
            flex: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            color: '#000',
          }}
        />
        {search.length !== 0 ? (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
            }}>
            <Image
              source={require('../assets/images/close.png')}
              style={{width: 13, height: 13, marginRight: 15}}
            />
          </TouchableOpacity>
        ) : null}
      </View> */}
      {/* search bar end */}
      {/* search result view */}
      {/* <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <Text style={styles.SearchingText}>Searching....</Text>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <View style={styles.searchResultBtn}>
                  <Text numberOfLines={1} style={styles.searchResultBtnText}>
                    Hello World
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        /> 
      </View>
        */}
      {/* quick view */}
      <ScrollView style={{flex: 1}}>
        <View style={styles.quickView}>
          <Text style={styles.quickAction}>Quick Action</Text>
          <View style={styles.QuickActionBtnsView}>
            <QuickActionBtns
              image={require('../assets/images/box2.png')}
              title="Add Order"
              onPress={handleAddorder}
            />
            <QuickActionBtns
              image={require('../assets/images/wallet1.png')}
              title="Quick Recharge"
              onPress={toggleModal}
              // onPress={() => {
              //   navigation.navigate('QuickRecharge');
              // }}
            />
            <QuickActionBtns
              image={require('../assets/images/barcode.png')}
              title="Bar Code Scanner"
              // onPress={handleRequestCameraPermission}
              onPress={handleBarCodeScreen}
            />
            {/* <QuickActionBtns
              image={require('../assets/images/calculator.png')}
              title="Shipping Rate Calculator"
            /> */}
          </View>
        </View>
        {/* action required */}
        <View style={styles.actionRequiredview}>
          <Text style={styles.quickAction}>Action Required</Text>
          <View style={styles.actionRequiredviewchild}>
            <ActionsRequiredBtns
              title="New Order To Be Processed"
              btn="Ship Now"
            />
            <ActionsRequiredBtns
              title="Order with Weight Discrepancies"
              btn="Manage"
            />
            <ActionsRequiredBtns title="Update NDR Instruction" btn="Update" />
          </View>
        </View>
        {/* shipment metrics */}
        <View style={styles.shipmentMetrics}>
          <Text style={styles.quickAction}>Shipment Metrics</Text>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingTop: 20,
              borderRadius: 10,
            }}>
            <Text style={{color: '#000', marginLeft: 10}}>
              Total Shipment: 0
            </Text>
            {/* bar chart is here  */}
            <View
              style={{
                flex: 1,
                // backgroundColor: 'red',
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <BarChartScreen />
            </View>

            <View
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                // height: height / 4.5,
                width: width / 3,
                backgroundColor: '#FFFFFF',
                elevation: 10,
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <TouchableOpacity
                style={[styles.shipmentMetricsBtn, {}]}
                onPress={() => {
                  setShowMetricsDay(!showMetricsDay);
                }}>
                <Text numberOfLines={1} style={styles.shipmentMetricsBtnText}>
                  {shipmentButton}
                </Text>
                <View
                  style={{
                    width: '20%',
                  }}>
                  <Image
                    source={require('../assets/images/drop-down.png')}
                    style={{
                      width: 20,
                      height: 15,
                      // tintColor: '#000',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </TouchableOpacity>
              {showMetricsDay ? (
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setShipmentButton('Today');
                      setShowMetricsDay(!showMetricsDay);
                    }}
                    style={styles.shipmentMetricsBtn}>
                    <Text
                      numberOfLines={1}
                      style={styles.shipmentMetricsBtnText}>
                      Today
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShipmentButton('Yesterday');
                      setShowMetricsDay(!showMetricsDay);
                    }}
                    style={styles.shipmentMetricsBtn}>
                    <Text
                      numberOfLines={1}
                      style={styles.shipmentMetricsBtnText}>
                      Yesterday
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShipmentButton('Last 30 days');
                      setShowMetricsDay(!showMetricsDay);
                    }}
                    style={styles.shipmentMetricsBtn}>
                    <Text
                      numberOfLines={1}
                      style={styles.shipmentMetricsBtnText}>
                      Last 30 days
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShipmentButton('Custom');
                      setShowMetricsDay(!showMetricsDay);
                    }}
                    style={styles.shipmentMetricsBtn}>
                    <Text
                      numberOfLines={1}
                      style={styles.shipmentMetricsBtnText}>
                      Custom
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: height / 19,
    paddingHorizontal: 15,
  },
  headerView: {
    // position: 'absolute',
    height: height / 6,
    width: width,
    backgroundColor: LIGHT_GREEN,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  walletBtnIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 4,
    height: width / 15,
  },
  searchBarView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#FFFF',
    height: height / 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 10,
  },
  SearchingText: {
    textAlign: 'center',
    color: '#808080',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginVertical: 20,
  },
  searchResultBtn: {
    backgroundColor: '#eeeeee',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    // borderBottomWidth: 0.5,
    borderWidth: 0.2,
    borderColor: '#808080',
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  searchResultBtnText: {
    color: '#000',
    fontSize: 12,
  },
  quickAction: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  QuickActionBtnsView: {
    // backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickView: {
    // flex: 1,
    backgroundColor: '#FFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  actionRequiredview: {
    // flex: 1,
    backgroundColor: '#FFFF',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  actionRequiredviewchild: {
    padding: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    elevation: 5,
  },
  shipmentMetrics: {
    backgroundColor: '#e6ffef',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  shipmentMetricsBtn: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
  },
  shipmentMetricsBtnText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    width: '80%',
    paddingLeft: 8,
    lineHeight: 35,
  },
});
