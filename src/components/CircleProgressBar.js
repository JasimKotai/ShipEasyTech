// import {View, Text} from 'react-native';
// import React, {useEffect, useRef} from 'react';
// import {Circle, G, Svg} from 'react-native-svg';
// import {GREEN_COLOR} from '../assets/Colors';

// const CircleProgressBar = ({
//   percentage = 90,
//   radius = 100,
//   strokeWidth = 5,
//   duration = 800,
// }) => {
//   const circumference = 2 * Math.PI * radius;
//   const progressAnimation = useRef(null);
//   // console.log(circumference);

//   useEffect(() => {
//     if (progressAnimation.current) {
//       const progress = ((100 - percentage) / 100) * circumference;
//       progressAnimation.current.setNativeProps({
//         strokeDashoffset: progress,
//       });
//     }
//   }, [percentage, circumference]);
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Svg
//         width={radius * 2}
//         height={radius * 2}
//         // viewBox="-5 -12 70 70"
//         // style={{backgroundColor: 'gold'}}
//       >
//         <G rotation="-90" origin={`${radius},${radius}`}>
//           {/* Background Circle */}
//           <Circle
//             cx={radius}
//             cy={radius}
//             r={radius - strokeWidth}
//             stroke="#FFF"
//             strokeWidth={strokeWidth}
//             fill="transparent"
//           />

//           {/* Progress Circle */}
//           <Circle
//             cx={radius}
//             cy={radius}
//             r={radius - strokeWidth}
//             stroke={GREEN_COLOR}
//             strokeWidth={strokeWidth}
//             fill="transparent"
//             strokeDasharray={circumference}
//             strokeDashoffset={
//               circumference - (circumference * percentage) / 100
//             }
//             ref={progressAnimation}
//           />
//         </G>
//         <Text
//           style={{
//             color: '#000',
//           }}>
//           {percentage}%
//         </Text>
//       </Svg>
//     </View>
//   );
// };

// export default CircleProgressBar;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const CircleProgressBar = ({
  percentage = 90,
  radius = 30,
  strokeWidth = 4,
  duration = 800,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',
      }}>
      <AnimatedCircularProgress
        size={radius * 2}
        width={strokeWidth}
        fill={percentage}
        rotation={0}
        // tintColor={GREEN_COLOR}
        tintColor={GREEN_COLOR}
        backgroundColor="#e6fcff">
        {fill => <Text style={styles.Txt}>{percentage}%</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

export default CircleProgressBar;
const styles = StyleSheet.create({
  Txt: {
    color: '#404040',
    fontSize: 14,
    fontFamily: 'Caveat-Bold',
  },
});
