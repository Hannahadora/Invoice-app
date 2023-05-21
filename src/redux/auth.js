import { createSlice } from "@reduxjs/toolkit";
import authApi from "../utils/axios";

import { toast } from 'react-toastify'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: null,
    },
    reducers: {
        registerUser: (state, action) => {
            authApi
                .post('/register', { ...action.payload })
                .then((response) => {
                    console.log("rexx", response)
                    toast.success(response?.data?.message)
                    return response
                })
                .catch((error) => {
                    toast.error(error.response?.data?.error || "Error");
                });
        },
        loginUser: (state, action) => {
            authApi.post('/login', { ...action.payload })
                .then((response) => {
                    state.account = response.data;
                    toast.success("Login Successfully")
                })
                .catch((error) => {
                    toast.error(error.response?.data?.error);
                });
        }
    },
});
export const { registerUser, loginUser } = authSlice.actions;

export default authSlice.reducer;