const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Bergdorf Goodman',
  URLs: [
    /^https?:\/\/(www\.)?bergdorfgoodman\.com\/p\/.*$/i
  ],
  testCases: [
    {
      name: 'Versace Oversized Square Acetate Sunglasses',
      price: '303.00',
      image: 'https://images.bergdorfgoodman.com/ca/3/product_assets/D/3/V/T/9/BGD3VT9_mu.jpg',
      url: 'https://www.bergdorfgoodman.com/p/versace-oversized-square-acetate-sunglasses-prod161880037?childItemId=BGD3VT9_&navpath=cat000000_cat202801_cat443904_cat620708&page=0&position=3&uuid=PDP_PAGINATION_c18a9a54aa94a9770afe12f8ee8c4e70_PpYSSwrlvWhQpoMRHewAMOKx8-BpjAoCWFV_J5zl.jsession'
    },
    {
      name: 'Valentino Garavani Atelier Rose Round Leather Shoulder Bag',
      price: '2590.00',
      image: 'https://images.bergdorfgoodman.com/ca/1/product_assets/V/4/U/H/B/BGV4UHB_mu.jpg',
      url: 'https://www.bergdorfgoodman.com/p/valentino-garavani-atelier-rose-round-leather-shoulder-bag-prod159740022?childItemId=BGV4UHB_&navpath=cat000000_cat202801_cat443904_cat620708&page=0&position=20&uuid=PDP_PAGINATION_c18a9a54aa94a9770afe12f8ee8c4e70_PpYSSwrlvWhQpoMRHewAMOKx8-BpjAoCWFV_J5zl.jsession'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = og($, 'title')

    const price = $('meta[property="product:price:amount"]').attr('content')

    const image = 'https:' + og($, 'image')

    return { name, price, image }
  }
}
