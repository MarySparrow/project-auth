import { createSlice } from '@reduxjs/toolkit'

//data from model in BE
const user = createSlice({
  name: 'user',
  initialState: {
    username: null, 
    accessToken: null, 
    errors: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    }, 
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    }, 
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user