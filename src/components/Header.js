import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {LIGHT_GREEN} from '../assets/Colors';

const Header = ({navigation, title, onPress}) => {
  return (
    <View style={styles.header}>
      {/* back button */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image
          source={require('../assets/images/back.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={styles.title}>{Hindi.Header}</Text> */}
    </View>
  );
};

export default Header;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  header: {
    backgroundColor: LIGHT_GREEN,
    height: height / 7,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    zIndex: 1,
    position: 'absolute',
    top: height / 19,
    left: 20,
  },
});
