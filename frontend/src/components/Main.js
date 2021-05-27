import React, { useEffect} from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import grocery from '../reducers/grocery'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const groceryItems = useSelector(store => store.grocery.items)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }
    fetch(API_URL('grocery'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(grocery.actions.setGrocery(data.grocery))
            dispatch(grocery.actions.setErrors(null))
          })
        } else {
          dispatch(grocery.actions.setErrors(data))
        }
      }, [accessToken])
  })
  console.log(groceryItems)
  return (
    <div>
      <h1>Welcome to your Grocery shopping list</h1>
      <p>Add items:</p>
      <Link to="/login">To login</Link>
      {groceryItems.map(grocery => (
        <div key={grocery._id}>{grocery.message}</div>
      ))}
    </div>
  )
}

export default Main