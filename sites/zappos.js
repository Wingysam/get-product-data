const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Zappos',
  URLs: [
    /^https?:\/\/(www\.)?zappos\.com\/p\/.*$/i
  ],
  testCases: [
    {
      name: 'Under Armour UA Charged Assert 8',
      price: '$51.24',
      image: 'https://m.media-amazon.com/images/I/71I0FqjvSAL._AC_SR700,525_.jpg',
      url: 'https://www.zappos.com/p/under-armour-ua-charged-assert-8-black-white-white/product/9184523/color/31878?pf_rd_r=4D396C361D834D7BB544&pf_rd_p=9fe433fc-6bc1-4e20-9567-311f58e363d2'
    },
    {
      name: 'Beyond Yoga Spacedye Everyday Hoodie',
      price: '$128.00',
      image: 'https://m.media-amazon.com/images/I/811Dl6apHbS._AC_SR700,525_.jpg',
      url: 'https://www.zappos.com/p/beyond-yoga-spacedye-everyday-hoodie-silver-mist/product/9562917/color/187216'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('.fx-z div[itemprop="name"]').first().text().trim()

    const price = $('.Ew-z').first().text().trim()

    const image = $('meta[itemProp="image"]').first().attr('content')

    return { name, price, image }
  }
}
