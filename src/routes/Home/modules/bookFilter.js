import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_FILTER_TEXT = 'UPDATE_FILTER_TEXT'
export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const FETCH_BOOKS = 'FETCH_BOOKS'
export const REMOVE_BOOK = 'REMOVE_BOOK'

// ------------------------------------
// Actions
// ------------------------------------
export function updateFilterText (value = '') {
  return {
    type: UPDATE_FILTER_TEXT,
    payload: value
  }
}

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

export function fetchBooks (id) {
  return (dispatch, getState) => {
    dispatch(requestBooks())
    return fetch(`${__API_URL__}/books`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE2Mzg1NjgsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTU5NTM2OH0.tw0FVHQnrv6pzGqp__JcZTs-PKUcuwlDi3ZTy3mLbNo'}
    })
      .then((res) => res.json())
      .then((json) => {
        return dispatch(receiveBooks(json))
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
  [UPDATE_FILTER_TEXT]: (state, action) => {
    return Object.assign({}, state, {
      text: action.payload
    })
  },
  [REQUEST_BOOKS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [RECEIVE_BOOKS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      books: action.data
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  text: '',
  books: []
}

export default function bookFilter (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
