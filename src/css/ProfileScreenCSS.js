import {Dimensions, StyleSheet} from 'react-native';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileParent: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    elevation: 9,
    marginTop: height / 30,
    marginHorizontal: 10,
  },
  title: {
    color: '#404040',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
    fontSize: 15,
  },
  companyName: {
    color: '#404040',
    fontFamily: 'Roboto-Regular',
    marginVertical: 4,
    fontSize: 13,
    borderRightWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  companyName2: {
    color: '#404040',
    fontFamily: 'Roboto-Bold',
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#000',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 20,
  },
});
export {Styles};
