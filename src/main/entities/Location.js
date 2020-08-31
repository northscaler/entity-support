'use strict'

const property = require('@northscaler/property-decorator')
const {
  IllegalArgumentError,
  MissingRequiredArgumentError,
  MethodNotImplementedError
} = require('@northscaler/error-support')
const CardinalDirection = require('../enums/CardinalDirection')

class Parallel {
  @property()
  _degrees

  @property()
  _max

  constructor (degrees, max = 180) {
    this.degrees = degrees
    this.max = max
  }

  get minutes () {
    return Math.abs((this.degrees - parseInt(this.degrees)) * 60)
  }

  get seconds () {
    const minutes = this.minutes
    return Math.abs((minutes - parseInt(minutes)) * 60)
  }

  get direction () {
    throw new MethodNotImplementedError({ info: 'get direction' })
  }

  _testSetDegrees (degrees) {
    degrees = parseFloat(degrees)
    if (isNaN(degrees) || degrees < -this.max || degrees > this.max)
      throw new IllegalArgumentError({
        info: 'degrees',
        message: `only between -${this.max} and ${this.max} inclusive allowed`
      })
    return degrees
  }

  toString (format) {
    switch (
      (format || '')
        .toString()
        .trim()
        .toLowerCase()
    ) {
      case 'dd': // unsigned degrees plus direction
        return `${Math.abs(this.degrees)}\xB0${this.direction.name}`
      case 'd': // signed decimal degrees
        return `${this.degrees}\xB0`
      case 'dms': // signed degrees, minute, seconds
        return `${this.degrees}\xB0${parseInt(this.minutes)}'${this.seconds}"`
      default:
        // unsigned degrees, minutes, seconds plus direction
        return `${Math.abs(this.degrees)}\xB0${parseInt(this.minutes)}'${
          this.seconds
        }"${this.direction.name}`
    }
  }
}

class Longitude extends Parallel {
  get direction () {
    return this.degrees >= 0 ? CardinalDirection.E : CardinalDirection.W
  }
}

class Latitude extends Parallel {
  get direction () {
    return this.degrees >= 0 ? CardinalDirection.N : CardinalDirection.S
  }
}

class GpsCoordinate {
  @property()
  _lat

  @property()
  _lon

  constructor ({ lat, lon }) {
    this.lat = lat
    this.lon = lon
  }

  toString (format) {
    return `${this.lat.toString(format)} ${this.lon.toString(format)}`
  }
}

class StreetAddress {
  // inspired by https://stackoverflow.com/questions/1159756/how-should-international-geographical-addresses-be-stored-in-a-relational-databa

  @property()
  _streetNumber // 123, ...

  @property()
  _buildingName // some addresses have building names instead of street numbers

  @property()
  _streetNumberSuffix // A, ½, etc

  @property()
  _streetDirectionPrefix // N, SW, etc

  @property()
  _streetName // Mulberry, ...

  @property()
  _streetType // boulevard, street, place, lane, etc

  @property()
  _streetDirectionSuffix // N, SW, etc

  @property()
  _compartmentType // po box, apartment, floor, suite, etc

  @property()
  _compartmentId // 123, 1A, etc

  @property()
  _localMunicipality // if appears in address before the city

  @property()
  _city // Metroville, ...

  @property()
  _governingDistrict // state in US, province in CA, distrito federal ein MX, ...

  @property()
  _postalCode // 34213 in US, ...

  @property()
  _postalCodeSuffix // US plus-four, ...

  @property()
  _country // US, CA, MX, ... (also determines formatted rendering)
}

