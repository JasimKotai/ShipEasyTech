import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import CircleProgressBar from './CircleProgressBar';
import PieChart from 'react-native-pie-chart';

const DashboardNDR = () => {
  const [dropdown, setDropDown] = useState(false);
  const [dropdown2, setDropDown2] = useState(false);
  const [dropdownNames, setDropDownNames] = useState('Today');
  const [dropdownNames2, setDropDownNames2] = useState('Last 30 days');
  const [switchToCount, setSwitchToCount] = useState('Percent');
  const [switchToCount2, setSwitchToCount2] = useState('Percent');
  const apiData = [];
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.CODParent}>
          {/* child 1 start */}
          <View style={styles.child1}>
            <View style={{flex: 0.7}}>
              <Text style={styles.codtitle}>NDR</Text>
            </View>
            <View
              style={{
                flex: 0.4,
              }}>
              <Pressable
                onPress={() => {
                  setDropDown(!dropdown);
                }}
                style={styles.TodayButton}>
                <Text style={styles.Today}>{dropdownNames}</Text>
                <Image
                  source={
                    dropdown
                      ? require('../assets/images/up-arrow.png')
                      : require('../assets/images/down-arrow.png')
                  }
                  style={{width: 15, height: 15}}
                  tintColor={'#fff'}
                />
              </Pressable>
            </View>
          </View>
          {/* child 1 end */}

          {/* drop down view start */}
          {dropdown && (
            <View
              style={{
                right: 5,
                position: 'absolute',
                zIndex: 1,
                alignSelf: 'flex-end',
                top: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Today');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Yesterday');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Last 30 Days');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Last 30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Custom');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Custom</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* drop down view end */}
          {/* screen switch buttons Percent to Count */}
          <View style={styles.PercentAndCountViewButtons}>
            <Pressable
              onPress={() => {
                setSwitchToCount('Percent');
              }}
              style={[
                styles.switchButton,
                {
                  backgroundColor:
                    switchToCount === 'Percent' ? '#99ffbe' : EXTRA_LIGHT_GREEN,
                },
              ]}>
              <Text style={styles.switchButtonTxt}>Percent</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSwitchToCount('Count');
              }}
              style={[
                styles.switchButton,
                {
                  backgroundColor:
                    switchToCount === 'Count' ? '#99ffbe' : EXTRA_LIGHT_GREEN,
                },
              ]}>
              <Text style={styles.switchButtonTxt}>Count</Text>
            </Pressable>
          </View>
          {/* switch screen buttons Percent Screen to Count Screen */}
          {/* Percent Screen  */}
          {switchToCount === 'Percent' ? (
            <>
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <CircleProgressBar percentage={10} />
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>NDR Percentage</Text>
                  <Text style={styles.description}>
                    % of total NDR raised/total non-cancelled shipments
                  </Text>
                </View>
              </View>
              {/* RTO Percentage */}
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <CircleProgressBar percentage={10} />
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>RTO Percentage</Text>
                  <Text style={styles.description}>
                    % of shipments in RTO/total non-cancelled shipments
                  </Text>
                </View>
              </View>
              {/* NDR Delivered Shipsments */}
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <CircleProgressBar percentage={10} />
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>NDR Delivered Shipsments</Text>
                  <Text style={styles.description}>
                    % of shipments delivered after being in NDR
                  </Text>
                </View>
              </View>
              {/* Percent Screen END */}
            </>
          ) : (
            <>
              {/* Count Screen */}
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <View style={styles.NumberView}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.NumberTxt,
                        {color: GREEN_COLOR, fontSize: 14},
                      ]}>
                      0
                    </Text>
                    <Text style={styles.NumberTxt}>Out of 0</Text>
                  </View>
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>NDR Percentage</Text>
                  <Text style={styles.description}>
                    Number of total NDR raised/total non-cancelled shipments
                  </Text>
                </View>
              </View>
              {/* pickup within 24-48 hours */}
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <View style={styles.NumberView}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.NumberTxt,
                        {color: GREEN_COLOR, fontSize: 14},
                      ]}>
                      0
                    </Text>
                    <Text style={styles.NumberTxt}>Out of 0</Text>
                  </View>
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>RTO Percentage</Text>
                  <Text style={styles.description}>
                    Number of shipments in RTO/total non-cancelled shipments
                  </Text>
                </View>
              </View>
              {/* pickup greater than 48 hours */}
              <View style={styles.PercenctScreenParentView1}>
                <View style={{backgroundColor: 'transparent', flex: 0.3}}>
                  <View style={styles.NumberView}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.NumberTxt,
                        {color: GREEN_COLOR, fontSize: 14},
                      ]}>
                      0
                    </Text>
                    <Text style={styles.NumberTxt}>Out of 0</Text>
                  </View>
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={styles.title}>NDR Delivered Shipsments</Text>
                  <Text style={styles.description}>
                    Number of shipments delivered after being in NDR
                  </Text>
                </View>
              </View>
              {/* Count Screen END */}
            </>
          )}
        </View>
        {/* NDR Funnel start ---------------------------------------- */}
        <View style={styles.CODParent}>
          {/* child 1 */}
          <View style={[styles.child1, {backgroundColor: '#e6fcff'}]}>
            <View style={{flex: 0.7}}>
              <Text style={styles.codtitle}>NDR Funnel</Text>
            </View>
            <View
              style={{
                flex: 0.4,
              }}>
              {/* today button in delivery performance */}
              <Pressable
                onPress={() => {
                  setDropDown2(!dropdown2);
                }}
                style={[styles.TodayButton, {backgroundColor: '#00444d'}]}>
                <Text style={styles.Today}>{dropdownNames2}</Text>
                <Image
                  source={
                    dropdown2
                      ? require('../assets/images/up-arrow.png')
                      : require('../assets/images/down-arrow.png')
                  }
                  style={{width: 15, height: 15}}
                  tintColor={'#fff'}
                />
              </Pressable>
            </View>
          </View>
          {/* child 1 END */}
          {/* dropdownNames2  */}
          {dropdown2 && (
            <View
              style={{
                right: 5,
                position: 'absolute',
                zIndex: 1,
                alignSelf: 'flex-end',
                top: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames2('Today');
                  setDropDown2(!dropdown2);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames2('Yesterday');
                  setDropDown2(!dropdown2);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames2('Last 30 Days');
                  setDropDown2(!dropdown2);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Last 30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames2('Custom');
                  setDropDown2(!dropdown2);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Custom</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* dropdownNames2  END*/}
          {/* screen switch buttons Percent to Count */}
          <View style={styles.PercentAndCountViewButtons}>
            <Pressable
              onPress={() => {
                setSwitchToCount2('Percent');
              }}
              style={[
                styles.switchButton,
                {
                  backgroundColor:
                    switchToCount2 === 'Percent'
                      ? '#99ffbe'
                      : EXTRA_LIGHT_GREEN,
                },
              ]}>
              <Text style={styles.switchButtonTxt}>Percent</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSwitchToCount2('Count');
              }}
              style={[
                styles.switchButton,
                {
                  backgroundColor:
                    switchToCount2 === 'Count' ? '#99ffbe' : EXTRA_LIGHT_GREEN,
                },
              ]}>
              <Text style={styles.switchButtonTxt}>Count</Text>
            </Pressable>
          </View>
          {/* switch screen buttons Percent Screen to Count Screen */}
          {switchToCount2 === 'Percent' ? (
            <>
              {/* Shipments in NDR 1st Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 1st Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/*    Shipments in NDR 2nd Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 2nd Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/*  Shipments in NDR 3rd Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 3rd Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Count Screen Shipments in NDR 1st Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 1st Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Count Screen  Shipments in NDR 2nd Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 2nd Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Count Screen Shipments in NDR 3rd Attempt : 0 */}
              <View
                style={[
                  styles.PercenctScreenParentView1,
                  {flexDirection: 'column'},
                ]}>
                <Text style={styles.title}>
                  Shipments in NDR 3rd Attempt : 0
                </Text>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <View style={styles.LeftView}>
                    {apiData.length !== 0 ? (
                      <PieChart
                        widthAndHeight={80}
                        series={[1, 1, 1]}
                        sliceColor={['#EC6B56', '#47B39C', '#FFC154']}
                        coverFill={'#FFF'}
                      />
                    ) : (
                      <View style={styles.NotAvailable}>
                        <Text style={styles.NA}>NA</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.RightView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color1} />
                      <Text style={styles.PendingShipments}>
                        Pending Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color2} />
                      <Text style={styles.PendingShipments}>
                        Delivered Shipments
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.Color3} />
                      <Text style={styles.PendingShipments}>
                        Others Shipments
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        {/* NDR Funnel end */}
      </ScrollView>
    </View>
  );
};

