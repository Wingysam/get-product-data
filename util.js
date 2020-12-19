/**
 * Create meta tag grabber
 * @param {*} $ Cheerio instance
 * @returns {Function} meta tag grabber
 */
module.exports.metaFactory = $ => {
  /**
   * Searches for meta tags with property names
   * @param  {...string} properties Properties to search for
   */
  function meta (...properties) {
    for (const key of properties) {
      const meta = $(`meta[property="${key}"]`)
      if (!meta.length) continue
      return meta.first().attr('content')
    }
  }

  return meta
}

/**
 * Get OpenGraph data
 * @param {*} $ Cheerio instance
 * @param  {...string} keys NOT SANITIZED
 */
module.exports.og = ($, ...keys) => {
  return this.metaFactory($)(
    ...keys.map(key => 'og:' + key)
  )
}

/**
 * Get array of all sites
 */
module.exports.sitesArray = () => {
  const fs = require('fs')
  const path = require('path')

  const files = fs.readdirSync(path.join(__dirname, 'sites'))

  return files.map(filename => {
    if (!filename.endsWith('.js') || filename.startsWith('_')) return false
    return require(
      path.join(
        __dirname,
        'sites',
        filename
      )
    )
  })
    .filter(file => file)
}
