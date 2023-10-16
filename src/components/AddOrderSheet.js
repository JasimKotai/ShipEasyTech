import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';

const AddOrderSheet = ({REF}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [selectedButton, setselectedButton] = useState('Quick');
  const [path, setPath] = useState('QuickShipmentScreen');
  // console.log(path);
  // console.log(selectedButton);
  // const handleRBSheet = () => {
  //   REF.current.close();
  // };

  return (
    <View style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Text style={styles.title}>What kind of order you want to add :</Text>
        {/* QUICK SHIPMENT */}
        <TouchableOpacity
          onPress={() => {
            setselectedButton('Quick');
            setPath('QuickShipmentScreen');
          }}>
          <View style={styles.buttonView}>
            <View
              style={
                selectedButton == 'Quick'
                  ? styles.buttonChildViewFocused
                  : styles.buttonChildView
              }>
              <Image
                source={require('../assets/images/new-moon.png')}
                style={
                  selectedButton == 'Quick'
                    ? styles.buttonImageFocused
                    : styles.buttonImage
                }
              />
            </View>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={styles.buttonText1}>Quick Shipment</Text>
              <Text style={styles.buttonText2}>
                Create a new order to deliver your products
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* RETURN ORDER */}
        <TouchableOpacity
          onPress={() => {
            setselectedButton('Return');
            setPath('ReturnOrderScreen');
          }}>
          <View style={styles.buttonView}>
            <View
              style={
                selectedButton == 'Return'
                  ? styles.buttonChildViewFocused
                  : styles.buttonChildView
              }>
              <Image
                source={require('../assets/images/new-moon.png')}
                style={
                  selectedButton == 'Return'
                    ? styles.buttonImageFocused
                    : styles.buttonImage
                }
              />
            </View>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={styles.buttonText1}>Return Order</Text>
              <Text style={styles.buttonText2}>
                Create a pickup for your return order
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* INTERNATIONAL ORDER */}
        <TouchableOpacity
          disabled
          onPress={() => {
            setselectedButton('International');
          }}>
          <View style={styles.buttonView}>
            <View
              style={
                selectedButton == 'International'
                  ? styles.buttonChildViewFocused
                  : styles.buttonChildView
              }>
              <Image
                source={require('../assets/images/new-moon.png')}
                style={
                  selectedButton == 'International'
                    ? styles.buttonImageFocused
                    : styles.buttonImage
                }
              />
            </View>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={styles.buttonText1}>International Order</Text>
              <Text style={styles.buttonText2}>
                Create interntional orders to deliver your products outside
                india
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* HYPERLOCAL ORDER */}
        <TouchableOpacity
          disabled
          onPress={() => {
            setselectedButton('Hyperlocal');
          }}>
          <View style={styles.buttonView}>
            <View
              style={
                selectedButton == 'Hyperlocal'
                  ? styles.buttonChildViewFocused
                  : styles.buttonChildView
              }>
              <Image
                source={require('../assets/images/new-moon.png')}
                style={
                  selectedButton == 'Hyperlocal'
                    ? styles.buttonImageFocused
                    : styles.buttonImage
                }
              />
            </View>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={styles.buttonText1}>Hyperlocal Order</Text>
              <Text style={styles.buttonText2}>
                Create a local order for a distance upto 50 kms
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              // handleRBSheet();
              REF.current.close();
              navigation.navigate(path);
            }}
            style={styles.proceedBtn}>
            <Text style={styles.proceedBtnText}>Proceed</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddOrderSheet;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  buttonView: {
    flexDirection: 'row',
    height: height / 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonChildView: {
    borderWidth: 5,
    borderColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonChildViewFocused: {
    borderWidth: 5,
    borderColor: '#e6ffef',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonImage: {
    width: 15,
    height: 15,
    // tintColor: '#808080',
    resizeMode: 'contain',
  },
  buttonImageFocused: {
    width: 15,
    height: 15,
    // tintColor: '#808080',
    tintColor: GREEN_COLOR,
    resizeMode: 'contain',
  },
  buttonText1: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  buttonText2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000',
  },
  proceedBtn: {
    backgroundColor: LIGHT_GREEN,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  proceedBtnText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
  },
});
