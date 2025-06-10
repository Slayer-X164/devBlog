import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  user: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      state.isSignedIn = true;
      state.user = payload;
    },
    removeUser: (state) => {
      state.isSignedIn = false;
      state.user = {};
    },
  },
});

export const {setUser,removeUser} = userSlice.actions
export default userSlice.reducer
