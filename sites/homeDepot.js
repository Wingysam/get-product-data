const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Home Depot',
  URLs: [
    /^https?:\/\/www\.homedepot\.com\/.*$/i
  ],
  testCases: [
    {
      name: '12 ft Dunhill Fir Incandescent Christmas Tree',
      price: '599.00',
      image: 'https://images.thdstatic.com/productImages/ab21a13f-df57-4b38-b346-bb8e6d51b794/svn/national-tree-company-pre-lit-christmas-trees-duh3-120lo-s-64_100.jpg',
      url: 'https://www.homedepot.com/p/National-Tree-Company-12-ft-Dunhill-Fir-Incandescent-Christmas-Tree-DUH3-120LO-S/204145859'
    },
    {
      name: 'Cam v3 Wired Home Security Camera with 3-Months Cam Plus Included (2-Pack)',
      price: '69.98',
      image: 'https://images.thdstatic.com/productImages/2d59e631-9a17-4b6e-b81d-a941e8d9d838/svn/white-wyze-wired-security-cameras-wyzec3cp3x2-64_100.jpg',
      url: 'https://www.homedepot.com/p/WYZE-Cam-v3-Wired-Home-Security-Camera-with-3-Months-Cam-Plus-Included-2-Pack-WYZEC3CP3X2/322233890'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)
    const rawJson = $('script[type="application/ld+json"]#thd-helmet__script--productStructureData').first().html()
    const data = JSON.parse(rawJson)

    const name = data.name
    const price = data.offers?.price?.toFixed(2)
    const image = data.image ? data.image[0] : null

    return { name, price, image }
  }
}
