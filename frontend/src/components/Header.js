import React from 'react' 
import { batch, useDispatch, useSelector } from 'react-redux'

import user from '../reducers/user'
import grocery from '../reducers/grocery'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
   
  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(grocery.actions.setGrocery([]))

      localStorage.removeItem('user')
    })
  }
  return (
    <>
    <header>
      {accessToken && <button onClick={onButtonClick}> Logout</button>}
    </header>
    </>
  )
}

export default Header