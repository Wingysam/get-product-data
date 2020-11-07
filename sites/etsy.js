const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Etsy',
  URLs: [
    /^https?:\/\/(www\.)?etsy\.com\/listing\/.*$/i
  ],
  testCases: [
    {
      name: 'Elf on the Shelf Care Kit for the Holidays!  Keep your Elf safe!',
      price: '$30.00',
      image: 'https://i.etsystatic.com/13429601/r/il/6e1a44/2628749269/il_570xN.2628749269_s2dr.jpg',
      url: 'https://www.etsy.com/listing/868382346/elf-on-the-shelf-care-kit-for-the?ref=hp_prn&frs=1'
    },
    {
      name: 'Classic 7 Pieces Wooden Kitchen Utensil Set, Cooking Utensils, Wooden Utensils, Sustainable Wood, Wooden Kitchenware, Housewarming Gift',
      price: 'CA$61.30',
      image: 'https://i.etsystatic.com/22161415/r/il/3a3a7e/2549233170/il_570xN.2549233170_pnis.jpg',
      url: 'https://www.etsy.com/listing/810201149/classic-7-pieces-wooden-kitchen-utensil?ref=hp_prn&pro=1&frs=1'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('.screen-reader-only > span[itemprop="name"]').first().text().trim()

    const price = $('meta[property="etsymarketplace:price"]').attr('content')

    const image = og($, 'image')

    return { name, price, image }
  }
}
