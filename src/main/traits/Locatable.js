const { Trait } = require('@northscaler/mutrait')
const property = require('@northscaler/property-decorator')

/**
 * Imparts a `location` property with backing property `_location`.
 */
const Locatable = Trait(
  superclass =>
    class extends superclass {
      @property()
      _location
    }
)

module.exports = Locatable
