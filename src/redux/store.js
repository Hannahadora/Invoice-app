import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './users'
import invoicesSlice from './invoices'

export default configureStore({
    reducer: {
        users: usersReducer,
        invoices: invoicesSlice
    }
})
