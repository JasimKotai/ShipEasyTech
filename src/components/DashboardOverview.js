import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

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
              style={{width: 20, height: 20, tintColor: '#404040'}}
            />
            <Text style={styles.todayOrderText}>Today's Orders</Text>
          </View>
          <Text
            numberOfLines={2}
            style={{
              textAlign: 'center',
              color: '#000',
            }}>
            0
          </Text>
        </View>
        <View style={styles.todayOrderView}>
          {/* yesterday order view */}
          <View style={styles.todayOrderChild}>
            <Image
              source={require('../assets/images/booking.png')}
              style={{width: 20, height: 20, tintColor: '#404040'}}
            />
            <Text style={styles.todayOrderText}>Yesterday's Orders</Text>
          </View>
          <Text
            numberOfLines={2}
            style={{
              textAlign: 'center',
              color: '#000',
            }}>
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
                width: 17,
                height: 17,
                tintColor: '#404040',
              }}
            />
          </View>

          <Text style={styles.Text1}>Total's Orders</Text>

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
                width: 13,
                height: 13,
                tintColor: '#404040',
              }}
            />
          </View>

          <Text style={styles.Text1}>Total Cancel</Text>

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
                width: 13,
                height: 13,
                tintColor: '#404040',
              }}
            />
          </View>

          <Text style={styles.Text1}>Total Forwarded</Text>

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
                width: 15,
                height: 15,
                resizeMode: 'contain',
                tintColor: '#404040',
              }}
            />
          </View>
          <Text style={styles.Text1}>RTO</Text>

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
                width: 17,
                height: 17,
                tintColor: '#404040',
              }}
            />
          </View>

          <Text style={styles.Text1}>Total Shipments</Text>

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
    backgroundColor: '#fff',
    padding: 10,
    elevation: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f2f2f2'
  },
  todayOrderChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  todayOrderText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  transactionParentView: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
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
    backgroundColor: '#f2f2f2',
    padding: 2,
    borderRadius: 5,
    marginTop: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#fff'
  },
  transactionViewIcon1: {
    width: 50,
    height: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionViewIcon2: {
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  Text1: {color: '#404040', fontFamily: 'Poppins-Regular'},
});
