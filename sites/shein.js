const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { metaFactory } = require('../util')

module.exports = {
  name: 'Shein',
  URLs: [
    /^https?:\/\/(www\.)?([a-z]{2}\.)?shein\.com\/.*-p-\d+(-cat-\d+)?\.html(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'SHEIN Manfinity Homme Men Solid Color Basic Turndown Collar Front Button Short Sleeve Simple Polo Shirt, Casual Everyday Wear For Husband For Going Out',
      price: '$13.49',
      image: 'https://img.ltwebstatic.com/images3_pi/2024/06/07/27/17177785943f6cea5ee00ba54f7aabb9b3a94f6fe6_thumbnail_720x.webp',
      url: 'https://us.shein.com/Manfinity-Homme-Men-Solid-Color-Basic-Turndown-Collar-Front-Button-Short-Sleeve-Simple-Polo-Shirt-Casual-Everyday-Wear-For-Husband-For-Going-Out-p-39232859.html'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const meta = metaFactory($)

    let name = meta('og:title')
    if (!name) name = $('h1.product-intro__head-name').first().text().trim()

    let price = meta('og:price:amount', 'product:price:amount')
    if (!price) price = meta('product:price')
    const currency = meta('og:price:currency', 'product:price:currency')
    if (price && currency) price = `${currency}${price}`
    else if (price && !price.startsWith('$') && !price.startsWith('€') && !price.startsWith('£')) price = `$${price}`

    let image = meta('og:image')
    if (!image) image = $('meta[property="og:image"]').attr('content')

    return { name, price, image }
  }
}
