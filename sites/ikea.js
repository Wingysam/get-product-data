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
      name: 'MALM Bed frame, high, black-brown, Luröy, Queen',
      url: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
    },
    {
      name: 'BUSKBO Armchair, rattan, Djupvik white',
      url: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-djupvik-white-s69299012/'
    }
  ],
  async getter(url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    // If you can make this next line better, please open a PR :)
    const name = `${$('h2.product-pip__product-heading > span.product-pip__name').text()} ${$('.range__text-rtl').text().trim().split('\n')[0]}`;
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}