export default DashboardNDR;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CODParent: {
    backgroundColor: '#fff',
    // backgroundColor: LIGHT_GREEN,
    marginHorizontal: 10,
    marginVertical: 15,
    elevation: 1,
    borderRadius: 10,
  },
  codtitle: {
    color: '#404040',
    fontFamily: 'Montserrat-Bold',
  },

  child1: {
    backgroundColor: EXTRA_LIGHT_GREEN,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginBottom: 5,
    elevation: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  TodayButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 2,
  },
  Today: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  dropdownBtn: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 5,
    width: Width / 3,
    marginBottom: 1,
    borderRadius: 2,
  },
  PercentAndCountViewButtons: {
    // backgroundColor: 'red',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    backgroundColor: LIGHT_GREEN,
    width: Width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    elevation: 2,
    borderRadius: 1,
    marginRight: 1,
    marginLeft: 1,
  },
  switchButtonTxt: {color: '#000', fontFamily: 'Montserrat-Regular'},
  PercenctScreenParentView1: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingVertical: 10,
    margin: 10,
    marginVertical: 7,
    elevation: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 13,
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 12,
    color: '#808080',
    fontFamily: 'Montserrat-Regular',
  },
  NumberView: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 18,
    marginHorizontal: 7,
    elevation: 2,
  },
  NumberTxt: {
    color: '#404040',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  LeftView: {
    flex: 0.4,
    // backgroundColor: 'black',
    alignItems: 'center',
  },
  RightView: {
    flex: 0.6,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  Color1: {
    backgroundColor: '#EC6B56',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  Color2: {
    backgroundColor: '#47B39C',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  Color3: {
    backgroundColor: '#FFC154',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  PendingShipments: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  NotAvailable: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#cccccc',
    // borderWidth: 1,
    borderColor: '#e6fcff',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NA: {
    color: '#404040',
    fontFamily: 'Poppins-Bold',
  },
});
