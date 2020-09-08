'use strict'

const { Trait } = require('@northscaler/mutrait')
const property = require('@northscaler/property-decorator')
const { IllegalArgumentError } = require('@northscaler/error-support')
const { StreetAddress } = require('../entities/Location')

/**
 * Imparts a `streetAddress` property with backing property `_streetAddress` supporting {@link StreetAddress}.
 */
const HasStreetAddress = Trait(superclass =>
  class extends superclass {
    @property()
    _streetAddress

    _testSetStreetAddress (streetAddress) {
      if (streetAddress && !(streetAddress instanceof StreetAddress)) {
        throw new IllegalArgumentError({ message: 'StreetAddress required', info: { streetAddress } })
      }
      return streetAddress.clone()
    }
  }
)

module.exports = HasStreetAddress
