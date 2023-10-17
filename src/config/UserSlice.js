const { createSlice } = require('@reduxjs/toolkit');



const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    customer: null,
    token: null,
    status: false,
  },
  reducers: {
    userLogout(state, { payload }) {

    },
    saveUserData(state, {payload}){
      state.user = payload.user;
      state.token = payload.token;
      console.log("slice Save user called");
    },

  },
  // extraReducers: builder => {
    
  // },
});
export const { userLogout, saveUserData } = UserSlice.actions;
export default UserSlice.reducer;
