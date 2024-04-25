import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturant: {
    ownerEmail: String,
    resturantName: String,
    shortDescription: String,
    longDescription: String,
    backgroundImg: String,
    resturantImg: String,
    minOrder: String,
    deliveryTime: String,
    openTime: String,
    location: String,
    menu: [],
  },
};

export const resturantSlice = createSlice({
  name: "resturant",
  initialState,
  reducers: {
    setResturant: (state, action) => {
      state.resturant = {
        ...action.payload.resturant,
        menu: [],
      };
      state.resturant.menu = Object.entries(action.payload.resturant.menu);
    },
    setMenu: (state, action) => {
      state.resturant.menu = Object.entries(action.payload.menu);
    },
  },
});
export const { setResturant, setMenu } = resturantSlice.actions;
export default resturantSlice.reducer;
