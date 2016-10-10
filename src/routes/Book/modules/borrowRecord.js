import fetch from 'isomorphic-fetch'
import update from 'react-addons-update'
import { queryParams2Str } from 'store/utils/fetch'
// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_BR = 'REQUEST_BR'
export const RECEIVE_BR = 'RECEIVE_BR'
export const INVALID_BR = 'INVALID_BR'

export const REQUEST_BRS = 'REQUEST_BRS'
export const RECEIVE_BRS = 'RECEIVE_BRS'
export const INVALID_BRS = 'INVALID_BRS'
export const CLEAR_BRS = 'CLEAR_BRS'

// ------------------------------------
// Actions
// ------------------------------------
export function requestBR () {
  return {
    type: REQUEST_BR
  }
}

export function invalidBR () {
  return {
    type: INVALID_BR
  }
}

export function receiveBR (data) {
  return {
    type: RECEIVE_BR,
    data
  }
}

export function fetchBR (id) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(requestBR())
    return fetch(`${__API_URL__}/borrow-records/${id}`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      }})
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        return dispatch(receiveBR(json))
      })
  }
}

export function requestBRs () {
  return {
    type: REQUEST_BRS
  }
}

export function invalidBRs () {
  return {
    type: INVALID_BRS
  }
}

export function receiveBRs (data) {
  return {
    type: RECEIVE_BRS,
    data
  }
}

export function clearBRs () {
  return {
    type: CLEAR_BRS
  }
}

export function fetchBRs (params) {
  return (dispatch, getState) => {
    const state = getState()
    const paramsStr = queryParams2Str(params)
    console.log(paramsStr)
    dispatch(requestBRs())
    return fetch(`${__API_URL__}/borrow-records?${paramsStr}`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`
      }})
      .then((res) => res.json())
      .then((json) => {
        console.log('hello:', json.length)
        return dispatch(receiveBRs(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_BR]: (state, action) => {
    return update(state, {
      current: { isFetching: { $set: true } }
    })
  },
  [INVALID_BR]: (state, action) => {
    return update(state, {
      current: {
        isFetching: { $set: false },
        data: { $set: {} }
      }
    })
  },
  [RECEIVE_BR]: (state, action) => {
    return update(state, {
      current: {
        isFetching: { $set: true },
        data: { $set: action.data }
      }
    })
  },
  [REQUEST_BRS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [INVALID_BRS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: []
    })
  },
  [RECEIVE_BRS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data
    })
  },
  [CLEAR_BRS]: (state, action) => {
    return initialState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  current: {}
}

export default function borrowRecords (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
