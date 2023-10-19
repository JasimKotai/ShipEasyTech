import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {TEXT_BLACK, TEXT_BLACK2, TEXT_LIGHT_BLACK} from '../assets/fontStyles';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const NewOrders = () => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const data = [1,];
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListParentView}>
              <View style={styles.flatListChild1}>
                <Text numberOfLines={1} style={styles.orderIDText}>
                  Order ID : <Text style={styles.orderIDText2}>#989098234</Text>
                </Text>
                {/* download invoice button */}
                <TouchableOpacity>
                  <Image
                    source={require('../assets/images/more.png')}
                    style={styles.invoiceButtonImg}
                  />
                </TouchableOpacity>
              </View>
              <Text
                numberOfLines={1}
                style={[styles.orderIDText, {marginVertical: 10}]}>
                Order Created On :{' '}
                <Text style={styles.orderIDText2}>18 Oct 2023, 08 : 03</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    paddingVertical: 6,
                    borderRadius: 3,
                    elevation: 3,
                    flex: 0.8,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#000',
                      width: 28,
                      height: 28,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      marginHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        color: '#ffff',
                        fontFamily: 'Poppins-Bold',
                        padding: 0,
                        margin: 0,
                      }}>
                      J
                    </Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      flex: 0.4,
                      color: TEXT_BLACK,
                      fontFamily: 'Onest-Regular',
                    }}>
                    Jasim Khan
                  </Text>
                  <View
                    numberOfLines={1}
                    style={{
                      flex: 0.25,
                      borderLeftWidth: 1,
                      alignItems: 'center',
                      borderRightWidth: 1,
                      borderColor: '#cccccc',
                      fontSize: 13,
                      color: TEXT_LIGHT_BLACK,
                    }}>
                    <Text>Prepaid</Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      flex: 0.35,
                      textAlign: 'center',
                      fontSize: 13,
                      color: TEXT_LIGHT_BLACK,
                    }}>
                    ₹ 1999.00
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    paddingVertical: 12,
                    flex: 0.2,
                    borderRadius: 2,
                    marginLeft: 4,
                    alignItems: 'center',
                    // borderWidth: 1,
                    borderColor: '#cccccc',
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      color: GREEN_COLOR,
                      fontSize: 12,
                      fontFamily: 'Onest-SemiBold',
                    }}>
                    Ship Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default NewOrders;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e6f3ff',
    backgroundColor: '#fff',
  },
  flatListParentView: {
    backgroundColor: '#e6ffef',
    elevation: 5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  flatListChild1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceButtonImg: {
    width: 35,
    height: 20,
    resizeMode: 'cover',
    tintColor: GREEN_COLOR,
  },
  orderIDText: {
    color: TEXT_BLACK2,
    fontFamily: 'Onest-SemiBold',
    fontSize: 14,
    flex: 0.9,
  },
  orderIDText2: {
    color: TEXT_LIGHT_BLACK,
    fontFamily: 'Onest-Regular',
    fontSize: 12,
  },
});
