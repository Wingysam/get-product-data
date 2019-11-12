const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Teespring',
  URLs: [
    /^https:\/\/(www.)?teespring.com\/shop\/.*$/i
  ],
  testCases: [
    {
      name: "Can't Keep Calm - Soccer Mom",
      url: 'https://teespring.com/shop/can-t-keep-calm-soccer-mom_whi?aid=marketplace&tsmac=marketplace&tsmic=search&pid=2&cid=569'
    },
    {
      name: "You're Trying - Inspirational Quotes.",
      url: 'https://teespring.com/shop/new-you-re-trying-inspiration?aid=marketplace&tsmac=marketplace&tsmic=category'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'get-product-name'
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('.campaign__name:first-child').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
