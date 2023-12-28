import {View, Text, StatusBar, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Orders from '../screens/Orders';
import ShipmentsScreen from '../screens/ShipmentsScreen';
import MoreScreen from '../screens/MoreScreen';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR} from '../assets/Colors';

/* eslint-disable */

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          // headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            // elevation: 0,
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShadowVisible: false,
            elevation: 0,
            borderWidth: 0,
            backgroundColor: 'transparent',
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIconView}>
                <Image
                  source={require('../assets/images/home.png')}
                  style={focused ? styles.focusedIconImage : [styles.IconImage]}
                />
                <Text
                  style={focused ? styles.focusedIconText : styles.IconText}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIconView}>
                <Image
                  source={require('../assets/images/box2.png')}
                  style={focused ? styles.focusedIconImage : [styles.IconImage]}
                />
                <Text
                  style={focused ? styles.focusedIconText : styles.IconText}>
                  Orders
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Shipments"
          component={ShipmentsScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIconView}>
                <Image
                  source={require('../assets/images/shipments.png')}
                  style={focused ? styles.focusedIconImage : styles.IconImage}
                />
                <Text
                  style={focused ? styles.focusedIconText : styles.IconText}>
                  Shipments
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIconView}>
                <Image
                  source={require('../assets/images/menu.png')}
                  style={focused ? styles.focusedIconImage : styles.IconImage}
                />
                <Text
                  style={focused ? styles.focusedIconText : styles.IconText}>
                  More
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconImage: {
    width: 20,
    height: 20,
    tintColor: '#404040',
  },
  focusedIconImage: {
    width: 21,
    height: 21,
    tintColor: 'green',
  },
  IconText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  focusedIconText: {
    color: 'green',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
});
