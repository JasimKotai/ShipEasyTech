import React, {useRef, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from '../components/Header';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
const Height = Dimensions.get('window').height;

const CreateTicketRoute = () => {
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const category = [
    {id: 1, title: 'Pickup & Delivery'},
    {id: 2, title: 'Shipment NDR & RTO'},
    {id: 3, title: 'Shipment Dispute'},
    {id: 4, title: 'Finance'},
    {id: 5, title: 'KYC & Bank Verification'},
    {id: 6, title: 'International Shipping'},
    {id: 7, title: 'Technical Support'},
    {id: 8, title: 'Billing & Taxation'},
    {id: 9, title: 'Claims'},
    {id: 10, title: 'Others'},
  ];
  const subCategory = [
    {id: 1, title: 'Delay in Forward Delivery'},
    {id: 2, title: 'Delay in RTO'},
    {id: 3, title: 'Delay in Pickup'},
    {id: 4, title: 'Shipment Showing as Lost/Damaged in Tracking'},
  ];
  return (
    <View style={styles.CreateTicketParent}>
      {/* Category */}
      <View style={styles.CreateTicketChild}>
        <Text style={styles.categorytxt}>Category</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          selectedTextStyle={{
            fontSize: 14,
            color: GREEN_COLOR,
            fontFamily: 'Poppins-Regular',
          }}
          data={category}
          itemContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          itemTextStyle={{
            color: '#404040',
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
            padding: 0,
            margin: 0,
          }}
          maxHeight={200} //height
          showsVerticalScrollIndicator={false}
          labelField="title"
          valueField="title"
          placeholder="Select Category"
          value={selectCategory}
          onChange={item => setSelectCategory(item)}
        />
        {/* Category End*/}

        {/* Subcategory */}
        <View style={{marginTop: 10}}>
          <Text style={styles.categorytxt}>Subcategory</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            iconStyle={styles.iconStyle}
            selectedTextStyle={{
              fontSize: 14,
              color: GREEN_COLOR,
              fontFamily: 'Poppins-Regular',
            }}
            data={subCategory}
            itemContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
            itemTextStyle={{
              color: '#404040',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              padding: 0,
              margin: 0,
            }}
            maxHeight={150} //height
            showsVerticalScrollIndicator={false}
            labelField="title"
            valueField="title"
            placeholder="Select Category"
            value={selectSubCategory}
            onChange={item => setSelectSubCategory(item)}
          />
        </View>
        {/* Subcategory END*/}
      </View>
    </View>
  );
};

const OpenTicketRoute = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
          margin: 30,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e6fcff',
          borderRadius: 30,
          elevation: 5,
        }}>
        <Text>No Data Found</Text>
      </View>
    </View>
  );
};

const CloseTicketRoute = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
    <View
      style={{
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6fcff',
        borderRadius: 30,
        elevation: 5,
      }}>
      <Text>No Data Found</Text>
    </View>
  </View>
);

