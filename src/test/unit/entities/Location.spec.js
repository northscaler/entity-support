/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const { UsStreetAddress } = require('../../../main/entities/Location')

describe('unit tests of Location', function () {
  it('should format addresses correctly', function () {
    const addr = new UsStreetAddress({
      streetNumber: '1',
      streetName: 'Mulberry',
      streetType: 'St.',
      streetNameDirectionPrefix: 'NW',
      compartmentType: 'Ste.',
      compartmentId: '100A',
      city: 'Metroville',
      state: 'TX',
      zip: '78737',
      zipPlus4: '4321'
    })

    expect(addr.toString()).to.equal(
      '1 NW Mulberry St., Ste. 100A\nMetroville, TX 78737-4321'
    )
  })
})
