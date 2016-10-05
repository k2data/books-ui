import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const FETCH_BOOKS = 'FETCH_BOOKS'
export const INVALID_BOOKS = 'INVALID_BOOKS'
export const REMOVE_BOOK = 'REMOVE_BOOK'

// ------------------------------------
// Actions
// ------------------------------------

export function requestBooks () {
  return {
    type: REQUEST_BOOKS
  }
}

export function receiveBooks (data) {
  return {
    type: RECEIVE_BOOKS,
    data
  }
}

export function invalidBooks (error) {
  return {
    type: INVALID_BOOKS,
    error
  }
}

export function removeBookLocal (id) {
  return {
    type: REMOVE_BOOK,
    id
  }
}

export function fetchBooks (id) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(requestBooks())
    return fetch(`${__API_URL__}/books`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      } })
      .then((res) => res.json())
      .then((json) => {
        if (json.Error) {
          dispatch(invalidBooks(json))
          return dispatch(push('/login'))
        } else {
          return dispatch(receiveBooks(json))
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export function removeBook (id) {
  return (dispatch, getState) => {
    const state = getState()
    return fetch(`${__API_URL__}/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${state.user.token}` }
    }).then((res) => {
      if (res.ok) {
        console.log('dispatch!!')
        dispatch(removeBookLocal(id))
        return {}
      } else {
        return res.json()
      }
    }).then((json) => {
      console.log(json)
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_BOOKS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [RECEIVE_BOOKS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data
    })
  },
  [INVALID_BOOKS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error,
      data: []
    })
  },
  [REMOVE_BOOK]: (state, action) => {
    return Object.assign({}, state, {
      data: R.filter((book) => book.id !== action.id, state.data)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: []
}

export default function books (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
