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

const BarCodeScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [flashLight, setFlashLight] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  // console.log(searchInput);
  const onSuccess = e => {
    // console.log(e);
    setSearchInput(e.data);
  };
  return (
    <KeyboardAvoidingView enabled={true} style={{flex: 1}} behavior={'height'}>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor={'#e6ffef'}
        />
        {/* camera scanner view */}
        <View
          style={{
            flex: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            // backgroundColor: 'red',
          }}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={
              flashLight
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.auto
            }
            showMarker={true}
            markerStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderColor: '#ffff',
            }}
            cameraProps={{
              whiteBalance: 'shadow',
              videoStabilizationMode: 'cinematic',
            }}
            fadeIn={false}
            // reactivate={true}
            // cameraTimeout={15000}
          />
          {/* flash button */}
          <TouchableOpacity
            onPress={() => {
              setFlashLight(!flashLight);
            }}
            style={styles.flashBtn}>
            <Image
              source={
                flashLight
                  ? require('../assets/images/flash-on.png')
                  : require('../assets/images/flash-off.png')
              }
              style={styles.flashBtnImg}
            />
          </TouchableOpacity>
          {/* back button */}
          <View style={styles.BackBtnView}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../assets/images/back.png')}
                style={styles.BackBtnImage}
              />
            </TouchableOpacity>
            <Text style={styles.Title}>Barcode Scanner</Text>
          </View>
        </View>
        {/* bottom view eg textinput, buttons */}
        <View style={{flex: 1}}>
          <ScrollView
            style={{
              width: width,
              backgroundColor: 'aliceblue',
            }}>
            {/* Scroll Parent View */}
            <View style={styles.ScrollParentView}>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#000'}}>
                Generate Manifest for AWB
              </Text>
              {/* textinput parent view */}
              <View style={styles.textinputParentView}>
                <TextInput
                  value={searchInput}
                  placeholder="AWD Number"
                  onChangeText={text => setSearchInput(text)}
                  style={styles.textInputStyle}
                />
                {searchInput.length !== 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width / 6,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Image
                        source={require('../assets/images/reload.png')}
                        style={{width: 20, height: 24, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
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
              {/* <Text style={{color: 'red', fontSize: 10, marginLeft: 10}}>
            Order not found
          </Text> */}
            </View>
            {/* button */}
            <TouchableOpacity style={styles.proceedBtn}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
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
// console.log(height / 27);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: height,
    backgroundColor: '#fFFF',
    paddingTop: height / 28,
  },
  BackBtnView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    // backgroundColor: 'red',
    paddingVertical: 10,
    width: width,
    paddingLeft: 13,
  },
  BackBtnImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  Title: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  flashBtn: {
    zIndex: 1,
    position: 'absolute',
    bottom: 65,
    left: 30,
  },
  flashBtnImg: {width: 20, height: 30, tintColor: '#ffff'},
  ScrollParentView: {
    margin: 10,
    backgroundColor: '#ffff',
    // height: height / 7,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    // borderWidth: 1,
  },
  textinputParentView: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: height / 17,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    fontSize: 11,
    color: '#595959',
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
    // backgroundColor: 'red',
  },
  proceedBtn: {
    marginHorizontal: 10,
    backgroundColor: '#99ffbe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
});
