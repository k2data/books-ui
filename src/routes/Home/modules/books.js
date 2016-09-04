import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'

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

export function fetchBooks (id) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(requestBooks())
    return fetch(`${__API_URL__}/books`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.Error) {
          dispatch(invalidBooks(json))
          return dispatch(push('/login'))
        } else {
          return dispatch(receiveBooks(json))
        }
      })
      .catch(() => {
        console.log('unexpected error!!!')
      })
  }
}

export function removeBook (id) {
  return (dispatch, getState) => {
    return fetch(`${__API_URL__}/books/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE2Mzg1NjgsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTU5NTM2OH0.tw0FVHQnrv6pzGqp__JcZTs-PKUcuwlDi3ZTy3mLbNo'}
    }).then((res) => {
      console.log(res)
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
