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
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import QuickActionBtns from '../components/QuickActionBtns';
import ActionsRequiredBtns from '../components/ActionsRequiredBtns';
import BarChartScreen from '../components/BarChartScreen';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddOrderSheet from '../components/AddOrderSheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSelector} from 'react-redux';
import QuickRecharge from './QuickRecharge';

import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const {user, customer, token} = useSelector(state => state.userSlice);
  // console.log('-=-----', customer.c_api_password);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const textInputRef = useRef(null);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [kyc, setKyc] = useState('');
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(true); // dont dlete
  const [showMetricsDay, setShowMetricsDay] = useState(false);
  const [shipmentButton, setShipmentButton] = useState('Last 30 days');
  const [modalVisible, setModalVisible] = useState(false);

  const lineChartData = [
    {value: 15, label: 'Mon', dataPointText: 15},
    {value: 30, label: 'Tue', dataPointText: 15},
    {value: 40, label: 'Wed', dataPointText: 15},
    {value: 90, label: 'Thu', dataPointText: 15},
    {value: 25, label: 'Fri', dataPointText: 15},
    {value: 75, label: 'Sat', dataPointText: 15},
    {value: 90, label: 'Thu', dataPointText: 15},
    {value: 50, label: 'Fri', dataPointText: 15},
    {value: 100, label: 'Sat', dataPointText: 15},
  ];

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

  // barcode
  const handleRequestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        const granted = await PermissionsAndroid.request(permission); //await
        console.log('DashBoard log: --', granted);
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
  //opening RBSheet for add order dont delete
  const handleAddorder = () => {
    refRBSheet.current.open();
  };
  //opening RBSheet for QuickRecharge
  const handleQuickRecharge = () => {
    refRBSheet2.current.open();
  };

  const handleCalulatorScreen = () => {
    navigation.navigate('Calculator');
  };

  // fetch orders details
  const [totalOrders, setTotalOrders] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      // console.log('useFocusEffect : ');
      const handleOrderDetails = async () => {
        try {
          const response = await axios.get(
            'http://192.168.1.14/shipeasy-prod/public/api/count-of-orders',
            {
              headers: {
                Authorization:
                  // 'Bearer 19|Wt2nzzdbewfScK9kjd4gRVfBEJecTzv9uTxqN9FO845b73cc',
                  `Bearer ${customer.c_api_password}`,
              },
            },
          );
          // console.log('-=-=-', response.data);
          if (response.data) {
            setTotalOrders(response.data);
          }
        } catch (error) {
          console.log('home screen did not get total order details ', error);
        }
      };
      handleOrderDetails();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      {/* RBSheet for Addorder */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 1.5}
        animationType="slide"
        openDuration={100}
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
              alignSelf: 'flex-end',
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 20,
              elevation: 0.7,
              right: 15,
              marginVertical: 5,
            }}
            onPress={() => refRBSheet.current.close()}>
            <Image
              source={require('../assets/images/close1.png')}
              style={{width: 15, height: 15}}
            />
          </TouchableOpacity>
          <AddOrderSheet REF={refRBSheet} />
        </View>
      </RBSheet>
      {/* RBSheet for QuickRecharge */}
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        height={height / 1.5}
        openDuration={100}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          draggableIcon: {
            // backgroundColor: '#000',
            padding: 0,
            width: 0,
            height: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 20,
              elevation: 0.7,
              right: 15,
              marginVertical: 5,
            }}
            onPress={() => refRBSheet2.current.close()}>
            <Image
              source={require('../assets/images/close1.png')}
              style={{width: 15, height: 15}}
            />
          </TouchableOpacity>
          <QuickRecharge navigation={navigation} refRBSheet2={refRBSheet2} />
        </View>
      </RBSheet>
      {/* RBSheet for QuickRecharge end */}

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
                tintColor={'green'}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: 'green',
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
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
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
              onPress={handleQuickRecharge}
              // onPress={toggleModal}
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
            <QuickActionBtns
              image={require('../assets/images/calculator.png')}
              title="Shipping Rate Calculator"
              onPress={handleCalulatorScreen}
            />
          </View>
        </View>
        {/* action required */}
        <View style={styles.actionRequiredview}>
          <Text style={styles.quickAction}>Transactions</Text>
          <View style={styles.actionRequiredviewchild}>
            <ActionsRequiredBtns
              // title="New Order To Be Processed"
              title="Ready To Ship"
              btn="Ship Now"
              updates={
                totalOrders !== null
                  ? totalOrders.order_list_ready_to_ship_count
                  : '0'
              }
            />
            <ActionsRequiredBtns
              // title="Order with Weight Discrepancies"
              title="In-Transit"
              btn="Manage"
              updates={
                totalOrders !== null
                  ? totalOrders.order_list_intransit_count
                  : '0'
              }
            />
            <ActionsRequiredBtns
              title="Delivered"
              btn="Update"
              updates={
                totalOrders !== null
                  ? totalOrders.order_list_delivered_count
                  : '0'
              }
            />

            <ActionsRequiredBtns
              title="RTO"
              btn="Update"
              updates={totalOrders !== null ? totalOrders.rto_count : '0'}
            />
            <ActionsRequiredBtns
              title="RVP"
              btn="Update"
              updates={totalOrders !== null ? totalOrders.rvp_count : '0'}
            />
          </View>
        </View>
        {/* shipment metrics */}
        {/* <View style={styles.shipmentMetrics}>
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

           // bar chart is here 
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <BarChartScreen />
            </View>

            <View style={styles.shipmentMetricsDropDown}>
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
        </View> */}
        {/* line chart  */}
        <View style={[styles.shipmentMetrics]}>
          <Text style={[styles.quickAction, {marginLeft: 10,}]}>Daily Order Growth</Text>
          <View
            style={{
              marginVertical: 5,
              backgroundColor: '#fff',
              paddingVertical: 10,
            }}>
            <LineChart
              data={lineChartData}
              curved
              // color="rgb(84,219,234)"
              color={GREEN_COLOR}
              thickness={5}
              hideDataPoints={false}
              // hideRules
              rulesColor={'#f2f2f2'}
              rulesThickness={1}
              rulesType="solid"
              yAxisColor={GREEN_COLOR}
              yAxisTextStyle={{color: '#404040'}}
              showVerticalLines
              verticalLinesColor="#f2f2f2"
              xAxisColor={GREEN_COLOR}
              isAnimated
              focusEnabled
              showStripOnFocus
              showTextOnFocus
              backgroundColor={'#fff'}
              // focusedDataPointShape="rect"
              // focusedDataPointWidth={10}
              // focusedDataPointHeight={15}
              // focusedDataPointColor="#F00"
              // focusedDataPointRadius={10}
            />
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
    color: '#404040',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  QuickActionBtnsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickView: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  actionRequiredview: {
    backgroundColor: EXTRA_LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  actionRequiredviewchild: {
    padding: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    elevation: 1,
  },
  shipmentMetrics: {
    backgroundColor: '#e6ffef',
    paddingVertical: 10,
    paddingBottom: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginVertical: 10,
  },
  shipmentMetricsBtn: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
  },
  shipmentMetricsBtnText: {
    fontSize: 12,
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    width: '80%',
    paddingLeft: 8,
    lineHeight: 35,
  },
  shipmentMetricsDropDown: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: width / 2.9,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 1,
  },
});
