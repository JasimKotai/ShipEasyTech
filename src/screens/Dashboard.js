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
      renderLabel={({route, focused, color}) => (
        <Text style={styles.label} numberOfLines={1}>
          {route.title}
        </Text>
      )}
      activeColor={GREEN_COLOR}
    />
  );

  return (
    <View style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <Header
        title="Dashboard"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* tab view = React Native Tab View */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        
      />
    </View>
  );
};

export default Dashboard;
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  indicator: {
    backgroundColor: GREEN_COLOR,
  },
  label: {
    color: '#404040', // Set your desired tab label color
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },
  tab: {
    padding: 0,
  },
});
