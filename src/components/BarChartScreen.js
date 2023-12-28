import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {BarChart, LineChart} from 'react-native-chart-kit';

const BarChartScreen = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const data = {
    labels: ['Delivered', 'In Transit', 'Picked Up', 'NDR', 'RTO'],
    datasets: [
      {
        data: [40, 45, 56, 80, 100],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFF',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    // strokeWidth: 1, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false, // optional
  };
  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  return (
    <View style={{flex: 1}}>
      <BarChart
        data={data}
        width={width / 1.06}
        height={height / 2.7}
        // yAxisLabel={'$'}
        // yAxisSuffix="$"
        chartConfig={chartConfig}
        fromZero={true}
        showBarTops={false}
        verticalLabelRotation={30}
        // showValuesOnTopOfBars={true}
        // withInnerLines={false}
        // withVerticalLabels={false}
        // withHorizontalLabels={false}
      />
      {/* <LineChart
        data={data}
        width={width}
        height={256}
        verticalLabelRotation={30}
        // bezier
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f9999',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      /> */}
    </View>
  );
};

export default BarChartScreen;
