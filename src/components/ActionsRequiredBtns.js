import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

const ActionsRequiredBtns = ({title, btn}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View style={styles.parent}>
      <View style={styles.text1View}>
        <Text style={styles.text1}>0</Text>
      </View>
      <View style={styles.textView2}>
        <Text style={styles.text2}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>{btn}</Text>
        <Image
          source={require('../assets/images/greater.png')}
          style={{width: 15, height: 15, tintColor: '#808080'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActionsRequiredBtns;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text1View: {
    height: height / 22,
    width: width / 12,
    backgroundColor: '#e6ffe6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text1: {
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    fontSize: 15,
  },
  textView2: {
    // backgroundColor: 'orange',
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 1,
  },
  text2: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 13,
  },
  btn: {
    // backgroundColor: 'brown',
    width: width / 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#808080',
    fontSize: 13,
  },
});
