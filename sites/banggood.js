const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Banggood',
  URLs: [
    /^https?:\/\/[a-z]*\.?banggood.com\/[a-zA-Z0-9_.-]*(.+)$/i
  ],
  testCases: [
    {
      name: 'Sonicmodell AR Wing Pro 1000mm Wingspan EPP FPV Flying Wing RC Airplane KIT/PNP',
      price: '€98.43 - €128.86',
      image: 'https://imgaz.staticbg.com/thumb/view/oaupload/banggood/images/48/9C/ab1f2777-d16f-4491-a494-5a40cb7fe860.png',
      url: 'https://www.banggood.com/Sonicmodell-AR-Wing-Pro-1000mm-Wingspan-EPP-FPV-Flying-Wing-RC-Airplane-KIT-or-PNP-p-1756841.html?cur_warehouse=CN&rmmds=search&ID=531466&currency=EUR'
    },
    {
      name: 'Eachine Spitfire 2.4GHz EPP 400mm Wingspan 6-Axis Gyro One-Key U-Turn Aerobatic Mini RC Airplane RTF for Trainer Beginner',
      price: '$101.14 - $102.84',
      image: 'https://imgaz2.staticbg.com/thumb/view/oaupload/banggood/images/6B/E5/03cc2431-98ff-42fd-b907-d9481c8cd28c.jpg',
      url: 'https://usa.banggood.com/Eachine-Spitfire-2_4GHz-EPP-400mm-Wingspan-6-Axis-Gyro-One-Key-U-Turn-Aerobatic-Mini-RC-Airplane-RTF-for-Trainer-Beginner-p-1913501.html?rmmds=NewArrivalRankings&cur_warehouse=CN&ID=6292254'
    }
  ],
  async getter (url, proxy) {
    const options = {}
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const rawJson = $('script[type="application/ld+json"]').first().html()

    const data = JSON.parse(rawJson.replace(/(\r\n|\n|\r)/gm, '').substring(0, rawJson.length - 7))
    let name, price, image

    let curSymbol = ''
    switch (data.offers[0].priceCurrency) {
      case 'EUR':
        curSymbol = '€'
        break

      default:
        curSymbol = '$'
        break
    }

    if (!name) name = data.name

    if (data.offers.length > 1) {
      if (!price) price = `${curSymbol}${data.offers[0].price} - ${curSymbol}${data.offers[(data.offers.length - 1)].price}`
      else
      if (!price) price = `${curSymbol}${data.offers[0].price}`
    }

    if (!image) image = data.image

    console.log(data.offers.length)

    return { name, price, image }
  }
}
