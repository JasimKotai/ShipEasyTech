import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {EXTRA_LIGHT_GREEN} from '../assets/Colors';

const DashboardWeightDiscrepancies = () => {
  const Width = Dimensions.get('window').width;
  const [dropdown, setDropDown] = useState(false);
  const [dropdownNames, setDropDownNames] = useState('Today');

  const barChartData = {
    labels: [
      'Accepted by Seller',
      'Dispute Accepted by Courier',
      'Dispute Rejected by Courier',
      'Auto Accepted',
      'Pending',
    ],
    datasets: [
      {
        data: [20, 45, 28, 0, 0, 0],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#FFFF',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#FFFF',
    backgroundGradientToOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.parent1}>
          <View style={styles.child1}>
            <View style={{flex: 0.7}}>
              <Text style={styles.codtitle}>NDR</Text>
            </View>
            <View
              style={{
                flex: 0.4,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDropDown(!dropdown);
                }}
                style={styles.TodayButton}>
                <Text style={styles.Today}>{dropdownNames}</Text>
                <Image
                  source={
                    dropdown
                      ? require('../assets/images/up-arrow.png')
                      : require('../assets/images/down-arrow.png')
                  }
                  style={{width: 15, height: 15}}
                  tintColor={'#fff'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* drop down view start */}
          {dropdown && (
            <View
              style={{
                right: 5,
                position: 'absolute',
                zIndex: 1,
                alignSelf: 'flex-end',
                top: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Today');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Yesterday');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Yesterday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Last 30 Days');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Last 30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDropDownNames('Custom');
                  setDropDown(!dropdown);
                }}
                style={styles.dropdownBtn}>
                <Text style={styles.Today}>Custom</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* drop down view end */}
          {/* bar chart */}
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <BarChart
              data={barChartData}
              width={Width / 1.055}
              height={Height / 1.7}
              chartConfig={chartConfig}
              verticalLabelRotation={25}
              showValuesOnTopOfBars
              yAxisSuffix="%"
              fromZero
              withInnerLines={true}
              withHorizontalLabels={true}
              style={styles.graphStyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardWeightDiscrepancies;
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent1: {
    backgroundColor: '#f2f2f2',
    elevation: 2,
    marginHorizontal: 8,
    borderRadius: 10,
    marginTop: 20,
  },
  codtitle: {
    color: '#404040',
    fontFamily: 'Montserrat-Bold',
  },

  child1: {
    backgroundColor: EXTRA_LIGHT_GREEN,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginBottom: 5,
    elevation: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  TodayButton: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 2,
  },
  Today: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  dropdownBtn: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 5,
    width: Width / 3,
    marginBottom: 1,
    borderRadius: 2,
  },
  graphStyle: {
    // borderWidth: 1,
    borderColor: 'aliceblue',
    borderRadius: 10,
    elevation: 1,
  },
});
