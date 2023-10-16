const {createSlice} = require('@reduxjs/toolkit');

const UserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: 'hello',
  },
  reducers: {},
  //   extraReducers: (

  //   ),
});
export default UserSlice.reducer;
