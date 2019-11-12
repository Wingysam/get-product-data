const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Target',
  URLs: [
    /^https:\/\/www\.target\.com\/p\/([a-z0-9-]*\/)?-\/A-\d*(\?.*)?$/i
  ],
  testCases: [
    {
      name: "Disney Gift Card eGift (Email Delivery)",
      url: 'https://www.target.com/p/disney-gift-card-egift-email-delivery/-/A-54191074'
    },
    {
      name: 'Xbox One X 1 TB Console - Black',
      url: 'https://www.TARGET.com/p/xbox-one-x/-/A-52637446'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('[data-test="product-title"]').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
