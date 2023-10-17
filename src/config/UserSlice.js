const { createSlice } = require('@reduxjs/toolkit');



const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    customer: null,
    status: false,
  },
  reducers: {
    userLogout(state, { payload }) {

    },
    
  },
  // extraReducers: builder => {
    
  // },
});
export const { userLogout } = UserSlice.actions;
export default UserSlice.reducer;
