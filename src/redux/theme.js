import { createSlice } from "@reduxjs/toolkit";

const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: themeFromLocalStorage ? themeFromLocalStorage : "light",
    },
    reducers: {
      toggleTheme: (state, action) => {
        state.theme = action.payload;
        localStorage.setItem("theme", JSON.stringify(state.theme));
      },
  
      storeTheme: (state) => {
        localStorage.setItem("theme", JSON.stringify(state.theme));
      },
    },
});
export const { toggleTheme, storeTheme } = themeSlice.actions;

export default themeSlice.reducer;