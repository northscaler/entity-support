/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const TimeUnit = require('../../../main/enums/TimeUnit')

describe('unit tests of DayOfWeek', function () {
  it('should retrieve enum', () => {
    expect(TimeUnit.of('MINUTE')).to.equal(TimeUnit.MINUTE)
    expect(TimeUnit.of(6)).to.equal(TimeUnit.MINUTE)
  })

  it('should have correct key and ms properties', function () {
    expect(TimeUnit.MINUTE.key).to.equal('m')
    expect(TimeUnit.MINUTE.ms).to.equal(1000 * 60)
    expect(TimeUnit.HOUR.key).to.equal('h')
    expect(TimeUnit.HOUR.ms).to.equal(1000 * 60 * 60)
  })
})
