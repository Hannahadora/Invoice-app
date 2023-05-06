import { createSlice } from "@reduxjs/toolkit";
import invoiceData from "../assets/db.json";

const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices: invoiceData,
        selectedInvoice: null,
    },
    reducers: {
        addInvoice: (state, action) => {
            state.invoices.unshift({ ...action.payload });
        },
        updateInvoice: (state, action) => {
            state.selectedInvoice = state.invoices.find((el) => el.id === action.payload.id);
            state.selectedInvoice = {...action.payload};
        },
        markInvoiceAsPaid: (state, action) => {
            state.selectedInvoice = state.invoices.find((el) => el.id === action.payload.id);
            state.selectedInvoice.statusText = action.payload.status;
        },
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter((el) => el.id !== action.payload.id)
        },
        selectInvoice: (state, action) => {
            state.selectedInvoice = state.invoices.find(el => el.id === action.payload.id)
        }
    },
});
export const { addInvoice, updateInvoice, markInvoiceAsPaid, deleteInvoice, selectInvoice } = invoicesSlice.actions;

export default invoicesSlice.reducer;