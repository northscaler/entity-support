const { Trait } = require('@northscaler/mutrait')
const property = require('@northscaler/property-decorator')

/**
 * Imparts a `description` property with backing property `_description`.
 */
const Describable = Trait(
  superclass =>
    class extends superclass {
      @property()
      _description
    }
)

module.exports = Describable
