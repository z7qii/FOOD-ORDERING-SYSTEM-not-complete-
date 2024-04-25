import { configureStore } from "@reduxjs/toolkit";
import user from "./states/user";
import resturant from "./states/resturant";
export const store = configureStore({
  reducer: {
    user: user,
    resturant: resturant,
  },
});
