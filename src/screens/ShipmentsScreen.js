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
import React, {useCallback, useEffect, useRef, useState} from 'react';

import Header from '../components/Header';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GREEN_COLOR} from '../assets/Colors';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
// console.log(Width / 13);

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

  // courier screens filter
  const [courierSelectedItems, setCourierSelectedItems] = useState([]);
  const [courierSearch, setCourierSearch] = useState([]);

  const [tempsearch, settempsearch] = useState('');
  // console.log(courierSearch.length);
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

  const toggleSelect = itemName => {
    setCourierSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(itemName)
        ? prevSelectedItems.filter(item => item !== itemName)
        : [...prevSelectedItems, itemName],
    );
  };

  const handleCourierCompanySearch = text => {
    const filteredData = initialData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setCourierSearch(filteredData);
  };

  // status screen filters
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusList = [
    {id: '0', status: 'All'},
    {id: '1', status: 'In Transit'},
    {id: '2', status: 'Out for Delivery'},
    {id: '3', status: 'Delivered'},
    {id: '4', status: 'Exception'},
    {id: '5', status: 'Returned to Sender'},
  ];

  const StatusSelect = item => {
    if (item.status === 'All') {
      setSelectedStatus(prevSelectedStatus =>
        prevSelectedStatus.length === statusList.length - 1
          ? []
          : statusList.filter(statusItem => statusItem.status !== 'All'),
      );
    } else {
      setSelectedStatus(prevSelectedStatus => {
        const isItemSelected = prevSelectedStatus.some(
          selected => selected.status === item.status,
        );

        if (isItemSelected) {
          // Item is already selected, so remove it
          return prevSelectedStatus.filter(
            selected => selected.status !== item.status,
          );
        } else {
          // Item is not selected, so add it
          return [...prevSelectedStatus, item];
        }
      });
    }
  };

  // payment screen filters
  const [selectedPayment, setSelectedPayment] = useState([]);

  const paymentList = [
    {id: '0', status: 'All'},
    {id: '1', status: 'Cash on Delivery'},
    {id: '2', status: 'Prepaid'},
  ];

  const paymentSelect = item => {
    if (item.status === 'All') {
      setSelectedPayment(prevSelectedStatus =>
        prevSelectedStatus.length === paymentList.length - 1
          ? []
          : paymentList.filter(statusItem => statusItem.status !== 'All'),
      );
    } else {
      setSelectedPayment(prevSelectedStatus => {
        const isItemSelected = prevSelectedStatus.some(
          selected => selected.status === item.status,
        );

        if (isItemSelected) {
          // Item is already selected, so remove it
          return prevSelectedStatus.filter(
            selected => selected.status !== item.status,
          );
        } else {
          // Item is not selected, so add it
          return [...prevSelectedStatus, item];
        }
      });
    }
  };

  // Order Tags
  const [sarchOrderTags, setSarchOrderTags] = useState('');

  // date screen filters
  const dateList = [
    {id: '0', label: 'All'},
    {id: '1', label: 'Today'},
    {id: '2', label: 'Yesterday'},
    {id: '3', label: 'Last 7 Days'},
    {id: '4', label: 'Last 30 Days'},
    {id: '5', label: 'This Month'},
    {id: '6', label: 'Custom'},
  ];
  const [selectedDateFilter, setSelectedDateFilter] = useState([]);

  const handeDateFilter = item => {
    if (item.label === 'All') {
      setSelectedDateFilter(prevSelectedDate =>
        prevSelectedDate.length === dateList.length - 1
          ? []
          : dateList.filter(dateItem => dateItem.label !== 'All'),
      );
    } else {
      setSelectedDateFilter(prevSelectedDate => {
        const isItemSelected = prevSelectedDate.some(
          selected => selected.label === item.label,
        );

        if (isItemSelected) {
          // Item is already selected, so remove it
          return prevSelectedDate.filter(
            selected => selected.label !== item.label,
          );
        } else {
          // Item is not selected, so add it
          return [...prevSelectedDate, item];
        }
      });
    }
  };
  const isCustom = selectedDateFilter.some(txt => txt.label === 'Custom');
  // console.log(isCustom);
  // Date buttons
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromSelectedDate, setFromSelectedDate] = useState('');
  const [toSelectedDate, setToSelectedDate] = useState('');

  const handleFromDate = () => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: onChange,
      mode: 'date',
      is24Hour: true,
    });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFromDate(currentDate);
    if (event.type === 'set') {
      const options = {year: 'numeric', month: 'short', day: 'numeric'};
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      setFromSelectedDate(formattedDate);
    }
  };

  const handleToDate = () => {
    DateTimePickerAndroid.open({
      value: toDate,
      onChange: onChange2,
      mode: 'date',
      is24Hour: true,
    });
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setToDate(currentDate);
    if (event.type === 'set') {
      const options = {year: 'numeric', month: 'short', day: 'numeric'};
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      setToSelectedDate(formattedDate);
    }
  };

  // channel screens
  const [selecteChannel, setSelecteChannel] = useState([]);

  const channelList = [
    {id: '1', label: 'All'},
    {id: '2', label: 'Custom'},
    // {id: '3', label: 'Check'},
  ];

  const ChannelSelect = item => {
    setSelecteChannel(prevSelectedLabels => {
      if (item.label === 'All') {
        return prevSelectedLabels.length === channelList.length - 1
          ? []
          : channelList.filter(labelItem => labelItem.label !== 'All');
      } else {
        const isLabelSelected = prevSelectedLabels.some(
          selected => selected.label === item.label,
        );

        if (isLabelSelected) {
          // Label is already selected, so remove it
          return prevSelectedLabels.filter(
            selected => selected.label !== item.label,
          );
        } else {
          // Label is not selected, so add it
          return [...prevSelectedLabels, item];
        }
      }
    });
  };
  // Secured Shipments
  const [securedShipments, setSecuredShipments] = useState(null);

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
          <TouchableOpacity>
            <Text>Add Your First Shipment</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* RBSheet */}
      <RBSheet
        ref={refRBSheet}
        onClose={() => {
          // console.log('close...');
        }}
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
            // backgroundColor: 'red',
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#404040',
              textAlignVertical: 'bottom',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
            }}>
            Filters
          </Text>
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
                  // keyboardType="default"
                  // returnKeyType="search"
                  clearButtonMode="while-editing"
                  // onSubmitEditing={() => console.log('hello')}
                  // value={tempsearch}
                  onChangeText={txt => {
                    // settempsearch(txt);
                    handleCourierCompanySearch(txt);
                  }}
                  // onBlur={() => {
                  //   Keyboard.isVisible(true);
                  // }}
                />
                {/* flatlist courier company name */}
                <FlatList
                  data={courierSearch.length > 0 ? courierSearch : initialData}
                  renderItem={({item}) => {
                    const isSelected = courierSelectedItems.includes(item.name);

                    return (
                      <TouchableOpacity
                        onPress={() => {
                          toggleSelect(item.name);
                          // settempsearch('');
                        }}
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
                  data={statusList}
                  renderItem={({item}) => {
                    const isSelected =
                      item.status === 'All'
                        ? selectedStatus.length === statusList.length - 1
                        : selectedStatus.some(
                            selected => selected.status === item.status,
                          );

                    return (
                      <TouchableOpacity
                        onPress={() => StatusSelect(item)}
                        style={[
                          styles.courierFlatlistParent,
                          {backgroundColor: isSelected ? '#f2f2f2' : '#ffffff'},
                        ]}>
                        <View
                          style={[
                            styles.courierFlatlistChild,
                            {backgroundColor: isSelected ? '#fff' : '#f2f2f2'},
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
                            {item.status}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}

            {/* payment screen */}
            {selectedFilter === 'Payment' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <FlatList
                  data={[
                    {id: '0', status: 'All'},
                    {id: '1', status: 'Cash on Delivery'},
                    {id: '2', status: 'Prepaid'},
                  ]}
                  renderItem={({item}) => {
                    const isSelected =
                      item.status === 'All'
                        ? selectedPayment.length === paymentList.length - 1
                        : selectedPayment.some(
                            selected => selected.status === item.status,
                          );

                    return (
                      <TouchableOpacity
                        onPress={() => paymentSelect(item)}
                        style={[
                          styles.courierFlatlistParent,
                          {backgroundColor: isSelected ? '#f2f2f2' : '#ffffff'},
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
                            {item.status}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}

            {/* Order Tags screen */}
            {selectedFilter === 'Order Tags' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={'#666'}
                  style={styles.courierSearchBar}
                  value={sarchOrderTags}
                  onChangeText={setSarchOrderTags}
                />
                <FlatList
                  data={[]}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => paymentSelect(item)}
                        style={[styles.courierFlatlistParent]}>
                        <View style={[styles.courierFlatlistChild, {}]}></View>
                        <View>
                          <Text
                            style={{
                              color: '#404040',
                              fontFamily: 'Poppins-Regular',
                              fontSize: Width / 27,
                            }}
                            numberOfLines={2}>
                            {/* {item.status} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}

            {/* Date screen */}
            {selectedFilter === 'Date' && (
              <View style={{backgroundColor: 'transparent'}}>
                <FlatList
                  data={dateList}
                  renderItem={({item}) => {
                    const isSelected =
                      item.label === 'All'
                        ? selectedDateFilter.length === dateList.length - 1
                        : selectedDateFilter.some(
                            selected => selected.label === item.label,
                          );

                    return (
                      <TouchableOpacity
                        onPress={() => handeDateFilter(item)}
                        style={[
                          styles.courierFlatlistParent,
                          {backgroundColor: isSelected ? '#f2f2f2' : '#ffffff'},
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
                            {item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
                {isCustom === true && (
                  <View
                    style={{
                      backgroundColor: '#f2f2f2',
                      marginVertical: 15,
                      paddingHorizontal: 10,
                    }}>
                    <TouchableOpacity
                      onPress={handleFromDate}
                      style={styles.FormDateButton}>
                      <View style={{flex: 0.7, alignItems: 'center'}}>
                        <Text
                          style={{
                            color: '#404040',
                            fontFamily: 'Onest-Regular',
                            fontSize: 13,
                          }}>
                          From Date
                        </Text>
                        {fromSelectedDate && (
                          <Text style={{color: '#808080', fontSize: 11}}>
                            {fromSelectedDate}
                          </Text>
                        )}
                      </View>
                      <View style={{flex: 0.3}}>
                        <Image
                          source={require('../assets/images/calendar.png')}
                          style={{width: Width / 19, height: Width / 19}}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleToDate}
                      style={styles.FormDateButton}>
                      <View style={{flex: 0.7, alignItems: 'center'}}>
                        <Text
                          style={{
                            color: '#404040',
                            fontFamily: 'Onest-Regular',
                            fontSize: 13,
                          }}>
                          To Date
                        </Text>
                        {toSelectedDate && (
                          <Text style={{color: '#808080', fontSize: 11}}>
                            {toSelectedDate}
                          </Text>
                        )}
                      </View>
                      <View style={{flex: 0.3}}>
                        <Image
                          source={require('../assets/images/calendar.png')}
                          style={{width: Width / 19, height: Width / 19}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* Channel screen */}
            {selectedFilter === 'Channel' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={'#666'}
                  style={styles.courierSearchBar}
                />
                <FlatList
                  data={channelList}
                  renderItem={({item}) => {
                    const isSelected =
                      item.label === 'All'
                        ? selecteChannel.length === channelList.length - 1
                        : selecteChannel.some(
                            selected => selected.label === item.label,
                          );

                    return (
                      <TouchableOpacity
                        onPress={() => ChannelSelect(item)}
                        style={[
                          styles.courierFlatlistParent,
                          {
                            backgroundColor: isSelected ? '#f2f2f2' : '#fff',
                          },
                        ]}>
                        <View
                          style={[
                            styles.courierFlatlistChild,
                            {backgroundColor: isSelected ? '#fff' : '#f2f2f2'},
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
                            {item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}

            {/* Secured shipments screen */}
            {selectedFilter === 'Secured Shipments' && (
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <TouchableOpacity
                  onPress={() => {
                    setSecuredShipments('Yes');
                  }}
                  style={[
                    styles.courierFlatlistParent,
                    {
                      paddingLeft: 20,
                      backgroundColor:
                        securedShipments === 'Yes' ? '#f2f2f2' : '#fff',
                    },
                  ]}>
                  <View
                    style={[
                      styles.courierFlatlistChild,
                      {
                        backgroundColor:
                          securedShipments === 'Yes' ? '#fff' : '#f2f2f2',
                      },
                    ]}>
                    {securedShipments === 'Yes' && (
                      <Image
                        source={require('../assets/images/check-mark.png')}
                        style={{width: Width / 22, height: Width / 22}}
                        tintColor={GREEN_COLOR}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Poppins-Regular',
                      fontSize: Width / 27,
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSecuredShipments('No');
                  }}
                  style={[
                    styles.courierFlatlistParent,
                    {
                      paddingLeft: 20,
                      backgroundColor:
                        securedShipments === 'No' ? '#f2f2f2' : '#fff',
                    },
                  ]}>
                  <View
                    style={[
                      styles.courierFlatlistChild,
                      {
                        backgroundColor:
                          securedShipments === 'No' ? '#fff' : '#f2f2f2',
                      },
                    ]}>
                    {securedShipments === 'No' && (
                      <Image
                        source={require('../assets/images/check-mark.png')}
                        style={{width: Width / 22, height: Width / 22}}
                        tintColor={GREEN_COLOR}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: '#404040',
                      fontFamily: 'Poppins-Regular',
                      fontSize: Width / 27,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bottomButtonsView}>
          <TouchableOpacity
            onPress={() => {
              console.log('hello world');
              setSelectedFilter('Courier');
              setCourierSelectedItems([]);
              setSelectedStatus([]);
              setSelectedPayment([]);
              setSarchOrderTags('');
              setSelectedDateFilter([]);
              setFromSelectedDate('');
              setToSelectedDate('');
              setSelecteChannel([]);
              setSecuredShipments(null);
            }}
            style={styles.clearAllButton}>
            <Text style={styles.clearAllButtonTxt}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.clearAllButton, {marginLeft: 2, marginRight: 0}]}>
            <Text style={styles.ApplyButtonTxt}>Apply</Text>
          </TouchableOpacity>
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
    borderRadius: 15,
    // elevation: 1,
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 0.7,
    alignSelf: 'center',
  },
  bottomSheetCloseButtonImage: {
    width: 18,
    height: 18,
  },
  LeftView: {
    flex: 0.4,
    backgroundColor: '#f1f1f1',
    elevation: 1,
    marginLeft: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: 2,
  },
  RightView: {
    flex: 0.7,
    // backgroundColor: '#ff0066',
    backgroundColor: '#fff',
    elevation: 1,
    marginRight: 3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 2,
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
  FormDateButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginHorizontal: 19,
    height: Height / 15,
  },
  // bottom view style - clear all button apply button
  bottomButtonsView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 5,
    elevation: 5,
    padding: 2,
  },
  clearAllButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderRadius: 2,
    elevation: 0.5,
    marginRight: 2,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  clearAllButtonTxt: {
    // color: '#35d0ba',
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  ApplyButtonTxt: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-Regular',
  },
});
