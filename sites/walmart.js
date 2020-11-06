const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Walmart',
  URLs: [
    /^https?:\/\/www\.walmart\.com\/ip\/[a-z0-9-]*\/\d*(\?.*)?\/?$/i
  ],
  testCases: [
    {
      name: 'LEGO City Town LEGO® City Advent Calendar 60201',
      price: '$49.90',
      image: 'https://i5.walmartimages.com/asr/eb9b5262-1464-4a43-b8d6-3b10afcda5fe_2.2d33be3a3baf104beef79d9c758ba12a.jpeg',
      url: 'https://www.walmart.com/ip/Lego-City-60201-Kid-Children-s-Toy-Set-24-Day-Advent-Calendar-Holiday-Gift-Box/210314543'
    },
    {
      name: 'Nerf Zombie Strike RevReaper Blaster with 10 Zombie Strike Darts',
      price: '$24.99',
      image: 'https://i5.walmartimages.com/asr/853e0e83-f7ac-4678-ad76-e9595a51403f_1.f3e87a25fdeed0127613f1eee5a45344.jpeg',
      url: 'https://www.WALMART.com/ip/Nerf-Zombie-Strike-Revreaper/942349359'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('h1.prod-ProductTitle').attr('content')

    const price = $('.price > :first-child').first().text()

    const image = og($, 'image')

    return { name, price, image }
  }
}
