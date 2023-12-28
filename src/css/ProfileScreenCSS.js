import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// console.log(width / 5.8);
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileParent: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 1,
    marginTop: height / 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'aliceblue',
  },
  title: {
    color: '#404040',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  companyName: {
    color: '#595959',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  companyName2: {
    color: '#404040',
    fontFamily: 'Poppins-Regular',
    marginVertical: 4,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#000',
    marginHorizontal: 10,
    paddingVertical: width / 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 20,
  },
  userDetailsView: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  leftView: {
    flex: 0.4,
    // backgroundColor: 'gold',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightView: {
    flex: 0.7,
    // backgroundColor: 'green',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
export {Styles};
