import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const INVALID_LOGIN = 'INVALID_LOGIN'
export const RECEIVE_USER = 'RECEIVE_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export function requestLogin () {
  return {
    type: REQUEST_LOGIN
  }
}

export function responseLogin (user) {
  return {
    type: RESPONSE_LOGIN,
    user
  }
}

export function invalidLogin () {
  return {
    type: INVALID_LOGIN
  }
}

export function receiveUser (user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function setToken (value = '') {
  return {
    type: SET_TOKEN,
    payload: value
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export function login (creds) {
  return (dispatch, getState) => {
    dispatch(requestLogin())
    return fetch(`${__API_URL__}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setToken(json.token))
        dispatch(push('/'))
        return fetch(`${__API_URL__}/users?email=${creds.username}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${json.token}`
          }
        })
      })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveUser(json[0]))
      })
      .catch(() => {
        return dispatch(invalidLogin())
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_LOGIN]: (state) => {
    return Object.assign({}, state, {
      isLoggingIn: true
    })
  },
  [RESPONSE_LOGIN]: (state, action) => {
    return Object.assign({}, state, {
      isLoggingIn: false
    })
  },
  [INVALID_LOGIN]: (state) => {
    return Object.assign({}, state, {
      isLoggingIn: false
    })
  },
  [RECEIVE_USER]: (state, action) => {
    return Object.assign({}, state, {
      user: action.user
    })
  },
  [SET_TOKEN]: (state, action) => {
    return Object.assign({}, state, {
      token: action.payload
    })
  },
  [LOGOUT]: (state, action) => {
    return initialState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: '',
  user: {}
}

export default function user (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
