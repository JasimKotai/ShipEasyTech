import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import {TEXT_BLACK, TEXT_BLACK2} from '../assets/fontStyles';

const QuickRecharge = ({visible, onClose}) => {
  const [amount, setAmount] = useState('5000');
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.7)'}
      />
      <View style={styles.parent}>
        <View style={{flex: 0.3}} />

        <View style={styles.child}>
          {/* modal close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Image
              source={require('../assets/images/close.png')}
              style={{width: 18, height: 18}}
            />
          </TouchableOpacity>
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Image
              source={require('../assets/images/wallet1.png')}
              style={{width: 30, height: 30, tintColor: GREEN_COLOR}}
            />
            <Text style={styles.title}>Recharge Wallet</Text>
          </View>
          {/* add amount view */}
          <View style={{padding: 10, marginTop: 5}}>
            <Text style={{color: TEXT_BLACK2, fontFamily: 'Poppins-Regular'}}>
              Add Amount
            </Text>
            <View
              style={{
                // backgroundColor: '#e6e6e6',
                backgroundColor: LIGHT_GREEN,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                // paddingVertical: 5,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '900',
                  fontSize: 20,
                  flex: 0.15,
                  textAlign: 'center',
                }}>
                ₹
              </Text>
              <TextInput
                onChangeText={setAmount}
                value={amount}
                style={{
                  backgroundColor: '#fff',
                  flex: 0.7,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  color: '#000',
                }}
                placeholderTextColor={TEXT_BLACK2}
                keyboardType="number-pad"
                maxLength={7}
              />
              <TouchableOpacity
                onPress={() => {
                  setAmount('500');
                }}
                style={{
                  flex: 0.15,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/images/close1.png')}
                  style={{width: 15, height: 15}}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#737373',
                fontSize: 12,
                marginTop: 6,
              }}>
              Minimum recharge value is ₹500 and maximum recharge value is ₹50
              Lakhs
            </Text>
          </View>
          {/* add money buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <TouchableOpacity style={styles.addMoneyBtns}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.addMoneyBtnsImg}
              />
              <Text style={styles.addMoneyBtnsText}>₹100</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMoneyBtns}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.addMoneyBtnsImg}
              />
              <Text style={styles.addMoneyBtnsText}>₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMoneyBtns}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.addMoneyBtnsImg}
              />
              <Text style={styles.addMoneyBtnsText}>₹1000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMoneyBtns}>
              <Image
                source={require('../assets/images/add.png')}
                style={styles.addMoneyBtnsImg}
              />
              <Text style={styles.addMoneyBtnsText}>₹5000</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuickRecharge;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  child: {
    backgroundColor: 'aliceblue',
    padding: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 0.7,
  },
  closeBtn: {
    width: width / 10,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    color: TEXT_BLACK2,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  addMoneyBtns: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    width: width / 4.7,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    borderRadius: 5,
  },
  addMoneyBtnsText: {
    color: TEXT_BLACK,
    fontSize: 15,
  },
  addMoneyBtnsImg: {width: 18, height: 18},
});
