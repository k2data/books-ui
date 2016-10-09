export function queryParams2Str (params = {}) {
  return Object
    .entries(params)
    .map((param) => `${param[0]}=${param[1]}`)
    .join('&')
}
