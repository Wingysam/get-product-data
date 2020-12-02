const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'eBay',
  URLs: [
    /^https:\/\/www\.ebay\.com\/(itm|p)\/[a-z0-9-]*\/\d*\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Nest T3017US 3rd Generation Programmable Wi-Fi Smart Learning Thermostat - White',
      price: '$45.65',
      image: 'https://i.ebayimg.com/images/g/bqgAAOSwPDRfGUt7/s-l600.jpg',
      url: 'https://www.ebay.com/itm/Nest-Learning-Thermostat-3rd-Generation-Works-with-Google-Home-and-Amazon-Alexa/223103414932'
    },
    {
      name: 'Apple MacBook Air 13.3" (128GB SSD, Intel Core i5 8th Gen., 3.60 GHz, 8GB) Laptop - Silver - MREA2LL/A (October, 2018)',
      price: '$949.00',
      image: 'https://i.ebayimg.com/images/g/WhIAAOSwTm1eNtQT/s-l600.jpg',
      url: 'https://www.EBAY.com/itm/Apple-13-3-MacBook-Air-128GB-with-Retina-Display-2018-Silver-MREA2LL-A/202501359082'
    },
    {
      name: '33FT RGB 600 LED Strip Lights WiFi APP Phone Control Music Sync Fit Alexa Google',
      price: 'US $21.98/ea',
      image: 'https://i.ebayimg.com/images/g/vVoAAOSw0LlfVgX3/s-l400.jpg',
      url: 'https://www.ebay.com/itm/33FT-RGB-600-LED-Strip-Lights-WiFi-APP-Phone-Control-Music-Sync-Fit-Alexa-Google-/233272384608?_trksid=p2349624.m46890.l49292'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())
    let name, price, image

    if (!name) name = $('h1.product-title').text().trim()
    if (!name) name = $('meta[name="twitter:title"]').attr('content').trim()

    if (!price) price = $('.display-price').text().trim()
    if (!price) price = $('#prcIsum').text().trim()

    if (!image) image = og($, 'image')

    return { name, price, image }
  }
}
