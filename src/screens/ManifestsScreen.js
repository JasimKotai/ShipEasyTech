import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import {EXTRA_LIGHT_GREEN, GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const manifestData = [
  {id: '1', title: 'Item 1', content: 'This is the content of item 1'},
  {id: '2', title: 'Item 2', content: 'This is the content of item 2'},
  {id: '3', title: 'Item 3', content: 'This is the content of item 3'},
  {id: '4', title: 'Item 4', content: 'This is the content of item 4'},
  // Add more items as needed
];

const ManifestScreen = ({navigation}) => {
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectSort, setSelectSort] = useState('Latest Escalation Date');

  const handleSwipe = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(
      contentOffsetX / Dimensions.get('window').width,
    );
    setActiveIndex(newIndex);
  };

  const onSubmitted = () => {
    if (search.length > 0) {
      setShowInput(!showInput);
      // call api
      console.log('Submitted -- functiion call from keyboard');
    } else {
      setShowInput(!showInput);
      console.log('empty search box');
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Manifests"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* Modal  */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.ModalParent}>
          <View style={styles.ModalChild}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{alignSelf: 'flex-end', padding: 7, zIndex: 1}}>
              <Image
                source={require('../assets/images/close1.png')}
                style={{width: 16, height: 16}}
              />
            </Pressable>
            <Text style={styles.ModalTxt}>Sort</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectSort('Latest Escalation Date');
                setModalVisible(!modalVisible);
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 20,
              }}>
              <View
                style={[
                  styles.ModalButton1,
                  {
                    backgroundColor:
                      selectSort === 'Latest Escalation Date'
                        ? GREEN_COLOR
                        : '#f2f2f2',
                  },
                ]}>
                {selectSort === 'Latest Escalation Date' ? (
                  <Image
                    source={require('../assets/images/check-mark.png')}
                    style={{width: 15, height: 15}}
                  />
                ) : null}
              </View>
              <Text style={styles.ModalButton1Txt}>Latest Escalation Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectSort('Earliest Escalation Date');
                setModalVisible(!modalVisible);
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 20,
              }}>
              <View
                style={[
                  styles.ModalButton1,
                  {
                    backgroundColor:
                      selectSort === 'Earliest Escalation Date'
                        ? GREEN_COLOR
                        : '#f2f2f2',
                  },
                ]}>
                {selectSort === 'Earliest Escalation Date' ? (
                  <Image
                    source={require('../assets/images/check-mark.png')}
                    style={{width: 15, height: 15}}
                  />
                ) : null}
              </View>
              <Text style={styles.ModalButton1Txt}>
                Earliest Escalation Date
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal  END*/}
      {/* search input */}
      <View style={styles.SearchInputParent}>
        {showInput && (
          <TextInput
            placeholder="Search Manifest ID"
            style={styles.SearchInput}
            placeholderTextColor={'#808080'}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              onSubmitted();
            }}
          />
        )}
        {!showInput && (
          <TouchableOpacity
            onPress={() => {
              setShowInput(!showInput);
            }}
            style={styles.SearchButton}>
            <Image
              source={require('../assets/images/search.png')}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* search input END*/}

      <View style={styles.Parent}>
        <View style={styles.child1}>
          <Image
            source={require('../assets/images/shipment.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={{color: '#404040', fontFamily: 'Montserrat-SemiBold'}}>
            No Results Found
          </Text>
        </View>
      </View>
      <View style={styles.Parent2}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={[styles.SortButton, {borderRightWidth: 1}]}>
          <Image
            source={require('../assets/images/sort.png')}
            style={{width: 18, height: 18}}
            tintColor={GREEN_COLOR}
          />
          <Text style={styles.SortButtonTxt}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.SortButton}>
          <Image
            source={require('../assets/images/filter.png')}
            style={{width: 18, height: 18}}
            tintColor={GREEN_COLOR}
          />
          <Text style={styles.SortButtonTxt}>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipe}>
        {manifestData.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemContent}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>

      <FlatList
        horizontal
        data={manifestData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Text
            style={[
              styles.indexButton,
              activeIndex === index && styles.activeIndex,
            ]}
            onPress={() => setActiveIndex(index)}>
            {item.title}
          </Text>
        )}
      /> */}
    </View>
  );
};
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContent: {
    fontSize: 16,
  },
  indexButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: 'gray',
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  activeIndex: {
    backgroundColor: 'blue',
  },
  //
  ModalParent: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalChild: {
    backgroundColor: 'aliceblue',
    width: Width / 1.2,
    height: Height / 3.7,
    borderRadius: 10,
    elevation: 1,
    padding: 10,
  },
  ModalTxt: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: -25,
  },
  ModalButton1: {
    backgroundColor: GREEN_COLOR,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 1,
    borderRadius: 2,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalButton1Txt: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  SearchInputParent: {
    // backgroundColor: 'pink',
    // top: -Height / 10.5,
    position: 'absolute',
    top: Height / 19,
    zIndex: 1,
    flexDirection: 'row',
    width: Width / 1.15,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  SearchInput: {
    padding: 3,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: EXTRA_LIGHT_GREEN,
    flex: 1,
    paddingHorizontal: 10,
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 12,
    marginRight: 30,
    marginHorizontal: 10,
  },
  SearchButton: {
    backgroundColor: 'aliceblue',
    width: Width / 5.5,
    height: Height / 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  Parent: {
    flex: 12,
    backgroundColor: '#FFF',
  },
  child1: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    elevation: 5,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Parent2: {
    flex: 1,
    backgroundColor: EXTRA_LIGHT_GREEN,
    flexDirection: 'row',
  },
  SortButton: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  SortButtonTxt: {
    color: GREEN_COLOR,
    fontFamily: 'Onest-SemiBold',
    marginLeft: 5,
  },
});

export default ManifestScreen;
