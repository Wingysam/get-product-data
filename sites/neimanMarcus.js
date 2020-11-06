const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Neiman Marcus',
  URLs: [
    /^https?:\/\/(www\.)?neimanmarcus\.com\/.*$/i
  ],
  testCases: [
    {
      name: 'Mark Roberts Elegant Deer - 48"',
      price: '696.50',
      image: 'https://images.neimanmarcus.com/ca/1/product_assets/H/D/A/A/Y/NMHDAAY_mu.jpg',
      url: 'https://www.neimanmarcus.com/p/mark-roberts-elegant-deer-48-prod231430123?childItemId=NMHDAAY_&navpath=cat000000_cat000553_cat65530756&page=0&position=3'
    },
    {
      name: 'TOPS Malibu Inc. Mini Tabletop Red Nose Reindeer Pinata',
      price: '24.00',
      image: 'https://images.neimanmarcus.com/ca/1/product_assets/H/D/M/T/G/NMHDMTG_mu.jpg',
      url: 'https://www.neimanmarcus.com/p/tops-malibu-inc-mini-tabletop-red-nose-reindeer-pinata-prod235450027?childItemId=NMHDMTG_&navpath=cat000000_cat000553_cat65530756&page=0&position=17'
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
