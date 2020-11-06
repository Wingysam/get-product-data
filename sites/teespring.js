const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Teespring',
  URLs: [
    /^https:\/\/(www.)?teespring.com\/shop\/.*$/i
  ],
  testCases: [
    {
      name: "Can't Keep Calm - Soccer Mom",
      price: '22.00',
      image: 'https://vangogh.teespring.com/v3/image/q5XAQiSUfpQgyAza37SIqNdCWHU/480/560.jpg',
      url: 'https://teespring.com/shop/can-t-keep-calm-soccer-mom_whi?aid=marketplace&tsmac=marketplace&tsmic=search&pid=2&cid=569'
    },
    {
      name: "You're Trying - Inspirational Quotes.",
      price: '25.99',
      image: 'https://vangogh.teespring.com/v3/image/GE4LUzSmVclaUybH0nlCDic0cfo/480/560.jpg',
      url: 'https://teespring.com/shop/new-you-re-trying-inspiration?aid=marketplace&tsmac=marketplace&tsmic=category'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'get-product-name'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())

    const name = $('.campaign__name:first-child').text()

    let price = $('meta[itemprop="price"]').first().attr('content')
    if (!price) price = og($, 'price:amount')

    const image = $('img.image_stack__image').first().attr('src')

    return { name, price, image }
  }
}
