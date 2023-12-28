import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

const ActionsRequiredBtns = ({title, btn, updates}) => {
  // console.log('ActionsRequiredBtns : ', updates);
  return (
    <View style={styles.parent}>
      <View style={styles.text1View}>
        <Text style={styles.text1}>{updates}</Text>
      </View>
      <View style={styles.textView2}>
        <Text style={styles.text2}>{title}</Text>
      </View>
      {/* <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>{btn}</Text>
        <Image
          source={require('../assets/images/greater.png')}
          style={{width: 15, height: 15, tintColor: '#404040'}}
        />
      </TouchableOpacity> */}
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
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 1,
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    color: '#494949',
    // fontSize: 13,
  },
  btn: {
    width: width / 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#404040',
    fontSize: 13,
  },
});
