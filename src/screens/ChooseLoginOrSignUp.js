import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
// import Carousel from 'react-native-reanimated-carousel';
import {GREEN_COLOR, SECONDARY_COLOR} from '../assets/Colors';

const ChooseLoginOrSignUp = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  // const [sliderNum, setSliderNum] = useState(0);
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1682687979601-082a1295b78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
      title: 'Image 1',
      header: 'Smooth Order Processing',
      description:
        'Sync, or create your orders in 30 seconds, and process them based on shipping rates, and estimated pick up and delivery time',
    },
    {
      image:
        'https://images.unsplash.com/photo-1695754189866-f2f8eae7328d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
      title: 'Image 2',
      header: 'Wider Coverage',
      description:
        'Ship your orders to over 24,000 pincodes and 220 countries at lowest shipping rates',
    },
    {
      image:
        'https://images.unsplash.com/photo-1695486739035-c6008878d493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
      title: 'Image 3',
      header: 'Real Time Notifications',
      description:
        'Keep your buyers updated with automated real-time shipment notificatons',
    },
    {
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25saW5lJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      title: 'Image 4',
      header: 'Business Analytics',
      description:
        'Monitor important business metrics to measure your shipping performance',
    },
  ];

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        {/* <Carousel
          // loop
          width={width}
          height={height / 1.25}
          //   autoPlay={true}
          //   data={[...new Array(6).keys()]}
          data={data}
          scrollAnimationDuration={1000}
          onSnapToItem={index => {
            // console.log('current index:', index);
          }}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFF',
              }}>
              <View
                style={{
                  backgroundColor: GREEN_COLOR,
                  width: width,
                  height: height / 2,
                  borderBottomRightRadius: width / 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
              <View
                style={{
                  paddingHorizontal: 20,
                  padding: 10,
                  backgroundColor: '#FFFF',
                  height: height / 3.79,
                }}>
                <Text style={styles.CarouselHeaderText}>{item.header}</Text>

                <Text style={styles.CarouselDescripText}>
                  {item.description}
                </Text>
              </View>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#FFFF',
                  padding: 5,
                  // marginTop: height/ 17
                }}>
                <Animated.View
                  style={[
                    styles.circleView,
                    {
                      backgroundColor:
                        index == 0 ? SECONDARY_COLOR : 'transparent',
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.circleView,
                    {
                      backgroundColor:
                        index == 1 ? SECONDARY_COLOR : 'transparent',
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.circleView,
                    {
                      backgroundColor:
                        index == 2 ? SECONDARY_COLOR : 'transparent',
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.circleView,
                    {
                      backgroundColor:
                        index == 3 ? SECONDARY_COLOR : 'transparent',
                    },
                  ]}
                />
              </Animated.View>
            </View>
          )}
        /> */}
        <View style={styles.BTNView}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('SellerOrBuyerScreen');
            }}
            style={styles.SignUpBTNS}>
            <Text style={styles.BTNText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}
            style={styles.SignInBTNS}>
            <Text style={[styles.BTNText, {color: GREEN_COLOR}]}>Sign IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ChooseLoginOrSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  circleView: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  CarouselHeaderText: {
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: 20,
  },
  CarouselDescripText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginTop: 20,
  },
  BTNView: {
    backgroundColor: '#FFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  SignUpBTNS: {
    backgroundColor: GREEN_COLOR,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    // marginTop: 20,
  },
  BTNText: {
    color: '#FFFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  SignInBTNS: {
    backgroundColor: '#FFFF',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: GREEN_COLOR,
    marginTop: 20,
  },
});
