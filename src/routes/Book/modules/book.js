import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { fetchBooks } from 'routes/Home/modules/books'
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_BOOK = 'REQUEST_BOOK'
export const RECEIVE_BOOK = 'RECEIVE_BOOK'
export const INVALID_BOOK = 'INVALID_BOOK'
export const CLEAR_BOOK = 'CLEAR_BOOK'

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

export function clearBook () {
  return {
    type: CLEAR_BOOK
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
        if (json.Error) {
          return dispatch(push('/login'))
        }
        return dispatch(receiveBook(json))
      })
  }
}

export function postBook (book) {
  return (dispatch, getState) => {
    const { user: {token, user} } = getState()

    const ownedBook = Object.assign({}, book, {
      ownerID: user.id
    })

    return fetch(`${__API_URL__}/books`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ownedBook)
    }).then((res) => res.json())
      .then((json) => {
        if (json.Error) {
          return dispatch(push('/login'))
        }
        dispatch(fetchBooks())
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export function borrowBook () {
  return (dispatch, getState) => {
    const {user: { user, token }, book: { data: book }} = getState()
    return fetch(`${__API_URL__}/books/borrow`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({user, book})
    }).then((res) => res.json())
      .then((json) => {
        if (json.Error) {
          return dispatch(push('/login'))
        }
        return dispatch(receiveBook(json))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export function returnBook () {
  return (dispatch, getState) => {
    const {user: { user, token }, book: { data: book }} = getState()
    return fetch(`${__API_URL__}/books/return`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({user, book})
    }).then((res) => res.json())
      .then((json) => {
        if (json.Error) {
          return dispatch(push('/login'))
        }
        return dispatch(receiveBook(json))
      })
      .catch((e) => {
        console.log(e)
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
      data: action.data
    })
  },
  [CLEAR_BOOK]: (state, action) => {
    return Object.assign({}, state, initialState)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {}
}

export default function book (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
