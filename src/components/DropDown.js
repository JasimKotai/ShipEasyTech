import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';

const Width = Dimensions.get('window').width;

const DropDown = () => {
  return (
    <>
      <View
        style={{
          height: 0.7,
          marginVertical: 5,
          marginBottom: 10,
          backgroundColor: '#d9d9d9',
          flex: 1,
        }}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/mail.png')}
            style={{width: Width / 18, height: Width / 18}}
          />
          <Text
            style={{
              color: '#404040',
              fontFamily: 'Rubik-Regular',
              marginLeft: 6,
              fontSize: 13,
            }}>
            Email ID :
          </Text>
          <TouchableOpacity onPress={() => {}} style={{marginLeft: 10}}>
            <Text
              style={{
                color: GREEN_COLOR,
                fontFamily: 'Poppins-Regular',
                marginLeft: 6,
                fontSize: 12,
              }}>
              support@shiprocket.com
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DropDown;
