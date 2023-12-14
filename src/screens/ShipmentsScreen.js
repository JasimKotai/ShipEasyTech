import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GREEN_COLOR} from '../assets/Colors';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
// console.log(Width / 26);

const ShipmentsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const refRBSheet = useRef();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focuseSearchBar, setFocuseSearchBar] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState('Courier');

  const handleHideKeyboard = () => {
    setShowSearchBar(!showSearchBar);
    setFocuseSearchBar(!focuseSearchBar);
  };

  useEffect(() => {
    if (!isFocused) {
      // Reset state when navigating away from the screen
      setShowSearchBar(false);
      setFocuseSearchBar(false);
    }
  }, [isFocused]);

  const [courierSelectedItems, setCourierSelectedItems] = useState([]);
  // console.log(courierSelectedItems.length);

  const toggleSelect = itemName => {
    setCourierSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(itemName)
        ? prevSelectedItems.filter(item => item !== itemName)
        : [...prevSelectedItems, itemName],
    );
  };

  const initialData = [
    {id: '1', name: 'India Post'},
    {id: '2', name: 'Delhivery'},
    {id: '3', name: 'DTDC'},
    {id: '4', name: 'Blue Dart'},
    {id: '5', name: 'FedEx India'},
    {id: '6', name: 'XpressBees'},
    {id: '7', name: 'Ecom Express'},
    {id: '8', name: 'Shadowfax'},
    {
      id: '9',
      name: 'hello world hello world hello world hello world',
    },
  ];

  const fetchDataBasedOnSelection = () => {
    // Filter the initial data based on selected items
    const filteredData = initialData.filter(item =>
      courierSelectedItems.includes(item.name),
    );
    console.log('-: -:', filteredData);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Shipments"
        onPress={() => {
          navigation.goBack();
        }}
      />

      {/* search Bar View */}
      <View style={styles.searchBarView}>
        {showSearchBar && (
          <View style={styles.searchBarViewChild1}>
            <TouchableOpacity
              onPress={handleHideKeyboard}
              style={styles.hideKeyBoardBtn}>
              <Image
                source={require('../assets/images/back.png')}
                style={{width: 18, height: 18}}
              />
            </TouchableOpacity>
            <TextInput
              // ref={textInputRef}
              autoFocus={focuseSearchBar}
              placeholderTextColor={'#ccc'}
              placeholder="Search for order ID/AWB, number"
              style={styles.searchID}
            />
          </View>
        )}

        <View style={styles.searchBarViewChild2}>
          <TouchableOpacity
            onPress={() => {
              setShowSearchBar(!showSearchBar);
              setFocuseSearchBar(!focuseSearchBar);
            }}
            style={styles.searchBtn}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchBtnImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={styles.searchBtn}>
            <Image
              source={require('../assets/images/filter.png')}
              style={styles.searchBtnImg}
            />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity onPress={fetchDataBasedOnSelection}>
            <Text>Add Your First Shipment</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* RBSheet */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={Height / 1.07}
        animationType="slide"
        openDuration={100}
        closeDuration={100}
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
        <View
          style={{
            flex: 0.08,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={styles.bottomSheetCloseButton}
            onPress={() => refRBSheet.current.close()}>
            <Image
              source={require('../assets/images/close1.png')}
              style={styles.bottomSheetCloseButtonImage}
            />
          </TouchableOpacity>
        </View>
        {/* Parent View for multiplying view for left screen and right screen */}
        <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'row'}}>
          {/* left view */}
          <View style={styles.LeftView}>
            <FlatList
              data={[
                {id: '1', status: 'Courier'},
                {id: '2', status: 'Status'},
                {id: '3', status: 'Payment'},
                {id: '4', status: 'Order Tags'},
                {id: '5', status: 'Date'},
                {id: '6', status: 'Channel'},
                {id: '7', status: 'Secured Shipments'},
              ]}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFilter(item.status);
                    }}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor:
                          selectedFilter === item.status ? '#fff' : '#f2f2f2',
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          selectedFilter === item.status
                            ? GREEN_COLOR
                            : '#404040',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: Width / 28,
                      }}>
                      {item.status}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* right view */}
          <View style={styles.RightView}>
            {/* courier screen */}
            {selectedFilter === 'Courier' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={'#666'}
                  style={styles.courierSearchBar}
                />
                {/* flatlist courier company name */}
                <FlatList
                  data={[
                    {id: '1', name: 'India Post'},
                    {id: '2', name: 'Delhivery'},
                    {id: '3', name: 'DTDC'},
                    {id: '4', name: 'Blue Dart'},
                    {id: '5', name: 'FedEx India'},
                    {id: '6', name: 'XpressBees'},
                    {id: '7', name: 'Ecom Express'},
                    {id: '8', name: 'Shadowfax'},
                    {
                      id: '9',
                      name: 'hello world hello world hello world hello world',
                    },
                  ]}
                  renderItem={({item}) => {
                    const isSelected = courierSelectedItems.includes(item.name);

                    return (
                      <TouchableOpacity
                        onPress={() => toggleSelect(item.name)}
                        style={[
                          styles.courierFlatlistParent,
                          {
                            backgroundColor: isSelected ? '#f2f2f2' : 'white',
                          },
                        ]}>
                        <View
                          style={[
                            styles.courierFlatlistChild,
                            {
                              backgroundColor: isSelected ? '#fff' : '#f2f2f2',
                            },
                          ]}>
                          {isSelected && (
                            <Image
                              source={require('../assets/images/check-mark.png')}
                              style={{width: Width / 22, height: Width / 22}}
                              tintColor={GREEN_COLOR}
                            />
                          )}
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#404040',
                              fontFamily: 'Poppins-Regular',
                              fontSize: Width / 27,
                            }}
                            numberOfLines={2}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            )}

            {/* status screen */}
            {selectedFilter === 'Status' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={'#666'}
                  style={styles.courierSearchBar}
                />
                {/* flatlist status check */}
                <FlatList
                  data={[
                    {id: '0', status: 'All'},
                    {id: '1', status: 'In Transit'},
                    {id: '2', status: 'Out for Delivery'},
                    {id: '3', status: 'Delivered'},
                    {id: '4', status: 'Exception'},
                    {id: '5', status: 'Returned to Sender'},
                  ]}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => toggleSelect(item.name)}
                        style={[styles.courierFlatlistParent]}>
                        <View
                          style={[
                            styles.courierFlatlistChild,
                            {
                              backgroundColor: '#f2f2f2',
                            },
                          ]}></View>
                        <View>
                          <Text
                            style={{
                              color: '#404040',
                              fontFamily: 'Poppins-Regular',
                              fontSize: Width / 27,
                            }}
                            numberOfLines={2}>
                            {item.status}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default ShipmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: Height / 21,
    // backgroundColor: 'red',
    right: Width / 24,
  },
  searchBarViewChild1: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: Width / 1.1,
    elevation: 1,
    zIndex: 1,
  },
  searchID: {
    padding: 5,
    backgroundColor: '#fff',
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    flex: 1,
  },
  hideKeyBoardBtn: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0.7,
    width: Width / 13,
    height: Width / 13,
    borderRadius: Width / 13,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  searchBarViewChild2: {
    width: Width / 4,
    height: Width / 11,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    elevation: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  searchBtn: {
    // backgroundColor: 'lime',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnImg: {
    width: Width / 19,
    height: Width / 20,
    resizeMode: 'contain',
  },
  // RBSheet Styles including view and button
  bottomSheetCloseButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 0.7,
  },
  bottomSheetCloseButtonImage: {
    width: 18,
    height: 18,
  },
  LeftView: {
    flex: 0.4,
    backgroundColor: '#f2f2f2',
    elevation: 1,
    marginLeft: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 5,
  },
  RightView: {
    flex: 0.7,
    // backgroundColor: '#ff0066',
    backgroundColor: '#fff',
    elevation: 1,
    marginRight: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 5,
  },
  filterButton: {
    marginVertical: 10,
    elevation: 1,
    borderRadius: 20,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'aliceblue',
    marginHorizontal: 5,
  },
  courierSearchBar: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'aliceblue',
    color: '#404040',
  },
  courierFlatlistParent: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  courierFlatlistChild: {
    width: Width / 16,
    height: Width / 16,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
