const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Kobo',
  URLs: [
    /^https?:\/\/[a-z]*\.kobobooks\.com\/(collections\/[a-z]*\/)?products\/.*$/i,
    /^https?:\/\/(www\.)?kobo\.com\/[a-z]*\/[a-z]*\/ebook\/.*$/i
  ],
  testCases: [
    {
      name: 'Kobo Forma',
      price: '249.99',
      image: 'https://cdn.shopify.com/s/files/1/0834/0561/products/Frost_pair_EN_grande.png?v=1578681274',
      url: 'https://us.kobobooks.com/products/kobo-forma?utm_source=Kobo&utm_medium=TopNav&utm_campaign=Forma'
    },
    {
      name: 'Kobo Libra H2O',
      price: '169.99',
      image: 'https://cdn.shopify.com/s/files/1/0834/0561/products/storm_Dual_EN_grande.jpg?v=1578681498',
      url: 'https://us.kobobooks.com/collections/all/products/kobo-libra-h2o'
    },
    {
      name: 'Blue Moon',
      price: '9.990',
      image: 'https://kbimages1-a.akamaihd.net/6fab4e8f-0515-435a-a461-d2984bf47234/1200/1200/False/blue-moon-94.jpg',
      url: 'https://www.kobo.com/us/en/ebook/blue-moon-94#'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())

    let name = $('.title.product-field').first().text().trim()
    if (!name) name = og($, 'title')

    const price = og($, 'price:amount', 'price')
    const image = og($, 'image:secure_url', 'image')

    return { name, price, image }
  }
}
