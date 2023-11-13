import {Dimensions, StyleSheet} from 'react-native';
import {GREEN_COLOR, LIGHT_GREEN} from '../assets/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  OverviewBtn: {
    backgroundColor: '#FFF',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
  },
  OverviewBtnText: {
    color: '#404040',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});

export {Styles};
