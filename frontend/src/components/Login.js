import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'
// import grocery from '../reducers/grocery'

import { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  // const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
     // redirect user to '/' path
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
      e.preventDefault()

      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      }

      fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            batch(() => { //makes all actions happen at same time
              dispatch(user.actions.setUsername(data.username))
              dispatch(user.actions.setAccessToken(data.accessToken))
              dispatch(user.actions.setErrors(null))

              localStorage.setItem('user', JSON.stringify({
                username: data.username,
                accessToken: data.accessToken
              }) )
            })
          } else {
              dispatch(user.actions.setErrors(data))
          }
        })
        .catch()
  } 
  return (
    <form className="form-container" onSubmit={onFormSubmit}>
      <div className="input-container">
        <input 
          className="input"
          placeholder="username"
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className="input"
          placeholder="password"
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button 
          className="signin-button"
          type="submit" 
          onClick={() => setMode('signin')}
        > 
          Sign In
        </button>
        <button 
        className="signup-button"
          type="submit" 
          onClick={() => setMode('signup')}
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default Login