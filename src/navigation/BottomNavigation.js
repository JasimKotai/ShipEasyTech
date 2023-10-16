import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Orders from '../screens/Orders';
import ShipmentsScreen from '../screens/ShipmentsScreen';
import HelpScreen from '../screens/HelpScreen';
import MoreScreen from '../screens/MoreScreen';
import {GREEN_COLOR} from '../assets/Colors';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.log(height / 13);

const BottomNavigation = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: height / 13,
            backgroundColor: '#FFFF',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarIconView}>
                <Image
                  source={require('../assets/images/home.png')}
                  style={focused ? styles.focusedIconImage : styles.IconImage}
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
                  style={focused ? styles.focusedIconImage : styles.IconImage}
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
    width: 18,
    height: 18,
    tintColor: '#999999',
  },
  focusedIconImage: {
    width: 20,
    height: 20,
    tintColor: GREEN_COLOR,
  },
  IconText: {
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  focusedIconText: {
    color: GREEN_COLOR,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
});
