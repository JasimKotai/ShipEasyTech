import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  PRIMARY_TEXT_BOL,
  PRIMARY_TEXT_REG,
  TEXT_BLACK,
  TEXT_BLACK2,
} from '../assets/fontStyles';

const Modals = ({visible, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.Modalwrap}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: TEXT_BLACK2,
              fontFamily: PRIMARY_TEXT_BOL,
              fontSize: 16,
            }}>
            Login
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require('../assets/images/close.png')}
              style={{width: 18, height: 18}}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 10}}>
          <Text numberOfLines={3} style={{color: TEXT_BLACK2}}>
            Are you sure you want to logout?
          </Text>
        </View>

        <TouchableOpacity style={styles.modalbutton} onPress={onClose}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Modals;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  Modalwrap: {
    backgroundColor: '#e6ffef',
    borderRadius: 8,
    // alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 30,
    marginVertical: height / 3,
    padding: 15,
  },
  modalbutton: {
    marginTop: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // marginRight: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontFamily: PRIMARY_TEXT_REG,
  },
});
