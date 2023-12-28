import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';

const Width = Dimensions.get('window').width;

const ReUsableButtons = ({image, title, path, onPress}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (path) {
      navigation.navigate(path);
    } else if (onPress) {
      onPress();
    } else {
      console.log('ReUsableButtons Screen - Reusable button click');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePress}
        // onPress={() => {
        //   navigateTo();
        // }}
        style={styles.button}>
        <Image
          source={image}
          style={{
            width: Width / 16,
            height: Width / 16,
            resizeMode: 'contain',
            tintColor: GREEN_COLOR,
          }}
        />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReUsableButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    padding: 10,
    alignItems: 'center',
    marginVertical: 1,
    borderRadius: 5,
  },
  text: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    marginLeft: Width / 18,
  },
});
