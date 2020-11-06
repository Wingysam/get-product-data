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

    const $ = cheerio.load(await res.text())

    const name = $('').text().trim()

    const price = $('').text().trim()

    const image = $('').text().trim()

    return { name, price, image }
  }
}
