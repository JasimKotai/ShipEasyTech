import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
const {createSlice} = require('@reduxjs/toolkit');

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    customer: null,
    status: false,
    create_order_Data: {},
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
    saveCreateOrderData(state, {payload}){
      const mergedObj = {...state.create_order_Data, ...payload}
      state.create_order_Data = mergedObj;
    }
  },
});
export const {userLogout, saveUserData, saveCreateOrderData} = UserSlice.actions;
export default UserSlice.reducer;
