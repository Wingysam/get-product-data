const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Apple',
  URLs: [
    /^https?:\/\/(www\.)?apple\.com\/shop\/.*$/i
  ],
  testCases: [
    {
      name: 'Buy AirPods Max',
      price: '549 USD',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/og-airpods-max-202011?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1603996970000',
      url: 'https://www.apple.com/shop/buy-airpods/airpods-max'
    },
    {
      name: 'Buy iPhone 12 and iPhone 12 mini',
      price: '949 USD',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-og-202010?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601435256000',
      url: 'https://www.apple.com/shop/buy-iphone/iphone-12'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0 Waterfox/78.5.0'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const data = JSON.parse($('script[type="application/ld+json"]').first().html())
    console.log(data)

    const name = og($, 'title')

    const price = `${data.offers[0].price} ${data.offers[0].priceCurrency}`

    const image = og($, 'image')

    return { name, price, image }
  }
}
