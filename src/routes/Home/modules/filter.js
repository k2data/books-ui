export const UPDATE_FILTER_TEXT = 'UPDATE_FILTER_TEXT'

export function updateFilterText (value = '') {
  return {
    type: UPDATE_FILTER_TEXT,
    value
  }
}

const ACTION_HANDLERS = {
  [UPDATE_FILTER_TEXT]: (state, action) => {
    return Object.assign({}, state, {
      text: action.value
    })
  }
}
const initialState = {
  text: ''
}

export default function filter (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
