/**
 * Get OpenGraph data
 * @param {*} $ Cheerio instance
 * @param  {...string} keys NOT SANITIZED
 */
module.exports.og = ($, ...keys) => {
  for (const key of keys) {
    const meta = $(`meta[property="og:${key}"]`)
    if (!meta.length) continue
    return meta.first().attr('content')
  }
}

/**
 * Get array of all sites
 */
module.exports.sitesArray = () => {
  const fs = require('fs')
  const path = require('path')

  const files = fs.readdirSync(path.join(__dirname, 'sites'))

  return files.map(filename => {
    if (!filename.endsWith('.js')) return false
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
