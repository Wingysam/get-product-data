const cheerio = require('cheerio')
const { spawn } = require('child-process-promise')

module.exports = {
  name: 'BestBuy',
  URLs: [
    /^https:\/\/www\.bestbuy\.com\/site\/[a-z0-9-]*\/\d*\.p\/?(\?skuId=\d*)?\/?$/i
  ],
  testCases: [
    {
      name: 'HP - 2-in-1 14" Touch-Screen Chromebook - Intel Core i3 - 8GB Memory - 64GB eMMC Flash Memory - White',
      price: 'This item is no longer available in new condition.',
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6301/6301869_sd.jpg',
      url: 'https://www.bestbuy.com/site/hp-2-in-1-14-touch-screen-chromebook-intel-core-i3-8gb-memory-64gb-emmc-flash-memory-hp-finish-in-ceramic-white-and-cloud-blue/6301869.p?skuId=6301869'
    },
    {
      name: 'Samsung - 75" Class 6 Series LED 4K UHD Smart Tizen TV',
      price: '$849.99',
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6290/6290167_sd.jpg',
      url: 'https://www.BESTBUY.com/site/samsung-75-class-led-nu6900-series-2160p-smart-4k-uhd-tv-with-hdr/6290167.p?skuId=6290167'
    }
  ],
  async getter (url, proxy) {
    // Extreme circumstances call for extreme measures.
    // All node HTTP libs hang here, but curl doesn't.
    // I have spent 3 hours debugging, and have given up.
    // Here be dragons~
    const { stdout: html } = await spawn('curl', [url, '-LH', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'], {
      env: {
        http_proxy: proxy,
        https_proxy: proxy
      },
      capture: [
        'stdout'
      ]
    })

    const $ = cheerio.load(html)
    let name, price, image

    if (!name) name = $('.sku-title > h1').text().trim()

    if (!price) price = $('.priceView-customer-price').first().children().first().text().trim()
    if (!price) price = $('.inactive-product-message.v-fw-medium').text().trim()

    if (!image) image = $('meta[property="og:image"]').attr('content')

    return { name, price, image }
  }
}
