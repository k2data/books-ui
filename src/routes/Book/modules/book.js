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
    const state = getState()
    dispatch(requestBook())
    return fetch(`${__API_URL__}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      }})
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        return dispatch(receiveBook(json))
      })
  }
}

export function postBook (book) {
  return (dispatch, getState) => {
    const state = getState()
    console.log(book)

    return fetch(`${__API_URL__}/books`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.user.token}`
      },
      body: JSON.stringify(book)
    }).then((res) => {
      console.log(res)
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
  data: {}
}

export default function bookShow (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
