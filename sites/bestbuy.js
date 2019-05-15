const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'BestBuy',
  URLs: [
    /^https:\/\/www\.bestbuy\.com\/site\/[a-z0-9-]*\/\d*\.p\/?(\?skuId=\d*)?\/?$/i
  ],
  testCases: [
    {
      name: 'HP - 2-in-1 14" Touch-Screen Chromebook - Intel Core i3 - 8GB Memory - 64GB eMMC Flash Memory - White',
      url: 'https://www.bestbuy.com/site/hp-2-in-1-14-touch-screen-chromebook-intel-core-i3-8gb-memory-64gb-emmc-flash-memory-hp-finish-in-ceramic-white-and-cloud-blue/6301869.p?skuId=6301869'
    },
    {
      name: 'Samsung - 75" Class - LED - NU6900 Series - 2160p - Smart - 4K UHD TV with HDR',
      url: 'https://www.BESTBUY.com/site/samsung-75-class-led-nu6900-series-2160p-smart-4k-uhd-tv-with-hdr/6290167.p?skuId=6290167'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        // Best Buy takes 10x longer without these headers
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:63.0) Gecko/20100101 Firefox/63.0',
        Connection: 'keep-alive'
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('.sku-title > h1').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}