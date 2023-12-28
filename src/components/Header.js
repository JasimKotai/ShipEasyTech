import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {EXTRA_LIGHT_GREEN, LIGHT_GREEN} from '../assets/Colors';

const height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Header = ({navigation, title, onPress}) => {
  return (
    <View style={styles.header}>
      {/* back button */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image
          source={require('../assets/images/back.png')}
          style={{width: Width / 15, height: Width / 15, resizeMode: 'contain'}}
          tintColor={'#404040'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={styles.title}>{Hindi.Header}</Text> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  header: {
    backgroundColor: LIGHT_GREEN,
    // backgroundColor: EXTRA_LIGHT_GREEN,
    height: height / 7,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
    marginBottom: 5,
  },
  title: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    // top: height / 19,
    // left: 20,
    top: height / 25,
    left: 10,

    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
});
