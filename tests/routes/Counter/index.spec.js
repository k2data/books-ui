import BookShowRoute from 'routes/BookShow'

describe('(Route) BookShow', () => {
  let _route

  beforeEach(() => {
    _route = BookShowRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `counter`', () => {
    expect(_route.path).to.equal('counter')
  })

})
