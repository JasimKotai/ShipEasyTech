import {View, Text, StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from './MainNavigation';
import {ToastProvider} from 'react-native-toast-notifications';

const MainApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ToastProvider>
        <MainNavigation />
      </ToastProvider>
    </>
  );
};

export default MainApp;
