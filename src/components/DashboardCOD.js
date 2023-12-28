import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {EXTRA_LIGHT_GREEN} from '../assets/Colors';

const Width = Dimensions.get('window').width;
const DashboardCOD = () => {
  const [dropdown, setDropDown] = useState(false);
  const [dropdownType, setDropDownType] = useState('Today');
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <View style={styles.CODParent}>
          {/* child 1 start */}
          <View style={styles.child1}>
            <View style={{flex: 0.7}}>
              <Text style={styles.codtitle}>COD Overview</Text>
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
                <Text style={styles.Today}>{dropdownType}</Text>
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
                  setDropDownType('Today');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownType('Yesterday');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownType('Last 30 Days');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Last 30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownType('Custom');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Custom</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* drop down view end */}

          <View style={styles.child2}>
            <Text style={styles.shipmentValueTxt}>COD Shipments Value</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.DescripText}>
                Sum of order value of delivered shipments with payment mode COD
              </Text>
              <Text numberOfLines={2} style={styles.numberTxt}>
                ₹ 0
              </Text>
            </View>
            {/*  */}
            <Text style={styles.shipmentValueTxt}>
              Freight Charges From COD
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.DescripText}>
                Freight charge of all non-cancelled shipments deducted from COD
                remittance
              </Text>
              <Text numberOfLines={2} style={styles.numberTxt}>
                ₹ 0
              </Text>
            </View>
            {/*  */}
            <Text style={styles.shipmentValueTxt}>COD Remitted</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.DescripText}>
                Sum of COD order value which is already remitted
              </Text>
              <Text numberOfLines={2} style={styles.numberTxt}>
                ₹ 0
              </Text>
            </View>
            {/*  */}
            <Text style={styles.shipmentValueTxt}>COD Pending</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.DescripText}>
                Sum of COD order value of shipments which delivered 8 or more
                days ago with payment mode and COD remittance not done
              </Text>
              <Text numberOfLines={2} style={styles.numberTxt}>
                ₹ 0
              </Text>
            </View>
          </View>
        </View>
        {/* Last COD Amount Remitted */}
        <View style={styles.parent2}>
          <Text style={{color: '#404040', fontFamily: 'Poppins-Regular'}}>
            Last COD Amount Remitted
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.DescripText}>
              Sum of order value of delivered shipments with payment mode COD &
              COD amount not remitted
            </Text>
            <Text numberOfLines={2} style={styles.numberTxt}>
              ₹ 0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardCOD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CODParent: {
    backgroundColor: '#fff',
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
  child2: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  shipmentValueTxt: {
    color: '#404040',
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
  DescripText: {
    fontSize: 10,
    color: '#808080',
    flex: 0.8,
  },
  numberTxt: {
    color: '#000',
    flex: 0.2,
    textAlign: 'center',
    marginBottom: 15,
  },
  parent2: {
    marginHorizontal: 10,
    padding: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
    marginBottom: 5,
  },
});