class UsStreetAddress extends StreetAddress {
  constructor ({
    streetNumber, // 123
    streetNumberSuffix, // A, ½, ...
    streetDirectionPrefix, // N, SW, ...
    streetName, // Mulberry
    streetDirectionSuffix, // N, SW, ...
    streetType, // St, Ave, Blvd, ...
    streetTypeDirectionSuffix, // N, SW, ...
    compartmentType, // Suite, Apartment, ...
    compartmentId, // 1A, 200, ...
    city, // Metroville
    state, // TX
    zip, // 12345
    zipPlus4 // 4321
  }) {
    super()

    this.streetNumber = streetNumber
    this.streetDirectionPrefix = streetDirectionPrefix
    this.streetNumberSuffix = streetNumberSuffix
    this.streetName = streetName
    this.streetDirectionSuffix = streetDirectionSuffix
    this.streetType = streetType
    this.streetTypeDirectionSuffix = streetTypeDirectionSuffix
    this.compartmentType = compartmentType
    this.compartmentId = compartmentId
    this.city = city
    this.governingDistrict = state
    this.postalCode = zip
    this.postalCodeSuffix = zipPlus4
    this.country = 'US'
  }

  _testSetStreetNumber (it) {
    if (!it) throw new MissingRequiredArgumentError({ info: 'streetNumber' })
    return it
  }

  _testSetStreetName (it) {
    if (!it) throw new MissingRequiredArgumentError({ info: 'streetName' })
    return it
  }

  _testSetCity (it) {
    if (!it) throw new MissingRequiredArgumentError({ info: 'city' })
    return it
  }

  _testSetGoverningDistrict (it) {
    if (!it) throw new MissingRequiredArgumentError({ info: 'state' })
    if (!/^[A-Z]{2}$/.test('' + it))
      throw new IllegalArgumentError({
        info: 'state',
        message: 'must be two upper case chars'
      })
    return it
  }

  _testSetPostalCode (it) {
    if (!it) throw new MissingRequiredArgumentError({ info: 'zip' })
    if (!/^[0-9]{5}$/.test(it))
      throw new IllegalArgumentError({
        info: 'zip',
        message: 'must be five digits'
      })
    return it
  }

  _testSetPostalCodeSuffix (it) {
    if (it && !/^[0-9]{4}$/.test(it))
      throw new IllegalArgumentError({
        info: 'zipPlus4',
        message: 'must be four digits'
      })
    return it
  }

  _checkDirection (it, property) {
    if (!it) return it
    if (!/^(N|S|E|W|NW|NE|SW|SE)$/.test(it))
      throw new IllegalArgumentError({ info: property })
  }

  _testSetStreetDirectionPrefix (it) {
    this._checkDirection(it, 'streetDirectionPrefix')
    return it
  }

  _testSetStreetDirectionSuffix (it) {
    this._checkDirection(it, 'streetDirectionSuffix')
    return it
  }

  _testSetStreetTypeDirectionSuffix (it) {
    this._checkDirection(it, 'streetTypeDirectionSuffix')
    return it
  }

  toString ({
    lineSeparator = '\n',
    compartmentSeparator = ', ',
    cityStateSeparator = ', ',
    stateZipSeparator = ' ',
    zipPlus4Separator = '-'
  } = {}) {
    let it = `${this.streetNumber}`
    if (this.streetNumberSuffix) it += this.streetNumberSuffix
    if (this.streetDirectionPrefix) it += ` ${this.streetDirectionPrefix}`
    it += ` ${this.streetName}`
    if (this.streetDirectionSuffix) it += ` ${this.streetDirectionSuffix}`
    if (this.streetType) it += ` ${this.streetType}`
    if (this.streetTypeDirectionSuffix)
      it += ` ${this.streetTypeDirectionSuffix}`
    if (this.compartmentType)
      it += `${compartmentSeparator}${this.compartmentType} ${this.compartmentId}`
    it += lineSeparator
    it += `${this.city}${cityStateSeparator}${this.governingDistrict}${stateZipSeparator}${this.postalCode}`
    if (this.postalCodeSuffix)
      it += `${zipPlus4Separator}${this.postalCodeSuffix}`

    return it
  }
}

module.exports = {
  Longitude,
  Latitude,
  GpsCoordinate,
  StreetAddress,
  UsStreetAddress,
  Parallel
}
