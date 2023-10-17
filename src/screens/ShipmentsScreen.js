import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modals from '../components/Modals';

const ShipmentsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <Text>ShipmentsScreen</Text>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
      <Modals visible={modalVisible} onClose={toggleModal} />
    </View>
  );
};

export default ShipmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
