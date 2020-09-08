'use strict'

const { Trait } = require('@northscaler/mutrait')
const property = require('@northscaler/property-decorator')
const { IllegalArgumentError } = require('@northscaler/error-support')
const { Gps } = require('../entities/Location')

/**
 * Imparts a `gps` property with backing property `_gps` supporting {@link GpsCoordinate}.
 */
const HasGps = Trait(superclass =>
  class extends superclass {
    @property()
    _gps

    _testSetGps (gps) {
      if (!(gps instanceof Gps)) {
        throw new IllegalArgumentError({ message: 'Gps required', info: { gps } })
      }
      return gps.clone()
    }
  }
)

module.exports = HasGps
