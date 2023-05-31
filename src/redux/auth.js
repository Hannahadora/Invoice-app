import { createSlice } from "@reduxjs/toolkit";
import authApi from "../utils/axios";
import { toast } from 'react-toastify'

const userData = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: userData ? userData : null,
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
                    localStorage.setItem("user", JSON.stringify(state.account))
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