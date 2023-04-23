import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: null,
    },
    reducers: {
        registerUser: (state, action) => {
            state.account.push({ ...action.payload });
        },
        loginUser: (state, action) => {
        state.account.find((user) => user.id === action.payload.id);
        }
    },
});
export const { registerUser, loginUser } = authSlice.actions;

export default authSlice.reducer;