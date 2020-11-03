const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'IKEA',
  URLs: [
    /^https:\/\/www.ikea.com\/.*\/.*\/p\/.*$/i
  ],
  testCases: [
    {
      name: 'MALM Bed frame, high - black-brown/Luröy Queen',
      price: '199',
      image: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high-black-brown-luroey__0638608_PE699032_S5.JPG',
      url: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
    },
    {
      name: 'BUSKBO Armchair - rattan/Djupvik white',
      price: '169',
      image: 'https://www.ikea.com/us/en/images/products/buskbo-armchair-rattan-djupvik-white__0700959_PE723853_S5.JPG',
      url: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-djupvik-white-s69299012/'
    }
  ],
  async getter(url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    let name, price, image
    const data = JSON.parse($('script[type="application/ld+json"]').last().html())

    name = data.name
    price = data.offers.price
    image = data.image[0]

    return { name, price, image }
  }
}