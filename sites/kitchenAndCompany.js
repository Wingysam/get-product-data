const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Kitchen & Company',
  URLs: [
    /^https:\/\/www\.kitchenandcompany\.com\/[a-z0-9-]*\/?$/i
  ],
  testCases: [
    {
      name: 'Breville Smart Oven Air',
      url: 'https://www.kitchenandcompany.com/breville-smart-oven-air'
    },
    {
      name: 'YETI Tundra 45 Tan',
      url: 'https://www.KITCHENANDCOMPANY.com/yeti-tundra-45-tan'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('title').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
