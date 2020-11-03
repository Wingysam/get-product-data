const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'eBay',
  URLs: [
    /^https:\/\/www\.ebay\.com\/(itm|p)\/[a-z0-9-]*\/\d*\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Nest T3017US 3rd Generation Programmable Wi-Fi Smart Learning Thermostat - White',
      price: '$45.65',
      image: 'https://i.ebayimg.com/images/g/bqgAAOSwPDRfGUt7/s-l640.jpg',
      url: 'https://www.ebay.com/itm/Nest-Learning-Thermostat-3rd-Generation-Works-with-Google-Home-and-Amazon-Alexa/223103414932'
    },
    {
      name: 'Apple MacBook Air 13.3" (128GB SSD, Intel Core i5 8th Gen., 3.60 GHz, 8GB) Laptop - Silver - MREA2LL/A (October, 2018)',
      price: '$1,037.25',
      image: 'https://i.ebayimg.com/images/g/WhIAAOSwTm1eNtQT/s-l640.jpg',
      url: 'https://www.EBAY.com/itm/Apple-13-3-MacBook-Air-128GB-with-Retina-Display-2018-Silver-MREA2LL-A/202501359082'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    let name, price, image

    if (!name) name = $('title').text().slice(0, -' for sale online | eBay'.length)

    if (!price) price = $('.display-price').text().trim()

    if (!image) image = $('.app-filmstrip__image').first().attr('src')

    return { name, price, image }
  }
}
