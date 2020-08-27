/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const DayOfWeek = require('../../../main/enums/DayOfWeek')

describe('unit tests of DayOfWeek', function () {
  it('should calculate next & prev correctly', () => {
    expect(DayOfWeek.LAST.next()).to.be.equal(null)
    expect(DayOfWeek.LAST.previous()).to.be.equal(null)
    expect(DayOfWeek.LAST.next(2)).to.be.equal(null)
    expect(DayOfWeek.LAST.previous(2)).to.be.equal(null)

    expect(DayOfWeek.SUNDAY.next(0)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.MONDAY.next(0)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.TUESDAY.next(0)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.WEDNESDAY.next(0)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.THURSDAY.next(0)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.FRIDAY.next(0)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.SATURDAY.next(0)).to.be.equal(DayOfWeek.SATURDAY)

    expect(DayOfWeek.SUNDAY.next()).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.MONDAY.next()).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.TUESDAY.next()).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.WEDNESDAY.next()).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.THURSDAY.next()).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.FRIDAY.next()).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.SATURDAY.next()).to.be.equal(DayOfWeek.SUNDAY)

    expect(DayOfWeek.SUNDAY.next(2)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.MONDAY.next(2)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.TUESDAY.next(2)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.WEDNESDAY.next(2)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.THURSDAY.next(2)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.FRIDAY.next(2)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.SATURDAY.next(2)).to.be.equal(DayOfWeek.MONDAY)

    expect(DayOfWeek.SUNDAY.previous()).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.MONDAY.previous()).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.TUESDAY.previous()).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.WEDNESDAY.previous()).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.THURSDAY.previous()).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.FRIDAY.previous()).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.SATURDAY.previous()).to.be.equal(DayOfWeek.FRIDAY)

    expect(DayOfWeek.SUNDAY.previous(2)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.MONDAY.previous(2)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.TUESDAY.previous(2)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.WEDNESDAY.previous(2)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.THURSDAY.previous(2)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.FRIDAY.previous(2)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.SATURDAY.previous(2)).to.be.equal(DayOfWeek.THURSDAY)

    expect(DayOfWeek.SUNDAY.next(7)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.MONDAY.next(7)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.TUESDAY.next(7)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.WEDNESDAY.next(7)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.THURSDAY.next(7)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.FRIDAY.next(7)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.SATURDAY.next(7)).to.be.equal(DayOfWeek.SATURDAY)

    expect(DayOfWeek.SUNDAY.next(8)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.MONDAY.next(8)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.TUESDAY.next(8)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.WEDNESDAY.next(8)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.THURSDAY.next(8)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.FRIDAY.next(8)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.SATURDAY.next(8)).to.be.equal(DayOfWeek.SUNDAY)

    expect(DayOfWeek.SUNDAY.next(9)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.MONDAY.next(9)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.TUESDAY.next(9)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.WEDNESDAY.next(9)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.THURSDAY.next(9)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.FRIDAY.next(9)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.SATURDAY.next(9)).to.be.equal(DayOfWeek.MONDAY)

    expect(DayOfWeek.SUNDAY.previous(8)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.MONDAY.previous(8)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.TUESDAY.previous(8)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.WEDNESDAY.previous(8)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.THURSDAY.previous(8)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.FRIDAY.previous(8)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.SATURDAY.previous(8)).to.be.equal(DayOfWeek.FRIDAY)

    expect(DayOfWeek.SUNDAY.previous(9)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.MONDAY.previous(9)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.TUESDAY.previous(9)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.WEDNESDAY.previous(9)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.THURSDAY.previous(9)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.FRIDAY.previous(9)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.SATURDAY.previous(9)).to.be.equal(DayOfWeek.THURSDAY)
  })

  it('should retrieve enum', () => {
    expect(DayOfWeek.of('MONDAY')).to.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.of(2)).to.equal(DayOfWeek.MONDAY)
  })
  it('should fail to retrieve unknown enum', () => {
    expect(() => DayOfWeek.of('BOGUS')).to.throw(DayOfWeek.$ERROR$)
  })
})
