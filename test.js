var should = chai.should()

import { Content } from './hexagon-react.jsx'

describe('hexagon-react', function () {
  it('should do something', () => {
    Content.should.be.a.function()
  })

  it('should do something 2', () => {
    Content()
  })
})
