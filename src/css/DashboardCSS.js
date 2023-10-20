import {Dimensions, StyleSheet} from 'react-native';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export {Styles};
