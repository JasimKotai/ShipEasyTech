import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';

const QuickActionBtns = ({image, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btn}>
        <View
          style={{
            height: 60,
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Image source={image} style={styles.img} />
        </View>
        <View
          style={{
            height: 60,
            width: '100%',
            paddingTop: 5,
          }}>
          <Text style={styles.txt}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuickActionBtns;
const styles = StyleSheet.create({
  btn: {
    width: 82,
    height: 120,
    backgroundColor: '#FFFF',
    elevation: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 28,
    resizeMode: 'contain',
    tintColor: GREEN_COLOR,
  },
  txt: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
});
