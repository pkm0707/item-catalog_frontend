import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action);
      //state.user = action.payload.data
      state._id = action.payload.customer._id;
      state.firstName = action.payload.customer.firstName;
      state.lastName = action.payload.customer.lastName;
      state.email = action.payload.customer.email;
      state.image = action.payload.customer.image;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
