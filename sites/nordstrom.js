const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Nordstrom',
  URLs: [
    /^https?:\/\/(www\.)?nordstrom\.com\/s\/.*$/i
  ],
  testCases: [
    {
      name: "Kiss Me With Kiehl's Full Size Lip Balm #1 Set",
      price: '$21.25',
      image: '',
      url: 'https://www.nordstrom.com/s/kiehls-since-1851-kiss-me-with-kiehls-full-size-lip-balm-1-set-usd-30-value/5690368?origin=category-personalizedsort&breadcrumb=Home%2FBeauty%2FHoliday%20Gifts%20%26%20Sets&color=none'
    },
    {
      name: 'Star Wars™ The Child Yoda Plush Toy',
      price: '$24.99',
      image: '',
      url: 'https://www.nordstrom.com/s/mattel-star-wars-the-child-yoda-plush-toy/5692872?origin=category-personalizedsort&breadcrumb=Home%2FHoliday%20Gifts%2FGifts%20for%20Kids%20%26%20Baby&color=asst'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        Host: 'www.nordstrom.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        DNT: '1',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    console.log(html)
    const $ = cheerio.load(html)

    const name = $('h1[itemprop="name"]').first().text().trim()

    const price = $('#current-price-string').first().text().trim()

    const image = og($, 'image')

    return { name, price, image }
  }
}
