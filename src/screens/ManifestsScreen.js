import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';

const ManifestScreen = ({navigation}) => {
  const Height = Dimensions.get('window').height;

  const refRBSheet = useRef();

  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [selectSort, setSelectSort] = useState('Latest Escalation Date');
  const [selectFilter, setSelectFilter] = useState('Status');
  const [statusFilters, setStatusFilters] = useState('All');
  const [courierFilters, setCourierFilters] = useState('All');
  const [escalationFilters, setEscalationFilters] = useState('All');
  const [dateFilters, setDateFilters] = useState('All');

  const onSubmitted = () => {
    if (search.length > 0) {
      setShowInput(!showInput);
      // call api
      console.log('Submitted -- functiion call from keyboard');
    } else {
      setShowInput(!showInput);
      console.log('empty search box');
    }
  };
  const handleBottomSheet = () => {
    refRBSheet.current.open();
  };
  const courierData = [
    {id: '0', name: 'All'},
    {id: '1', name: 'Blue Dart'},
    {id: '2', name: 'DTDC'},
    {id: '3', name: 'Delhivery'},
    {id: '4', name: 'Ekart Logistics'},
    {id: '5', name: 'Amazon Shipping'},
    {id: '6', name: 'FedEx'},
    {id: '7', name: 'Gati'},
    {id: '8', name: 'XpressBees'},
    {id: '9', name: 'India Post'},
    {id: '10', name: 'DTDC Surface'},
    {id: '11', name: 'Professional Courier'},
    {id: '12', name: 'ShadowFax'},
    {id: '13', name: 'Aramex'},
    {id: '14', name: 'VRL Logistics'},
    {id: '15', name: 'Bluedart Surface'},
    {id: '16', name: 'DTDC Express'},
    {id: '17', name: 'Ecom Express'},
    {id: '18', name: 'Delhivery Surface'},
    {id: '19', name: 'Safe Express'},
    {id: '20', name: 'Wow Express'},
    // Add more as needed
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Manifests"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* Modal  */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.ModalParent}>
          <View style={styles.ModalChild}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{alignSelf: 'flex-end', padding: 7, zIndex: 1}}>
              <Image
                source={require('../assets/images/close1.png')}
                style={{width: 16, height: 16}}
              />
            </Pressable>
            <Text style={styles.ModalTxt}>Sort</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectSort('Latest Escalation Date');
                setModalVisible(!modalVisible);
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 20,
              }}>
              <View
                style={[
                  styles.ModalButton1,
                  {
                    backgroundColor:
                      selectSort === 'Latest Escalation Date'
                        ? GREEN_COLOR
                        : '#f2f2f2',
                  },
                ]}>
                {selectSort === 'Latest Escalation Date' ? (
                  <Image
                    source={require('../assets/images/check-mark.png')}
                    style={{width: 15, height: 15}}
                  />
                ) : null}
              </View>
              <Text style={styles.ModalButton1Txt}>Latest Escalation Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectSort('Earliest Escalation Date');
                setModalVisible(!modalVisible);
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 20,
              }}>
              <View
                style={[
                  styles.ModalButton1,
                  {
                    backgroundColor:
                      selectSort === 'Earliest Escalation Date'
                        ? GREEN_COLOR
                        : '#f2f2f2',
                  },
                ]}>
                {selectSort === 'Earliest Escalation Date' ? (
                  <Image
                    source={require('../assets/images/check-mark.png')}
                    style={{width: 15, height: 15}}
                  />
                ) : null}
              </View>
              <Text style={styles.ModalButton1Txt}>
                Earliest Escalation Date
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal  END*/}
      {/* RB Sheet */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Height / 1.1}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Text style={styles.FilterTitle}>Filters</Text>
          <Pressable
            onPress={() => {
              refRBSheet.current.close();
            }}
            style={{
              position: 'absolute',
              top: 5,
              right: 18,
              padding: 6,
              zIndex: 1,
            }}>
            <Image
              source={require('../assets/images/close1.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {/* left Side filter parent */}
            <View
              style={{
                flex: 0.4,
                height: Height / 1.3,
                backgroundColor: '#f2f2f2',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectFilter('Status');
                }}
                style={styles.StatusButton}>
                <View
                  style={[
                    styles.StatusButtonBorderView,
                    {
                      backgroundColor:
                        selectFilter === 'Status' ? GREEN_COLOR : null,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.StatusButtonTxt,
                    {
                      color:
                        selectFilter === 'Status' ? GREEN_COLOR : '#404040',
                    },
                  ]}>
                  Status
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectFilter('Courier');
                }}
                style={styles.StatusButton}>
                <View
                  style={[
                    styles.StatusButtonBorderView,
                    {
                      backgroundColor:
                        selectFilter === 'Courier' ? GREEN_COLOR : null,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.StatusButtonTxt,
                    {
                      color:
                        selectFilter === 'Courier' ? GREEN_COLOR : '#404040',
                    },
                  ]}>
                  Courier
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectFilter('Escalations');
                }}
                style={styles.StatusButton}>
                <View
                  style={[
                    styles.StatusButtonBorderView,
                    {
                      backgroundColor:
                        selectFilter === 'Escalations' ? GREEN_COLOR : null,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.StatusButtonTxt,
                    {
                      color:
                        selectFilter === 'Escalations'
                          ? GREEN_COLOR
                          : '#404040',
                    },
                  ]}>
                  Escalation
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectFilter('Date');
                }}
                style={styles.StatusButton}>
                <View
                  style={[
                    styles.StatusButtonBorderView,
                    {
                      backgroundColor:
                        selectFilter === 'Date' ? GREEN_COLOR : null,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.StatusButtonTxt,
                    {
                      color: selectFilter === 'Date' ? GREEN_COLOR : '#404040',
                    },
                  ]}>
                  Date
                </Text>
              </TouchableOpacity>
            </View>
            {/* left Side filter parent END*/}
            {/* Right Side filter Child */}
            <View style={{flex: 0.7, backgroundColor: EXTRA_LIGHT_GREEN}}>
              {/* statusFilters start */}
              {selectFilter === 'Status' ? (
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', flex: 1}}>
                  <FlatList
                    data={[
                      {id: '1', status: 'All'},
                      {id: '2', status: 'Today'},
                      {id: '3', status: 'Pickup Scheduled'},
                      {id: '4', status: 'Pickup Error'},
                      {id: '5', status: 'Pickup Queued'},
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setStatusFilters(item.status);
                          }}
                          style={styles.AllButton}>
                          <View style={[styles.radioViewParent]}>
                            <View
                              style={[
                                styles.radioViewChild,
                                {
                                  backgroundColor:
                                    statusFilters === item.status
                                      ? GREEN_COLOR
                                      : '#404040',
                                },
                              ]}
                            />
                          </View>
                          <Text style={styles.AllButtonTxt}>{item.status}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : null}
              {/* statusFilters END */}
              {/* Courier Filters Start */}
              {selectFilter === 'Courier' ? (
                <View style={{backgroundColor: '#fffbe6', flex: 1}}>
                  <FlatList
                    data={courierData}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <View style={{padding: 10}}>
                          <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => setCourierFilters(item.name)}
                            style={{flexDirection: 'row'}}>
                            <View style={[styles.radioViewParent]}>
                              <View
                                style={[
                                  styles.radioViewChild,
                                  {
                                    backgroundColor:
                                      item.name == courierFilters
                                        ? GREEN_COLOR
                                        : '#404040',
                                  },
                                ]}
                              />
                            </View>

                            <Text
                              style={{
                                color: '#404040',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}
              {/* Courier Filters END */}
              {/* Escalations Filters */}
              {selectFilter === 'Escalations' ? (
                <View style={{backgroundColor: '#ffe6ea', flex: 1}}>
                  <FlatList
                    data={[
                      {id: '1', status: 'All'},
                      {id: '2', status: 'Pending'},
                      {id: '3', status: 'In-progress'},
                      {id: '4', status: 'Resolved'},
                      {id: '5', status: 'Closed'},
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setEscalationFilters(item.status);
                          }}
                          style={styles.AllButton}>
                          <View style={[styles.radioViewParent]}>
                            <View
                              style={[
                                styles.radioViewChild,
                                {
                                  backgroundColor:
                                    escalationFilters == item.status
                                      ? GREEN_COLOR
                                      : '#404040',
                                },
                              ]}
                            />
                          </View>
                          <Text style={styles.AllButtonTxt}>{item.status}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : null}
              {/* Escalations Filters END*/}
              {/* Date Filter */}
              {selectFilter === 'Date' ? (
                <View style={{backgroundColor: '#f3e9fc', flex: 1}}>
                  <FlatList
                    data={[
                      {id: '1', timeFrame: 'All'},
                      {id: '2', timeFrame: 'Today'},
                      {id: '3', timeFrame: 'Yesterday'},
                      {id: '4', timeFrame: 'Last 7 Day'},
                      {id: '5', timeFrame: 'Last 30 Days'},
                      {id: '6', timeFrame: 'This Month'},
                      {id: '7', timeFrame: 'Last Month'},
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setDateFilters(item.timeFrame);
                          }}
                          style={styles.AllButton}>
                          <View style={[styles.radioViewParent]}>
                            <View
                              style={[
                                styles.radioViewChild,
                                {
                                  backgroundColor:
                                    dateFilters == item.timeFrame
                                      ? GREEN_COLOR
                                      : '#404040',
                                },
                              ]}
                            />
                          </View>
                          <Text style={styles.AllButtonTxt}>
                            {item.timeFrame}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : null}
              {/* Date Filter END*/}
            </View>
            {/* Right Side filter Child END */}
          </View>
          {/* bottom buttons */}
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                setStatusFilters('All');
                setCourierFilters('All');
                setEscalationFilters('All');
                setDateFilters('All');
              }}
              style={[styles.SortButton, {borderRightWidth: 1}]}>
              <Text style={[styles.SortButtonTxt, {color: '#404040'}]}>
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.SortButton]}>
              <Text style={styles.SortButtonTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
          {/* bottom buttons END*/}
        </View>
      </RBSheet>
      {/* RBSheet END */}
      {/* search input */}
      <View style={styles.SearchInputParent}>
        {showInput && (
          <TextInput
            placeholder="Search Manifest ID"
            style={styles.SearchInput}
            placeholderTextColor={'#808080'}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              onSubmitted();
            }}
            autoFocus={showInput}
          />
        )}
        {!showInput && (
          <TouchableOpacity
            onPress={() => {
              setShowInput(!showInput);
              // textInputRef.current.focus();
            }}
            style={styles.SearchButton}>
            <Image
              source={require('../assets/images/search.png')}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* search input END*/}
      <View style={styles.Parent}>
        <View style={styles.child1}>
          <Image
            source={require('../assets/images/shipment.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={{color: '#404040', fontFamily: 'Montserrat-SemiBold'}}>
            No Results Found
          </Text>
        </View>
      </View>
      <View style={styles.Parent2}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={[styles.SortButton, {borderRightWidth: 1}]}>
          <Image
            source={require('../assets/images/sort.png')}
            style={{width: 18, height: 18}}
            tintColor={GREEN_COLOR}
          />
          <Text style={styles.SortButtonTxt}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleBottomSheet}
          style={styles.SortButton}>
          <Image
            source={require('../assets/images/filter.png')}
            style={{width: 18, height: 18}}
            tintColor={GREEN_COLOR}
          />
          <Text style={styles.SortButtonTxt}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ModalParent: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalChild: {
    backgroundColor: 'aliceblue',
    width: Width / 1.2,
    height: Height / 3.7,
    borderRadius: 10,
    elevation: 1,
    padding: 10,
  },
  ModalTxt: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: -25,
  },
  ModalButton1: {
    backgroundColor: GREEN_COLOR,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 1,
    borderRadius: 2,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalButton1Txt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  FilterTitle: {
    color: '#404040',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    fontSize: 18,
  },
  StatusButton: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  StatusButtonTxt: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
  },
  StatusButtonBorderView: {
    backgroundColor: '#f2f2f2',
    width: 4,
    height: 35,
    borderRadius: 10,
    marginLeft: 1,
    marginRight: 10,
  },
  AllButton: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  AllButtonTxt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
  },
  radioViewParent: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    padding: 3,
    width: 20,
    height: 20,
    marginRight: 10,
  },
  radioViewChild: {
    flex: 1,
    backgroundColor: '#404040',
    borderRadius: 10,
  },
  // here start main style means before this line style was for RB Sheet view & Modals
  SearchInputParent: {
    position: 'absolute',
    top: Height / 19,
    zIndex: 1,
    flexDirection: 'row',
    width: Width / 1.15,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  SearchInput: {
    padding: 3,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: EXTRA_LIGHT_GREEN,
    flex: 1,
    paddingHorizontal: 10,
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 12,
    marginRight: 30,
    marginHorizontal: 10,
  },
  SearchButton: {
    backgroundColor: 'aliceblue',
    width: Width / 5.5,
    height: Height / 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  Parent: {
    flex: 12,
    backgroundColor: '#FFF',
  },
  child1: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    elevation: 5,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Parent2: {
    flex: 1,
    backgroundColor: EXTRA_LIGHT_GREEN,
    flexDirection: 'row',
  },
  SortButton: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  SortButtonTxt: {
    color: GREEN_COLOR,
    fontFamily: 'Onest-SemiBold',
    marginLeft: 5,
  },
});

export default ManifestScreen;
