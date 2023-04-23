import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './users'
import invoicesSlice from './invoices'
import themeSlice from './theme'
import authSlice from './auth'

export default configureStore({
    reducer: {
        users: usersReducer,
        invoices: invoicesSlice,
        theme: themeSlice,
        auth: authSlice
    }
})
