/**
 * 
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