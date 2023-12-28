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
import {useFocusEffect} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
// console.log(Width / 18);
const ReadyToShip = () => {
  const data = [1, 2, 3];
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // This function will be called whenever the component is focused
  //     console.log('Component is focused');
  //     // Add any actions or logs you want to perform when the component is focused
  //     // For example, API calls, state updates, etc.

  //     return () => {
  //       // Optional cleanup function when component is unfocused
  //       console.log('Component is unfocused');
  //       // Add any cleanup logic here if needed
  //     };
  //   }, []),
  // );

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
                <TouchableOpacity
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
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
                  backgroundColor: '#fff',
                  paddingVertical: 3,
                  paddingHorizontal: 3,
                  borderRadius: 4,
                  elevation: 0.4,
                }}>
                <View style={styles.flatListChild3}>
                  <View
                    style={{
                      backgroundColor: '#666',
                      width: Width / 15,
                      height: Width / 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 40,
                      marginHorizontal: 2,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      J
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      backgroundColor: '#f2f2f2',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: TEXT_BLACK2,
                        fontFamily: 'Rubik-SemiBold',
                      }}>
                      Jasim Khan
                    </Text>
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'violet',
                      flex: 0.3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#595959',
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Prepaid
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      // backgroundColor: 'skyblue',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 13,
                        color: '#595959',
                      }}>
                      ₹ 1999.00
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f2f2f2',
                    paddingVertical: 12,
                    flex: 0.2,
                    alignItems: 'center',
                    elevation: 0.2,
                    borderLeftWidth: 1,
                    borderColor: '#fff',
                    borderTopRightRadius: 3,
                    borderBottomRightRadius: 3,
                  }}>
                  <Text
                    style={{
                      color: GREEN_COLOR,
                      fontSize: 11,
                      // fontFamily: 'Montserrat-SemiBold',
                      fontFamily: 'Rubik-SemiBold',
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

export default ReadyToShip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListParentView: {
    backgroundColor: '#f2f2f2',
    elevation: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  flatListChild1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceButtonImg: {
    width: Width / 18,
    height: Width / 18,
    tintColor: GREEN_COLOR,
    resizeMode: 'contain',
  },
  orderIDText: {
    color: TEXT_BLACK2,
    fontFamily: 'Onest-SemiBold',
    fontSize: 13,
    flex: 0.8,
    textAlignVertical: 'center',
  },
  orderIDText2: {
    color: '#595959',
    fontFamily: 'Onest-Regular',
    fontSize: 12,
  },
  flatListChild3: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 7,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    elevation: 0.2,
    flex: 0.9,
  },
});
