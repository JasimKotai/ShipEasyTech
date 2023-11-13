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

const Dashboard = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  const ref = useRef();

  const data = [
    {id: '1', content: 'Screen 1', screen: 'Overview'},
    {id: '2', content: 'Screen 2', screen: 'COD'},
    {id: '3', content: 'Screen 3', screen: 'Pickup & Delivery'},
    {id: '4', content: 'Screen 4', screen: 'NDR'},
    {id: '5', content: 'Screen 5', screen: 'Weight Discrepancies'},
  ];

  return (
    <View style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={LIGHT_GREEN} />
      <Header
        title="Dashboard"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* buttons rendering  */}
      <View style={{backgroundColor: LIGHT_GREEN, marginVertical: 3}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* overview button */}
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(0);
              ref.current.scrollToIndex({
                animated: true,
                index: 0,
              });
            }}
            style={[
              Styles.OverviewBtn,
              {borderBottomColor: currentIndex === 0 ? GREEN_COLOR : '#FFF'},
            ]}>
            <Text style={Styles.OverviewBtnText}>Overview</Text>
          </TouchableOpacity>
          {/* COD button */}
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(1);
              ref.current.scrollToIndex({
                animated: true,
                index: 1,
              });
            }}
            style={[
              Styles.OverviewBtn,
              {borderBottomColor: currentIndex === 1 ? GREEN_COLOR : '#FFF'},
            ]}>
            <Text style={Styles.OverviewBtnText}>COD</Text>
          </TouchableOpacity>
          {/* Pickup & Delivery button */}
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(2);
              ref.current.scrollToIndex({
                animated: true,
                index: 2,
              });
            }}
            style={[
              Styles.OverviewBtn,
              {borderBottomColor: currentIndex === 2 ? GREEN_COLOR : '#FFF'},
            ]}>
            <Text style={Styles.OverviewBtnText}>Pickup & Delivery</Text>
          </TouchableOpacity>
          {/* NDR */}
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(3);
              ref.current.scrollToIndex({
                animated: true,
                index: 3,
              });
            }}
            style={[
              Styles.OverviewBtn,
              {borderBottomColor: currentIndex === 3 ? GREEN_COLOR : '#FFF'},
            ]}>
            <Text style={Styles.OverviewBtnText}>NDR</Text>
          </TouchableOpacity>
          {/* Weight Discrepancies */}
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(4);
              ref.current.scrollToIndex({
                animated: true,
                index: 4,
              });
            }}
            style={[
              Styles.OverviewBtn,
              {borderBottomColor: currentIndex === 4 ? GREEN_COLOR : '#FFF'},
            ]}>
            <Text style={Styles.OverviewBtnText}>Weight Discrepancies</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* screen rendering */}
      <Animated.FlatList
        ref={ref}
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(x / width.toFixed(0));
        }}
        renderItem={({item, index}) => (
          <Animated.View style={{width: width, backgroundColor: 'pink'}}>
            {/* <Text>{item.id}</Text> */}
            {index === 0 ? (
              <DashboardOverview />
            ) : index === 1 ? (
              <DashboardCOD />
            ) : index === 2 ? (
              <DashboardPickUpDelivery />
            ) : index === 3 ? (
              <DashboardNDR />
            ) : index === 4 ? (
              <DashboardWeightDiscrepancies />
            ) : null}
          </Animated.View>
        )}
      />
    </View>
  );
};

export default Dashboard;
