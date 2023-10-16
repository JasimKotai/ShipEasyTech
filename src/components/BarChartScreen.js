import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

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
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
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
        // showValuesOnTopOfBars={true}
        // withInnerLines={false}
        // withVerticalLabels={false}
        // withHorizontalLabels={false}
      />
    </View>
  );
};

export default BarChartScreen;
