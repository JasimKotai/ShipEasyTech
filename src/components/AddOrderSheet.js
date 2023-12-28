import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';

const AddOrderSheet = ({REF}) => {
  const navigation = useNavigation();
  const [selectedButton, setselectedButton] = useState('Quick');
  const [path, setPath] = useState('QuickShipmentScreen');
  const refRBSheet = useRef();
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
          }}
          style={styles.Buttons}>
          <View style={styles.buttonView}>
            <View style={styles.buttonChildView}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor:
                    selectedButton === 'Quick' ? GREEN_COLOR : '#f2f2f2',
                  borderRadius: 20,
                }}
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
          }}
          style={styles.Buttons}>
          <View style={styles.buttonView}>
            <View style={styles.buttonChildView}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor:
                    selectedButton === 'Return' ? GREEN_COLOR : '#f2f2f2',
                  borderRadius: 20,
                }}
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
          }}
          style={styles.Buttons}>
          <View style={styles.buttonView}>
            <View style={styles.buttonChildView}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor:
                    selectedButton === 'International'
                      ? GREEN_COLOR
                      : '#f2f2f2',
                  borderRadius: 20,
                }}
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
          }}
          style={styles.Buttons}>
          <View style={styles.buttonView}>
            <View style={styles.buttonChildView}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor:
                    selectedButton === 'Hyperlocal' ? GREEN_COLOR : '#f2f2f2',
                  borderRadius: 20,
                }}
              />
            </View>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={styles.buttonText1}>Hyperlocal Order</Text>
              <Text style={styles.buttonText2}>
                Create a local order for a distance upto 50 kms
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handleRBSheet();
            REF.current.close();
            navigation.navigate(path);
          }}
          style={styles.proceedBtn}>
          <Text style={styles.proceedBtnText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddOrderSheet;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
  },
  Buttons: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    height: height / 10,
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 1,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonChildView: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderColor: EXTRA_LIGHT_GREEN,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText1: {
    fontFamily: 'Poppins-SemiBold',
    color: '#404040',
  },
  buttonText2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#595959',
  },
  proceedBtn: {
    backgroundColor: '#000',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 40,
  },
  proceedBtnText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
});
