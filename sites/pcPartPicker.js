const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'PCPartPicker',
  URLs: [
    /^https:\/\/pcpartpicker\.com\/list\/[a-z0-9]*$/i,
    /^https:\/\/pcpartpicker\.com\/user\/[a-z0-9]*\/saved\/[a-z0-9]*$/i,
    /^https:\/\/pcpartpicker\.com\/guide\/[a-z0-9]*\/[a-z0-9-]*$/i,
    /^https:\/\/pcpartpicker\.com\/b\/[a-z0-9]*$/i
  ],
  testCases: [
    {
      name: 'Custom PC',
      price: '$344.81',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/ad2e56d88c77de3053dcc5dada363f58.256p.jpg',
      url: 'https://pcpartpicker.com/list/vcrxkd'
    },
    {
      name: 'Very Cheap APU Gaming PC',
      price: '$365.24',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/ad2e56d88c77de3053dcc5dada363f58.256p.jpg',
      url: 'https://pcpartpicker.com/user/Wingysam/saved/GXjbXL'
    },
    {
      name: 'Great AMD Gaming/Streaming Build',
      price: '$1002.06',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/c7baf2c9c9cc15ae23adb24c2f4316fc.256p.jpg',
      url: 'https://pcpartpicker.com/guide/R3G323/great-amd-gamingstreaming-build'
    },
    {
      name: 'First Gaming Rig!',
      price: '$1113.82',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/userbuild/312904.7316f03d975a4f8dcc9e5b8adf2629e3.jpg',
      url: 'https://pcpartpicker.com/b/b6BZxr'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.88 Safari/537.36 Vivaldi/2.4.1488.36'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())

    let name = $('.pageTitle').text()
    if (name) {
      if (name === 'System Builder') name = 'Custom PC'
    }
    if (!name) name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text()

    const price = $('.td__price').last().text().trim()

    let image = og($, 'image')
    if (!image) image = $('.td__image > a > img').attr('src')
    if (image) image = `https:${image}`

    return { name, price, image }
  }
}
