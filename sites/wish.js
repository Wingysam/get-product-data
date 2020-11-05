const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { og } = require('../util')

module.exports = {
  name: 'Wish',
  URLs: [
    /^https:\/\/(www\.)?wish\.com\/product\/[a-z0-9-]*(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'SteelSeries Stratus XL, Bluetooth Wireless Gaming Controller for Windows + Android, Samsung Gear VR, HTC Vive, and Oculus',
      price: '$40',
      image: 'https://canary.contestimg.wish.com/api/webimage/59fffcdfb43a7e0350be5564-large.jpg?cache_buster=2fdabcf0574ef208ffb7b76f5e32e4e8',
      url: 'https://www.wish.com/product/steelseries-stratus-xl-bluetooth-wireless-gaming-controller-for-windows--android-samsung-gear-vr-htc-vive-and-oculus-59fffcdfb43a7e0350be5564?share=web'
    },
    {
      name: 'SteelSeries QcK+ Gaming Mouse Pad (Black)',
      price: '$25',
      image: 'https://canary.contestimg.wish.com/api/webimage/59ffdd8cafec1a1df4aeae28-large.jpg?cache_buster=87f199b9cbf33dbc7924fd21da1793a6',
      url: 'https://Wish.com/product/steelseries-qck-gaming-mouse-pad-black-59ffdd8cafec1a1df4aeae28'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    let name, price, image

    if (!name) name = $('title').text().slice(0, -' | Wish'.length)

    if (!price) price = $('div[class^="PurchaseContainer__ActualPrice-"]').text().trim()

    if (!image) image = og($, 'image')

    return { name, price, image }
  }
}
