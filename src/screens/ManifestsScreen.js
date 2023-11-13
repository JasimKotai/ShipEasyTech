// // // ManifestsScreen
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';

// const manifestData = [
//   {id: '1', title: 'Item 1', content: 'This is the content of item 1'},
//   {id: '2', title: 'Item 2', content: 'This is the content of item 2'},
//   {id: '3', title: 'Item 3', content: 'This is the content of item 3'},
//   {id: '4', title: 'Item 4', content: 'This is the content of item 4'},
//   // Add more items as needed
// ];

// const ManifestScreen = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSwipe = event => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const newIndex = Math.floor(
//       contentOffsetX / Dimensions.get('window').width,
//     );
//     setActiveIndex(newIndex);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleSwipe}>
//         {manifestData.map(item => (
//           <View key={item.id} style={styles.itemContainer}>
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <Text style={styles.itemContent}>{item.content}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <FlatList
//         horizontal
//         data={manifestData}
//         keyExtractor={item => item.id}
//         renderItem={({item, index}) => (
//           <Text
//             style={[
//               styles.indexButton,
//               activeIndex === index && styles.activeIndex,
//             ]}
//             onPress={() => setActiveIndex(index)}>
//             {item.title}
//           </Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemContainer: {
//     width: Dimensions.get('window').width,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'lightblue',
//   },
//   itemTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   itemContent: {
//     fontSize: 16,
//   },
//   indexButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     margin: 8,
//     backgroundColor: 'gray',
//     borderRadius: 8,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   activeIndex: {
//     backgroundColor: 'blue',
//   },
// });

// export default ManifestScreen;

// import React, {useState} from 'react';
// import {View, FlatList, Text, Button, Dimensions, Image} from 'react-native';

// const ManifestScreen = () => {
//   const HomeScreen1 = () => {
//     return (
//       <View style={{flex: 1, backgroundColor: '#fff'}}>
//         <View style={{backgroundColor: '#000', padding: 20}}>
//           <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
//             Welcome to React Native!
//           </Text>
//         </View>

//         <View style={{backgroundColor: '#fff', padding: 20}}>
//           <Text style={{fontSize: 16}}>
//             111111111
//           </Text>
//         </View>
//       </View>
//     );
//   };
//   const HomeScreen2 = () => {
//     return (
//       <View style={{flex: 1, backgroundColor: '#fff'}}>
//         <View style={{backgroundColor: '#000', padding: 20}}>
//           <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
//             Welcome to React Native!
//           </Text>
//         </View>

//         <View style={{backgroundColor: '#fff', padding: 20}}>
//           <Text style={{fontSize: 16}}>
//             @@@@@@@22222222222
//           </Text>
//         </View>
//       </View>
//     );
//   };
//   const [temp, setTemp] = useState(0);
//   console.log(temp);
//   const width = Dimensions.get('window').width;

//   const data = [
//     {id: '1', text: 'Item 1'},
//     {id: '2', text: 'Item 2'},
//     {id: '3', text: 'Item 3'},
//     // ... more items
//   ];

//   const renderItem = ({item, index}) => {
//     // Conditionally modify the data based on the index
//     const modifiedItem =
//       index === temp ? {id: 'modified', text: 'Modified Item'} : item;

//     return (
//       <View
//         style={{
//           padding: 16,
//           backgroundColor: 'red',
//           borderWidth: 1,
//           flex: 1,
//           width: width,
//         }}>
//         {index === temp ? <HomeScreen1 /> : <HomeScreen2 />}
//         {/* <Text>{modifiedItem.text}</Text> */}
//       </View>
//     );
//   };

//   return (
//     <View style={{marginTop: 80, flex: 1}}>
//       <Button
//         title={'temp'}
//         onPress={() => {
//           setTemp(temp + 1);
//         }}
//       />
//       <FlatList
//         pagingEnabled
//         horizontal
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         onScroll={e => {
//           const x = e.nativeEvent.contentOffset.x;
//           setTemp(x / width.toFixed(0));
//         }}
//       />
//     </View>
//   );
// };

// export default ManifestScreen;
import {View, Text} from 'react-native';
import React from 'react';

const ManifestsScreen = () => {
  return (
    <View>
      <Text>ManifestsScreen</Text>
    </View>
  );
};

export default ManifestsScreen;
