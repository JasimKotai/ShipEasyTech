import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../components/Header';
import {Styles} from '../css/DashboardCSS';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';
import DashboardOverview from '../components/DashboardOverview';
import DashboardCOD from '../components/DashboardCOD';
import DashboardPickUpDelivery from '../components/DashboardPickUpDelivery';
import DashboardNDR from '../components/DashboardNDR';
import DashboardWeightDiscrepancies from '../components/DashboardWeightDiscrepancies';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Temp from '../components/Temp';

const Dashboard = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(currentIndex);
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    first: DashboardOverview,
    second: DashboardCOD,
    third: DashboardPickUpDelivery,
    fourth: DashboardNDR,
    fifth: DashboardWeightDiscrepancies,
  });

  const [index, setIndex] = React.useState(0);
  // console.log(index);

  const [routes] = React.useState([
    {key: 'first', title: 'Overview'},
    {key: 'second', title: 'COD'},
    {
      key: 'third',
      title: 'PickUp & Delivery',
    },
    {key: 'fourth', title: 'NDR'},
    {
      key: 'fifth',
      title: 'Weight Discrepancies',
    },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      tabStyle={styles.tab}
      activeColor={GREEN_COLOR}
    />
  );

  return (
    <Temp />
    // <View style={Styles.container}>
    //   <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
    //   <Header
    //     title="Dashboard"
    //     onPress={() => {
    //       navigation.goBack();
    //     }}
    //   />
    //   {/* tab view = React Native Tab View */}
    //   <TabView
    //     navigationState={{index, routes}}
    //     renderScene={renderScene}
    //     onIndexChange={setIndex}
    //     initialLayout={{width: layout.width}}
    //     lazy={true}
    //     renderTabBar={renderTabBar}
    //   />
    // </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  indicator: {
    backgroundColor: GREEN_COLOR,
  },
  label: {
    color: '#404040',
    fontSize: 12,
    // fontFamily: 'Poppins-Regular',
    fontWeight: '500',
  },
  tab: {
    padding: 0,
  },
});
