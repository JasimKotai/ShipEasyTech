import {Dimensions, StyleSheet} from 'react-native';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  pickupAddressView: {
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    // borderWidth: 0.6,
    padding: 10,
    borderRadius: 5,
  },
  pickupAddressText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  selectLocationView: {
    flexDirection: 'row',
    height: height / 18,
    backgroundColor: '#ffff',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  pickupLocationView: {
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#808080',
    marginVertical: 10,
  },
  RBSheetCloseBtn: {
    marginRight: 20,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  RBSheetCloseBtnImg: {
    width: 20,
    height: 20,
    tintColor: GREEN_COLOR,
  },
  RBSheetSearchBar: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginVertical: 10,
    padding: 0,
    height: height / 18,
    paddingHorizontal: 10,
  },
  RBSheetFlatListParent: {
    backgroundColor: '#ffff',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: 2,
    elevation: 5,
  },
  RBSheetFlatListChild: {
    backgroundColor: LIGHT_GREEN,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draggableIconStyle: {
    // backgroundColor: '#000',
    padding: 0,
    width: 0,
    height: 0,
    margin: 0,
  },
  customerDetailParentView: {
    borderWidth: 1,
    borderColor: '#bfbfbf',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginHorizontal: 5,
  },
  customerAddressInputs: {
    // height: 50,
    height: height / 16,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
    padding: 0,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdown: {
    height: height / 16,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  iconStyle: {
    width: 30,
    resizeMode: 'cover',
    tintColor: GREEN_COLOR,
    height: 30,
    marginRight: 6,
  },
});

export {Styles};
