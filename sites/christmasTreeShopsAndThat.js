const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Christmas Tree Shops and That!',
  URLs: [
    /^https:\/\/www\.christmastreeshops\.com\/[a-z0-9-]*\/p\/\d*\/?$/i
  ],
  testCases: [
    {
      name: 'Solid Sheer Textured Grommet Window Curtains, Set of 2',
      price: '$9.99',
      image: 'https://cdn-tp3.mozu.com/24484-36801/cms/36801/files/c42e1678-6abb-49a8-9f9b-381bb6ee58cd?maxWidth=350&_mzcb=_1604005803151',
      url: 'https://www.christmastreeshops.com/solid-sheer-textured-grommet-window-curtains-set-of-2/p/6053032'
    },
    {
      name: 'Petal & Stone™ Scallop End Table',
      price: '$59.99',
      image: 'https://cdn-tp3.mozu.com/24484-36801/cms/36801/files/cd07baa4-85b4-4578-aa26-a42858f0b7f9?maxWidth=350&_mzcb=_1604005803151',
      url: 'https://www.CHRISTMASTREESHOPS.com/the-grainhouse-scallop-end-table/p/8085224'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())
    let name, price, image

    if (!name) name = $('h1.mz-pagetitle').text()

    if (!price) price = $('span.mz-price').text().trim()

    if (!image) image = $('meta[property="og:image"]').attr('content')

    return { name, price, image }
  }
}
