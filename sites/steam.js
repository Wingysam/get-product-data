const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

const { og } = require('../util')

module.exports = {
  name: 'Steam',
  URLs: [
    /^https?:\/\/store\.steampowered\.com\/app\/\d*\/([A-z0-9-_]*\/)?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'CODE VEIN',
      price: '$23.99',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/678960/capsule_616x353.jpg?t=1597152578',
      url: 'https://store.steampowered.com/app/678960/CODE_VEIN/'
    },
    {
      name: 'Factorio',
      price: '$30.00',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/427520/capsule_616x353.jpg?t=1597395512',
      url: 'https://store.steampowered.com/app/427520/Factorio/?snr=1_7_15__13'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        Cookie: 'wants_mature_content=1; birthtime=0;'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('span[itemprop="name"]').text().trim()

    let price = $('.discount_final_price').first().text().trim()
    if (!price) price = $('.game_area_purchase_game_wrapper .game_purchase_price').first().text().trim()

    const image = og($, 'image')

    return { name, price, image }
  }
}
