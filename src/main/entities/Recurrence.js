'use strict'

const ALL_HOURS = Object.freeze(
  Array(24)
    .fill(0)
    .map((it, i) => i)
)
const ALL_MINUTES = Array(60)
  .fill(0)
  .map((it, i) => i)

const arrayify = it => {
  if (it === null || it === undefined) return it
  return Array.isArray(it) ? [...it] : [it]
}

class Recurrence {
  _minutes
  _hours
  _daysOfMonth
  _daysOfWeek // DayOfWeek[]
  _dayOfWeekCounts
  _months

  get minutes () {
    return this._minutes && [...this._minutes]
  }

  set minutes (value) {
    this._minutes = arrayify(value)
  }

  withMinutes (value) {
    this.minutes = value
    return this
  }

  get hours () {
    return this._hours && [...this._hours]
  }

  set hours (value) {
    this._hours = arrayify(value)
  }

  withHours (value) {
    this.hours = value
    return this
  }

  get daysOfMonth () {
    return this._daysOfMonth && [...this._daysOfMonth]
  }

  set daysOfMonth (value) {
    this._daysOfMonth = arrayify(value)
  }

  withDaysOfMonth (value) {
    this.daysOfMonth = value
    return this
  }

  get daysOfWeek () {
    return this._daysOfWeek && [...this._daysOfWeek]
  }

  set daysOfWeek (value) {
    this._daysOfWeek = arrayify(value)
  }

  withDaysOfWeek (value) {
    this.daysOfWeek = value
    return this
  }

  get dayOfWeekCounts () {
    return this._dayOfWeekCounts && [...this._dayOfWeekCounts]
  }

  set dayOfWeekCounts (value) {
    this._dayOfWeekCounts = arrayify(value)
  }

  withDayOfWeekCounts (value) {
    this.dayOfWeekCounts = value
    return this
  }

  get months () {
    return this._months && [...this._months]
  }

  set months (value) {
    this._months = arrayify(value)
  }

  withMonths (value) {
    this.months = value
    return this
  }

  _toRecurrify () {
    return Recurrence._toRecurrifyFormat(this)
  }

  static _toRecurrifyFormat (recurrence) {
    let daysOfWeek
    if (recurrence.daysOfWeek) {
      daysOfWeek = recurrence.daysOfWeek.map(day => day.ordinal)
    }
    const recurrences = {
      m:
        !recurrence.minutes && !recurrence.hours
          ? ALL_MINUTES
          : recurrence.minutes,
      h:
        !recurrence.minutes && !recurrence.hours ? ALL_HOURS : recurrence.hours,
      D: recurrence.daysOfMonth,
      dw: daysOfWeek,
      dc: recurrence.dayOfWeekCounts,
      M: recurrence.months
    }
    return Object.keys(recurrences).reduce((accum, it) => {
      if (recurrences[it] === null || recurrences[it] === undefined)
        delete recurrences[it]
      return accum
    }, recurrences)
  }
}

module.exports = Recurrence
