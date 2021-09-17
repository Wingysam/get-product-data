const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Zazzle',
  URLs: [
    /^https?:\/\/(www\.)?zazzle\.com\/.*$/i
  ],
  testCases: [
    {
      name: 'I � Unicode T-Shirt',
      price: '$18.45',
      image: 'https://rlv.zcache.com/i_unicode_t_shirt-raf7c866c98f34c0f9f47409ea49bd4fc_k2gm8_704.webp',
      url: 'https://www.zazzle.com/i_unicode_t_shirt-235442613480103840'
    },
    {
      name: 'Custom Zipz Low Top Shoes, US Men 4 / US Women 6',
      price: '$74.90',
      image: 'https://rlv.zcache.com/create_your_own_low_tops-rdfc0a72d2bca470aa79ad7caa9222297_j4gtr_704.webp?rlvnet=1',
      url: 'https://www.zazzle.com/create_your_own_low_tops-256487015208915068'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0 Waterfox/78.5.0'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('.ProductTitle-title').first().text().trim()

    const price = $('.TopBar-amount').first().text().trim()

    const image = $('.ProductView-image').first().attr('srcset').split(' ').reverse()[1]

    return { name, price, image }
  }
}
