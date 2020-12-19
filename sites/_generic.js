const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { metaFactory } = require('../util')

module.exports = {
  name: '_Generic',
  URLs: [
    /^.*$/i
  ],
  testCases: [
    {
      name: 'Glitter Bomb Wireframe Hoodie',
      price: '55.00 USD',
      image: 'http://cdn.shopify.com/s/files/1/0479/2693/5717/products/MARK-ROBER-GLITTER-BOMB-WIREFRAME-HOODIE3_grande.jpg?v=1604074494',
      url: 'https://markrober.store/products/glitter-bomb-wireframe-hoodie'
    },
    {
      name: 'LTT Northern Lights Desk Pad',
      price: '29.99 USD',
      image: 'http://cdn.shopify.com/s/files/1/0058/4538/5314/products/MousePadsOverhead-900x3001_1024x.jpg?v=1607732831',
      url: 'https://www.lttstore.com/products/deskpad'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const meta = metaFactory($)

    const name = meta('og:title')

    let price = meta('og:price')
    if (!price) {
      const amount = meta('og:price:amount', 'product:price:amount')
      const currency = meta('og:price:currency', 'product:price:currency')

      price = amount
      if (amount && currency) price += ` ${currency}`
    }

    const image = meta('og:image')

    return { name, price, image }
  }
}
