/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const DayOfWeek = require('../../../main/enums/DayOfWeek')
const Recurrence = require('../../../main/entities/Recurrence')

describe('unit tests of Recurrence', function () {
  it('should work', () => {
    const m = 30
    const minutes = [0, m]
    const hours = [9, 10, 11, 13, 14, 15]
    const daysOfWeek = [DayOfWeek.TUESDAY, DayOfWeek.THURSDAY]
    const months = 1
    const r = new Recurrence()
      .withMinutes(minutes)
      .withHours(hours)
      .withDaysOfWeek(daysOfWeek)
      .withMonths(months)

    expect(r._toRecurrify()).to.deep.equal({
      m: minutes,
      h: hours,
      dw: daysOfWeek.map(it => it.ordinal),
      M: [months]
    })

    r.months = null
    expect(r._toRecurrify()).to.deep.equal({
      m: minutes,
      h: hours,
      dw: daysOfWeek.map(it => it.ordinal)
    })

    minutes[1]++
    expect(r.minutes).to.deep.equal([minutes[0], m])
  })
})
