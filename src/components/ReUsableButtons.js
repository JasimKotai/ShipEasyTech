import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';

const ReUsableButtons = ({image, title, path, onPress}) => {
  const navigation = useNavigation();
  function navigateTo(path) {
    if (path) {
      navigation.navigate(path);
    } else {
      onPress();
      console.log('Reusable button click');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateTo(path)} style={styles.button}>
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
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
    backgroundColor: '#f0f0f0f0',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: 15,
  },
});
