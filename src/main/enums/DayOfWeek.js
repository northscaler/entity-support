'use strict'

const Enumeration = require('@northscaler/enum-support')

const DayOfWeek = Enumeration.new({
  name: 'DayOfWeek',
  values: [
    'LAST', // convenient 0 value matches recurrify's "last" concept and makes SUNDAY's ordinal equal to 1
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ]
})

DayOfWeek.prototype.next = function (count = 1) {
  if (this === DayOfWeek.LAST) return null
  let ordinal = (this.ordinal - 1 + count) % 7
  if (ordinal < 0) ordinal = ordinal + 7
  return DayOfWeek.of(ordinal + 1)
}

DayOfWeek.prototype.previous = function (count = 1) {
  return this.next(-count)
}

module.exports = DayOfWeek
