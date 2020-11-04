if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.common.pro.js')
} else {
  module.exports = require('./index.common.dev.js')
}
