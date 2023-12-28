import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../splash/Splash';
import ChooseLoginOrSignUp from '../screens/ChooseLoginOrSignUp';
import SellerOrBuyerScreen from '../screens/SellerOrBuyerScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import BottomHomeScreen from './BottomHomeScreen';
import Dashboard from '../screens/Dashboard';
import WalletAndPassbook from '../screens/WalletAndPassbook';
import ManifestsScreen from '../screens/ManifestsScreen';
import HelpAndSupport from '../screens/HelpAndSupport';
import ReUsableButtons from '../components/ReUsableButtons';
import BarCodeScreen from '../components/BarCodeScreen';
import QuickShipmentScreen from '../screens/QuickShipmentScreen';
import ReturnOrderScreen from '../screens/ReturnOrderScreen';
import AddOrderSheet from '../components/AddOrderSheet';
import VerifyOTP from '../components/VerifyOTP';
import AddPickupAddress from '../screens/AddPickupAddress';
import QuickRecharge from '../screens/QuickRecharge';
import CustomerDetails from '../screens/CustomerDetails';
import Header from '../components/Header';
import CouponsScreen from '../screens/CouponsScreen';
import HomeScreen from '../screens/HomeScreen';
import Wallet from '../components/Wallet';
import Passbook from '../components/Passbook';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import TransactionHistory from '../components/TransactionHistory';
import CalculatorScreen from '../components/CalculatorScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="ChooseLoginOrSignUp"
          component={ChooseLoginOrSignUp}
        />
        <Stack.Screen
          name="SellerOrBuyerScreen"
          component={SellerOrBuyerScreen}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="BottomHomeScreen" component={BottomHomeScreen} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="WalletAndPassbook" component={WalletAndPassbook} />
        <Stack.Screen name="Manifests" component={ManifestsScreen} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
        <Stack.Screen name="ReUsableButtons" component={ReUsableButtons} />
        <Stack.Screen name="BarCodeScreen" component={BarCodeScreen} />
        <Stack.Screen
          name="QuickShipmentScreen"
          component={QuickShipmentScreen}
        />
        <Stack.Screen name="ReturnOrderScreen" component={ReturnOrderScreen} />
        <Stack.Screen name="AddOrderSheet" component={AddOrderSheet} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="AddPickupAddress" component={AddPickupAddress} />
        <Stack.Screen name="QuickRecharge" component={QuickRecharge} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="CouponsScreen" component={CouponsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Passbook" component={Passbook} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
