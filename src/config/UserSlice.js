import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
const {createSlice} = require('@reduxjs/toolkit');

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    customer: null,
    status: false,
  },
  reducers: {
    userLogout(state, {payload}) {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('@userDetails');
      payload.replace('SignInScreen');
      Alert.alert('Logout Successful');
    },
    saveUserData(state, {payload}) {
      state.user = payload?.user;
      state.customer = payload?.customer;
    },

  },
});
export const {userLogout, saveUserData} = UserSlice.actions;
export default UserSlice.reducer;
