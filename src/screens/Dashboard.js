import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {Styles} from '../css/DashboardCSS';
import {LIGHT_GREEN} from '../assets/Colors';

const Dashboard = () => {
  return (
    <View style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <Header
        title="Dashboard"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
