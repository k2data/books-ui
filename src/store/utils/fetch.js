export function queryParams2Str (params = {}) {
  return Object
    .entries(params)
    .map((param) => `${param[0]}=${param[1]}`)
    .join('&')
}

export function filter2QueryStr (filter, user) {
  let queryParams = {}
  const { owned, borrowed } = filter

  if (owned) {
    queryParams.ownerID = user.id
  }

  if (borrowed) {
    queryParams.borrowerID = user.id
  }

  return queryParams2Str(queryParams)
}
