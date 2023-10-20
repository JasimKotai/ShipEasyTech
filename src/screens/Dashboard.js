import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {Styles} from '../css/DashboardCSS';
import {LIGHT_GREEN} from '../assets/Colors';

const Dashboard = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {id: '1', content: 'Screen 1'},
    {id: '2', content: 'Screen 2'},
    {id: '3', content: 'Screen 3'},
    {id: '4', content: 'Screen 4'},
    {id: '5', content: 'Screen 5'},

    // Add more screens as needed
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
      <Text>Dashboard</Text>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.carouselItem,
              {backgroundColor: index === currentIndex ? 'blue' : 'gray'},
            ]}>
            <Text style={styles.carouselText}>{item.content}</Text>
          </View>
        )}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / width,
          );
          setCurrentIndex(newIndex);
        }}
      />
    </View>
  );
};

export default Dashboard;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  carouselItem: {
    width: width, // You can adjust the item width to your liking
    height: 200, // Adjust the item height
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    fontSize: 24,
    color: 'white',
  },
});
