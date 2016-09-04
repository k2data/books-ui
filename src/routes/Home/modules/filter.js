export const UPDATE_FILTER_TEXT = 'UPDATE_FILTER_TEXT'
export const FILTER_OWNED = 'FILTER_OWNED'
export const FILTER_BORROWED = 'FILTER_BORROWED'
export const SHOW_DELETE_BUTTON = 'SHOW_DELETE_BUTTON'

export function updateFilterText (value = '') {
  return {
    type: UPDATE_FILTER_TEXT,
    value
  }
}

export function filterOwned (value) {
  return {
    type: FILTER_OWNED,
    value
  }
}

export function filterBorrowed (value) {
  return {
    type: FILTER_BORROWED,
    value
  }
}

export function showDeleteButton (value) {
  return {
    type: SHOW_DELETE_BUTTON,
    value
  }
}

export const actions = {
  updateFilterText, filterOwned, filterBorrowed, showDeleteButton
}

const ACTION_HANDLERS = {
  [UPDATE_FILTER_TEXT]: (state, action) => {
    return Object.assign({}, state, {
      text: action.value
    })
  },
  [FILTER_OWNED]: (state, action) => {
    return Object.assign({}, state, {
      owned: action.value
    })
  },
  [FILTER_BORROWED]: (state, action) => {
    return Object.assign({}, state, {
      borrowed: action.value
    })
  },
  [SHOW_DELETE_BUTTON]: (state, action) => {
    return Object.assign({}, state, {
      showDeleteBtn: action.value
    })
  }
}

const initialState = {
  text: '',
  owned: false,
  borrowed: false,
  showDeleteBtn: false
}

export default function filter (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
