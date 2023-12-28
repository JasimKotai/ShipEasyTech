import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// console.log(screenWidth / 4.5);
// console.log(screenHeight / 6);
const QuickActionBtns = ({image, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View style={styles.btnView}>
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
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'aliceblue',
    borderRadius: 5,
    elevation: 1,
  },
  btnView: {
    // width: 80,
    // height: 120,
    width: screenWidth / 4.5,
    // height: screenHeight / 6,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 28,
    resizeMode: 'contain',
    // tintColor: GREEN_COLOR,
    tintColor: 'green',
  },
  txt: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
});
