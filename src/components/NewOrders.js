import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TEXT_BLACK, TEXT_BLACK2, TEXT_LIGHT_BLACK} from '../assets/fontStyles';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import axios from 'axios';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const NewOrders = ({newOrderData}) => {
  // console.log('------', newOrderData[0].customer_city);

  const [modalVisible, setModalVisible] = useState(false);
  const [newOrderDetails, setNewOrderDetails] = useState(
    newOrderData ? newOrderData : null,
  );
  // console.log('------hello', newOrderDetails);

  // const handleApi = async ({}) => {
  //   console.log('hello worl');
  //   try {
  //     const response = await axios.get(
  //       'http://192.168.1.2/shipeasy-prod/public/api/order-details/app',
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer 32|05mo3hE5JTuKKr5y1WME3knJ7Nrn6YxNyau65sBs88c4942e',
  //         },
  //       },
  //     );
  //     // console.log('---------------------------------------------------------');
  //     // console.log(response.data.order_list_new.data[1].customer_address1);
  //     // console.log(response.data.order_list_new.data);
  //     // const newOrder = response.data.order_list_new.data;
  //     // newOrder.forEach(element => {
  //     //   console.log(element.id);
  //     // });
  //     // newOrder.map(item => {
  //     //   // console.log(item.customer_phone);
  //     //   setNewOrderDetails(item);
  //     // });
  //     setNewOrderDetails(response.data.order_list_new.data);
  //   } catch (error) {
  //     console.log('NewOrders screen -', error);
  //   }
  // };

  // useEffect(() => {
  //   handleApi();
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <FlatList
        data={newOrderDetails}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // console.log('order screen - Hello World');
                // setModalVisible(!modalVisible);
                // handleApi();
              }}
              style={styles.flatListParentView}>
              {/* order id */}
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    styles.TextOne,
                    {flex: 0.4, backgroundColor: '#fff'},
                  ]}>
                  Order ID
                </Text>
                <Text style={[styles.colon]}>:</Text>
                <Text
                  style={[
                    styles.TextTwo,
                    {flex: 0.55, backgroundColor: '#fff'},
                  ]}>
                  {item.order_number}
                </Text>
              </View>
              {/* customer detail */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    flex: 0.4,
                  }}>
                  <Text style={styles.TextOne}>Customer Details</Text>
                </View>
                <Text style={[styles.colon]}>:</Text>
                <View
                  style={{
                    flex: 0.55,
                  }}>
                  <Text style={styles.Name}>
                    Name{`  : `}
                    {item.customer_first_name}
                  </Text>
                  <Text style={styles.Name}>
                    Phone{`  : `}
                    {item.customer_phone}
                  </Text>
                  <Text style={styles.Name}>
                    City{`  : `}
                    {item.customer_city}
                  </Text>
                  <Text style={styles.Name}>
                    Pin{`  : `}
                    {item.customer_zip}
                  </Text>
                </View>
              </View>
              {/* date */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={[
                    styles.TextOne,
                    {flex: 0.4, backgroundColor: '#fff'},
                  ]}>
                  Date
                </Text>
                <Text style={[styles.colon]}>:</Text>
                <Text
                  style={[
                    styles.TextTwo,
                    {flex: 0.55, backgroundColor: '#fff'},
                  ]}>
                  {item.order_created_at}
                </Text>
              </View>
              {/* package details */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={[
                    styles.TextOne,
                    {flex: 0.4, backgroundColor: '#fff'},
                  ]}>
                  Package Details
                </Text>
                <Text style={[styles.colon]}>:</Text>
                <Text
                  style={[
                    styles.TextTwo,
                    {flex: 0.55, backgroundColor: '#fff'},
                  ]}>
                  {item.line_items_name}
                </Text>
              </View>
              {/* status */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={[
                    styles.TextOne,
                    {flex: 0.4, backgroundColor: '#fff'},
                  ]}>
                  Status
                </Text>
                <Text style={[styles.colon]}>:</Text>
                <View
                  style={{
                    flex: 0.55,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#f1f1f1',
                      alignSelf: 'flex-start',
                      // paddingVertical: 2,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                    }}>
                    <Text style={[styles.TextTwo, {color: GREEN_COLOR}]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.ModalParent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={[styles.TextOne]}>Hello World</Text>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NewOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListParentView: {
    backgroundColor: '#fff',
    elevation: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  TextOne: {
    color: TEXT_BLACK2,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  TextTwo: {
    color: '#666',
    // fontFamily: 'Poppins-Regular',
    // fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  Name: {
    color: '#666',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  colon: {
    flex: 0.05,
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#fff',
    color: '#404040',
  },
  ModalParent: {
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
