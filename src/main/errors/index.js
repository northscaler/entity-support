'use strict'

const { CodedError } = require('@northscaler/error-support')

module.exports = {
  TreeCircularityError: CodedError({ name: 'TreeCircularityError' })
}
