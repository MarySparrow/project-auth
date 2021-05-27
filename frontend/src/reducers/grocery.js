import { createSlice } from '@reduxjs/toolkit'

const grocery = createSlice({
    name: 'grocery',
    initialState: {
        items: [],
        errors: null
    },
    reducers: {
        setGrocery: (store, action) => {
            store.items = action.payload;
        },
        setErrors: (store, action) => {
            store.errors = action.payload;
        }
    }
})

export default grocery