import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_TOKEN = 'UPDATE_TOKEN'

// ------------------------------------
// Actions
// ------------------------------------
export function updateToken (value = '') {
  return {
    type: UPDATE_TOKEN,
    payload: value
  }
}

export function fetchToken (creds) {
  return (dispatch, getState) => {
    return fetch(`${__API_URL__}/books`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then((res) => res.json(creds))
      .then((json) => {
        return dispatch(updateToken(json))
      })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_TOKEN]: (state, action) => {
    return Object.assign({}, state, {
      text: action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: ''
}

export default function login (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
