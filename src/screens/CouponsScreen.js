import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CouponsScreen = ({navigation, route}) => {
  const {refRBSheet2} = route.params;
  return (
    <View>
      <Text>CouponsScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreen');
          refRBSheet2.current.open();
        }}
        style={{padding: 20}}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CouponsScreen;
