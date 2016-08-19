import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_BOOK = 'REQUEST_BOOK'
export const RECEIVE_BOOK = 'RECEIVE_BOOK'
export const FETCH_BOOK = 'FETCH_BOOK'

// ------------------------------------
// Actions
// ------------------------------------
export function requestBook () {
  return {
    type: REQUEST_BOOK
  }
}

export function receiveBook (data) {
  return {
    type: RECEIVE_BOOK,
    data
  }
}

export function fetchBook (id) {
  return (dispatch, getState) => {
    dispatch(requestBook())
    return fetch(`http://10.1.10.17:18080/books/${id}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE0NzE0NjM4NDQsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTQ3' +
        'MTQyMDY0NH0.A721xVtnqAUQ-2Ws-yCAVEZpGw2pEom3UghkDZqr9p0'
      }})
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        return dispatch(receiveBook(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_BOOK]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [RECEIVE_BOOK]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      book: action.data
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  book: {}
}

export default function bookShow (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
