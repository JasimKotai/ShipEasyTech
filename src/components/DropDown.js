import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { GREEN_COLOR } from '../assets/Colors';

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
            style={{width: 20, height: 20}}
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              marginLeft: 6,
              fontSize: 12,
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
