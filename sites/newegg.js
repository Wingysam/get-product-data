const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Newegg',
  URLs: [
    /^https:\/\/www\.newegg\.com\/Product\/Product\.aspx\?Item=[a-z0-9](&.*)?\/?/i
  ],
  testCases: [
    {
      name: 'CORSAIR Vengeance LPX 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Intel XMP 2.0 Desktop Memory Model CMK16GX4M2B3000C15R',
      price: '70.99',
      image: 'https://c1.neweggimages.com/ProductImage/20-233-863-02.jpg',
      url: 'https://www.newegg.com/Product/Product.aspx?Item=N82E16820233863'
    },
    {
      name: 'GeIL SUPER LUCE RGB SYNC 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model GLWS416GB3000C16ADC',
      price: '128.00',
      image: 'https://c1.neweggimages.com/ProductImage/20-158-637-V01.jpg',
      url: 'https://www.NEWEGG.com/Product/Product.aspx?Item=N82E16820158637'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const $ = cheerio.load(await res.text())
    const data = JSON.parse($('script[type="application/ld+json"]').last().html())

    const name = data.name
    const price = data?.offers?.price
    const image = data?.image

    return { name, price, image }
  }
}
