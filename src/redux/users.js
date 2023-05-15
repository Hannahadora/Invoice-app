import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [
            { id: "yuruq8392", name: "Anna Bella", email: "anna@email.com", role: "user" },
        ],
        selectedUser: null
    },
    reducers: {
        addUser: (state, action) => {
            state.users.push({ ...action.payload });
        },
        updateUser: (state, action) => {
            state.selectedUser = state.users.find((user) => user.id === action.payload.id);
            state.selectedUser = {...action.payload};
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload.id)
        },
        selectUser: (state, action) => {
            state.selectedUser = state.users.find(el => el.id === action.payload.id)
        }
    },
});
export const { addUser, updateUser, deleteUser, selectUser } = usersSlice.actions;

export default usersSlice.reducer;