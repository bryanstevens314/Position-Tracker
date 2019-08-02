import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const SAVED_POSITION = 'SAVED_POSITION'
const CREATED_POSITION = 'CREATED_POSITION'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const createdPosition = position => ({type: CREATED_POSITION, position})
const savedPosition = position => ({type: SAVED_POSITION, position})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const savePosition = position => async dispatch => {
  try {
    res = await axios.post('api/positions', position)
    if (res.data) {
      dispatch(savedPosition(res.data))
      //history.push('/home')
    }
  } catch (err) {
    console.log(err)
  }
}
export const createPosition = position => dispatch => {
  try {
    dispatch(createdPosition(position))
    history.push('/robinhood')
  } catch (err) {
    console.log(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/robinhood')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      if (!action.user.positions) {
        const user = action.user
        user.positions = []
        return user
      }
      return action.user
    case CREATED_POSITION:
      const user = {...state, positions: [action.position, ...state.positions]}
      return user
    case SAVED_POSITION:
      const savedPositions = state.positions
      savedPositions[0] = action.position
      return {...state, positions: savedPositions}
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