const renderScene = SceneMap({
  create: CreateTicketRoute,
  open: OpenTicketRoute,
  close: CloseTicketRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    labelStyle={styles.label}
    tabStyle={styles.tab}
    activeColor={GREEN_COLOR}
  />
);

const HelpAndSupport = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [sortFilter, setSortFilter] = useState('Most Recently Updated');

  const [sortShow, setSortShow] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [searchOpenTickets, setSearchOpenTickets] = useState('');
  const [searchCloseTickets, setSearchCloseTickets] = useState('');

  const refRBSheet = useRef();

  const [selectFilter, setSelectFilter] = useState('Status');

  const [categoryFilters, setCategoryFilters] = useState('');
  const [statusFilters, setStatusFilters] = useState('');

  const [routes] = React.useState([
    {key: 'create', title: 'Create Ticket'},
    {key: 'open', title: 'Open Tickets'},
    {key: 'close', title: 'Close Tickets'},
  ]);

  const [fromDate, setFromDate] = useState(new Date());
  const [fromSelectedDate, setFromSelectedDate] = useState('');

  const [toDate, setToDate] = useState(new Date());
  const [toSelectedDate, setToSelectedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFromDate(currentDate);
    if (event.type === 'set') {
      const options = {year: 'numeric', month: 'short', day: 'numeric'};
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      setFromSelectedDate(formattedDate);
    }
  };

  const handleFromDate = () => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: onChange,
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

  const handleToDate = () => {
    DateTimePickerAndroid.open({
      value: toDate,
      onChange: onChange2,
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Help & Support"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.Parent}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={index => {
            setIndex(index);
            setSortShow(index);
            setShowSearchBar(index);
          }}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      {/* top buttons for filter search and sort */}
      {index !== 0 ? (
        <View style={styles.topButtons}>
          <View style={{backgroundColor: 'red', flex: 1}} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: EXTRA_LIGHT_GREEN,
              borderRadius: 10,
              marginRight: 25,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (sortShow === true) {
                  setSortShow(!sortShow);
                } else if (sortShow === false) {
                  setSortShow(!sortShow);
                } else {
                  setSortShow(true);
                }
              }}
              style={{
                padding: 5,
                // backgroundColor: 'green',
                marginRight: 8,
              }}>
              <Image
                source={require('../assets/images/sort.png')}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (showSearchBar === true) {
                  setShowSearchBar(!showSearchBar);
                } else if (showSearchBar === false) {
                  setShowSearchBar(!showSearchBar);
                } else {
                  setShowSearchBar(true);
                }
              }}
              style={{padding: 3, paddingHorizontal: 5, marginRight: 8}}>
              <Image
                source={require('../assets/images/search.png')}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{padding: 3, paddingHorizontal: 5}}>
              <Image
                source={require('../assets/images/filter.png')}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {/* sort buttons for Most Recently Updated and  Most Recently Created */}
      {index !== 0 && sortShow === true ? (
        <View style={styles.MostRecentlyUpdatedBTNParent}>
          <TouchableOpacity
            onPress={() => setSortFilter('Most Recently Updated')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={styles.MostRecentlyUpdatedView}>
              <View
                style={{
                  backgroundColor:
                    sortFilter == 'Most Recently Updated'
                      ? GREEN_COLOR
                      : '#404040',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                }}
              />
            </View>
            <Text
              style={{fontFamily: 'RobotoCondensed-Medium', color: '#404040'}}>
              Most Recently Updated
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSortFilter('Most Recently Created')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={styles.MostRecentlyUpdatedView}>
              <View
                style={{
                  backgroundColor:
                    sortFilter == 'Most Recently Created'
                      ? GREEN_COLOR
                      : '#404040',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                }}
              />
            </View>
            <Text
              style={{fontFamily: 'RobotoCondensed-Medium', color: '#404040'}}>
              Most Recently Created
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* searchBar/TextInput */}
      {index !== 0 && showSearchBar === true ? (
        <View style={styles.searchBarforOpenTicketsView}>
          <TextInput
            placeholder="Search for Ticket ID"
            style={styles.searchBarforOpenTickets}
            value={index === 1 ? searchOpenTickets : searchCloseTickets}
            onChangeText={txt => {
              if (index === 1) {
                setSearchOpenTickets(txt);
              } else {
                setSearchCloseTickets(txt);
              }
            }}
          />
        </View>
      ) : null}
      {/* RB Sheet */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Height / 1.04}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
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
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              height: Height / 1.2,
              marginTop: 15,
            }}>
            {/* left Side filter parent */}
            <View
              style={{
                flex: 0.4,
                backgroundColor: '#f2f2f2',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectFilter('Category');
                }}
                style={styles.StatusButton}>
                <View
                  style={[
                    styles.StatusButtonBorderView,
                    {
                      backgroundColor:
                        selectFilter === 'Category' ? GREEN_COLOR : null,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.StatusButtonTxt,
                    {
                      color:
                        selectFilter === 'Category' ? GREEN_COLOR : '#404040',
                    },
                  ]}>
                  Category
                </Text>
              </TouchableOpacity>

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
              {/* category Filters start */}
              {selectFilter === 'Category' ? (
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', flex: 1}}>
                  <FlatList
                    data={[
                      {id: '1', status: 'Pickup & Delivery'},
                      {id: '2', status: 'Shipment NDR & RTO'},
                      {id: '3', status: 'Shipment Dispute'},
                      {id: '4', status: 'Finance'},
                      {id: '5', status: 'KYC & Bank Verification'},
                      {id: '6', status: 'International Shipping'},
                      {id: '7', status: 'Technical Support'},
                      {id: '8', status: 'Billing & Taxation'},
                      {id: '9', status: 'Claims'},
                      {id: '10', status: 'Others'},
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setCategoryFilters(item.status);
                          }}
                          style={styles.AllButton}>
                          <View style={[styles.radioViewParent]}>
                            <View
                              style={[
                                styles.radioViewChild,
                                {
                                  backgroundColor:
                                    categoryFilters === item.status
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
              {/* category Filters END */}

              {/* statusFilters start */}
              {selectFilter === 'Status' ? (
                <View style={{backgroundColor: '#fffbe6', flex: 1}}>
                  <FlatList
                    data={[
                      {id: '1', status: 'Open'},
                      {id: '2', status: 'Work In Progress'},
                      {id: '3', status: 'Operational Delay due to Covid-19'},
                      {id: '4', status: 'Partially Resolved'},
                      {id: '5', status: 'Awaiting Response'},
                      {id: '6', status: 'Closed'},
                      {id: '7', status: 'Resolved'},
                      {id: '8', status: 'Duplicate'},
                      {id: '9', status: 'Query Addressed'},
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

              {/* Date Filter */}
              {selectFilter === 'Date' ? (
                <View style={{backgroundColor: '#f3e9fc', flex: 1}}>
                  <TouchableOpacity
                    onPress={handleFromDate}
                    style={styles.FromDateButton}>
                    <View>
                      <Text style={styles.FromDateButtonText}>From Date</Text>
                      {fromSelectedDate && (
                        <Text style={{color: '#808080', fontSize: 11}}>
                          {fromSelectedDate}
                        </Text>
                      )}
                    </View>
                    <Image
                      source={require('../assets/images/calendar.png')}
                      style={{width: 25, height: 25}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleToDate}
                    style={styles.FromDateButton}>
                    <View>
                      <Text style={styles.FromDateButtonText}>To Date</Text>
                      {toSelectedDate && (
                        <Text style={{color: '#808080', fontSize: 11}}>
                          {toSelectedDate}
                        </Text>
                      )}
                    </View>

                    <Image
                      source={require('../assets/images/calendar.png')}
                      style={{width: 25, height: 25}}
                    />
                  </TouchableOpacity>
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
                setStatusFilters('');
                setCategoryFilters('');
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Parent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  topButtons: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GREEN,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '85%',
    height: Height / 19,
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
    top: Height / 23,
    alignItems: 'center',
  },
  MostRecentlyUpdatedView: {
    padding: 5,
    borderWidth: 3,
    borderColor: 'aliceblue',
    borderRadius: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MostRecentlyUpdatedBTNParent: {
    // backgroundColor: '#fff',
    backgroundColor: EXTRA_LIGHT_GREEN,
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 1,
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'flex-end',
    top: Height / 8,
    right: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  indicator: {
    backgroundColor: GREEN_COLOR,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  label: {
    fontFamily: 'Rubik-Medium',
    fontSize: 12.4,
    color: '#404040',
  },
  tab: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarforOpenTicketsView: {
    // backgroundColor: 'white',
    position: 'absolute',
    width: '80%',
    alignSelf: 'center',
    top: Height / 24,
    zIndex: 1,
    right: 20,
  },
  searchBarforOpenTickets: {
    padding: 0,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#fff',
    // backgroundColor: EXTRA_LIGHT_GREEN,
    elevation: 1,
  },
  // Rb Sheet Styles means All View Buttons Styles
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
  FromDateButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    elevation: 2,
  },
  FromDateButtonText: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },

  // CreateTicketRoute Styles start
  CreateTicketParent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  CreateTicketChild: {
    backgroundColor: '#fff',
    elevation: 1,
    display: 'flex',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  categorytxt: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
  },
  category1Button: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
  },
  category1ButtonTxt: {
    color: '#666666',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#404040',
  },
  iconStyle: {
    width: 30,
    resizeMode: 'contain',
    height: 30,
  },
  // CreateTicketRoute Styles END
});

export default HelpAndSupport;
