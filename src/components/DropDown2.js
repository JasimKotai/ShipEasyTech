import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../assets/Colors';

const DropDown2 = () => {
  return (
    <View>
      <View style={styles.dropdown2View}>
        <TouchableOpacity style={styles.channelIntegrationBtn}>
          <View style={styles.dropdown2childView}>
            <Image
              source={require('../assets/images/shopify.png')}
              style={{width: 18, height: 18, tintColor: GREEN_COLOR}}
            />
            <Text style={styles.channelIntegrationBtnText}>
              Integrate with shopify
            </Text>
          </View>
          <Image
            source={require('../assets/images/greater.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
      </View>
      {/* button one end */}
      <View style={styles.dropdown2View}>
        <TouchableOpacity style={styles.channelIntegrationBtn}>
          <View style={styles.dropdown2childView}>
            <Image
              source={require('../assets/images/others.png')}
              style={{width: 18, height: 18, tintColor: GREEN_COLOR}}
            />
            <Text style={styles.channelIntegrationBtnText}>
              Integrate Other channel
            </Text>
          </View>
          <Image
            source={require('../assets/images/greater.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DropDown2;
const styles = StyleSheet.create({
  channelIntegrationBtn: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  channelIntegrationBtnText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    padding: 10,
  },
  dropdown2View: {
    backgroundColor: 'aliceblue',
    marginHorizontal: 20,
    paddingRight: 20,
    flex: 1,
  },
  dropdown2childView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
