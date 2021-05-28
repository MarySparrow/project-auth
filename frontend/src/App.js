import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import grocery from './reducers/grocery'

import Header from './components/Header'
import Login from './components/Login'
import Main from './components/Main'

const reducer = combineReducers({
  user: user.reducer,
  grocery: grocery.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
       <Switch>
        <Route exact path="/" component={Main}/>   
        <Route path="/login" component={Login}/>       
       </Switch>
       {/* <Footer /> */}
      </Provider>
    </BrowserRouter>
  )
}
