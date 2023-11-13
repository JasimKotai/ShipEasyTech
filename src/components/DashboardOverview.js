import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const DashboardOverview = () => {
  return (
    <View style={styles.container}>
      {/* today and yesterday orders start view */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 15,
        }}>
        {/* today order view */}
        <View style={styles.todayOrderView}>
          <View style={styles.todayOrderChild}>
            <Image
              source={require('../assets/images/booking.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={styles.todayOrderText}>Today's Orders</Text>
          </View>
          <Text numberOfLines={2} style={{textAlign: 'center', color: '#000'}}>
            0
          </Text>
        </View>
        <View style={styles.todayOrderView}>
          {/* yesterday order view */}
          <View style={styles.todayOrderChild}>
            <Image
              source={require('../assets/images/booking.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={styles.todayOrderText}>Yesterday's Orders</Text>
          </View>
          <Text numberOfLines={2} style={{textAlign: 'center', color: '#000'}}>
            0
          </Text>
        </View>
      </View>
      {/* today and yesterday orders end view */}
      {/* transactions start view*/}
      <View style={styles.transactionParentView}>
        <Text style={styles.Transactions}>Transactions</Text>
        {/* today orders */}
        <View style={styles.transactionChild1}>
          <View style={styles.transactionViewIcon1}>
            <Image
              source={require('../assets/images/booking.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#404040'}}>Today's Orders</Text>
          </View>

          <View style={styles.transactionViewIcon2}>
            <Text style={{color: '#000'}} numberOfLines={1}>
              0
            </Text>
          </View>
        </View>
        {/* total cancel */}
        <View style={styles.transactionChild1}>
          <View style={styles.transactionViewIcon1}>
            <Image
              source={require('../assets/images/close.png')}
              style={{
                width: 15,
                height: 15,
              }}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#404040'}}>Total Cancel</Text>
          </View>

          <View style={styles.transactionViewIcon2}>
            <Text style={{color: '#000'}} numberOfLines={1}>
              0
            </Text>
          </View>
        </View>
        {/* total forwarded */}
        <View style={styles.transactionChild1}>
          <View style={styles.transactionViewIcon1}>
            <Image
              source={require('../assets/images/forward.png')}
              style={{
                width: 15,
                height: 15,
                tintColor: '#000',
              }}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#404040'}}>Total Forwarded</Text>
          </View>

          <View style={styles.transactionViewIcon2}>
            <Text style={{color: '#000'}} numberOfLines={1}>
              0
            </Text>
          </View>
        </View>
        {/* RTO */}
        <View style={styles.transactionChild1}>
          <View style={styles.transactionViewIcon1}>
            <Image
              source={require('../assets/images/wallet1.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#404040'}}>RTO</Text>
          </View>

          <View style={styles.transactionViewIcon2}>
            <Text style={{color: '#000'}} numberOfLines={1}>
              0
            </Text>
          </View>
        </View>
        {/* Total Shipments
         */}
        <View style={styles.transactionChild1}>
          <View style={styles.transactionViewIcon1}>
            <Image
              source={require('../assets/images/all.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Text style={{color: '#404040'}}>Total Forwarded</Text>
          </View>

          <View style={styles.transactionViewIcon2}>
            <Text style={{color: '#000'}} numberOfLines={2}>
              0
            </Text>
          </View>
        </View>
      </View>
      {/* transactions end view*/}
    </View>
  );
};

export default DashboardOverview;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  todayOrderView: {
    flex: 0.45,
    backgroundColor: '#f2f2f2',
    padding: 10,
    elevation: 5,
    borderRadius: 5,
  },
  todayOrderChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  todayOrderText: {
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  transactionParentView: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
  },
  Transactions: {
    color: '#404040',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  transactionChild1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 2,
    borderRadius: 5,
    marginTop: 10,
    elevation: 9,
  },
  transactionViewIcon1: {
    width: 50,
    height: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionViewIcon2: {
    width: 70,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 5,
    paddingRight: 5,
  },
});
