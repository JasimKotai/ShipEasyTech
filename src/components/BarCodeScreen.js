import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {EXTRA_LIGHT_GREEN, LIGHT_GREEN} from '../assets/Colors';

const BarCodeScreen = ({navigation}) => {
  const [flashLight, setFlashLight] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const onSuccess = e => {
    // console.log(e);
    setSearchInput(e.data);
  };
  return (
    <KeyboardAvoidingView enabled={true} style={{flex: 1}} behavior={'height'}>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={false}
          backgroundColor={'#e6ffef'}
        />
        {/* camera scanner view */}
        <View
          style={{
            flex: 0.7,
            backgroundColor: '#fff',
          }}>
          {/* back button */}
          <View style={styles.BackBtnView}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                alignSelf: 'flex-start',
                padding: 3,
                marginHorizontal: 10,
              }}>
              <Image
                source={require('../assets/images/back.png')}
                style={styles.BackBtnImage}
              />
            </TouchableOpacity>
            <Text style={styles.Title}>Barcode Scanner</Text>
          </View>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={
              flashLight
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.auto
            }
            showMarker={true}
            // bottomViewStyle={{padding: 0, margin: 0, backgroundColor: 'red'}}
            bottomContent={
              <TouchableOpacity
                onPress={() => {
                  setFlashLight(!flashLight);
                }}
                style={{
                  marginBottom: 10,
                  padding: 6,
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                }}>
                <Image
                  source={
                    flashLight
                      ? require('../assets/images/flash-on.png')
                      : require('../assets/images/flash-off.png')
                  }
                  style={styles.flashBtnImg}
                />
              </TouchableOpacity>
            }
            markerStyle={{
              // backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: '#ffff',
            }}
            cameraProps={{
              whiteBalance: 'incandescent',
              videoStabilizationMode: 'auto',
            }}
            fadeIn={true}
            // reactivate={true}
            // cameraTimeout={15000}
            vibrate={true}
          />
        </View>
        {/* bottom view eg textinput, buttons */}
        <View style={{flex: 0.3}}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/* Scroll Parent View */}
            <View style={styles.ScrollParentView}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#404040',
                  marginLeft: 5,
                }}>
                Generate Manifest for AWB
              </Text>
              {/* textinput parent view */}
              <View style={styles.textinputParentView}>
                <TextInput
                  value={searchInput}
                  placeholder="AWD Number"
                  onChangeText={text => setSearchInput(text)}
                  style={styles.textInputStyle}
                  placeholderTextColor={'#666'}
                />
                {searchInput.length !== 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.4,
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        borderRightWidth: 0.8,
                        borderLeftWidth: 0.8,
                        borderColor: '#f2f2f2',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../assets/images/reload.png')}
                        style={{width: 20, height: 20, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setSearchInput('');
                      }}>
                      <Image
                        source={require('../assets/images/close.png')}
                        style={{width: 15, height: 15}}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
            {/* button */}
            <TouchableOpacity style={styles.proceedBtn}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BarCodeScreen;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  BackBtnView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EXTRA_LIGHT_GREEN,
    paddingVertical: 5,
    width: width,
    zIndex: 1,
  },
  BackBtnImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    // tintColor: '#000',
  },
  Title: {
    color: '#404040',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  flashBtnImg: {width: 25, height: 25, tintColor: 'aliceblue'},
  ScrollParentView: {
    margin: 10,
    backgroundColor: '#ffff',
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  textinputParentView: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    elevation: 0.5,
  },
  textInputStyle: {
    padding: 6,
    paddingHorizontal: 10,
    fontSize: 13,
    color: '#404040',
    fontFamily: 'Rubik-SemiBold',
    flex: 1,
  },
  proceedBtn: {
    marginHorizontal: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 40,
  },
});
