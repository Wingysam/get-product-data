const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Example',
  URLs: [
    /^https?:\/\/(www\.)?store\.tld\/.*$/i
  ],
  testCases: [
    {
      name: '',
      price: '',
      image: '',
      url: ''
    },
    {
      name: '',
      price: '',
      image: '',
      url: ''
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('').first().text().trim()

    const price = $('').first().text().trim()

    const image = $('').first().attr('src')

    return { name, price, image }
  }
}
