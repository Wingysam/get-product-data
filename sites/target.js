const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Target',
  URLs: [
    /^https:\/\/www\.target\.com\/p\/([a-z0-9-]*\/)?-\/A-\d*(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Disney Gift Card eGift (Email Delivery)',
      image: 'https://target.scene7.com/is/image/Target/GUEST_c7c77bed-608c-402d-83c1-0fe945f3157b',
      url: 'https://www.target.com/p/disney-gift-card-egift-email-delivery/-/A-54191074'
    },
    {
      name: 'Xbox One X 1 TB Console - Black',
      image: 'https://target.scene7.com/is/image/Target/GUEST_0a9f79ff-bf87-4c24-a34d-4a6a9f301309',
      url: 'https://www.TARGET.com/p/xbox-one-x/-/A-52637446'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())

    const name = $('[data-test="product-title"]').text()

    // TODO: implement price
    const price = undefined

    const image = 'https:' + og($, 'image')

    return { name, price, image }
  }
}
