const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: "Kohl's",
  URLs: [
    /^https:\/\/www\.kohls\.com\/product\/prd-\d*\/?([a-z0-9-]*\.jsp)?\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Fitbit Ace Kids Activity Tracker',
      url: 'https://www.kohls.com/product/prd-3296135/fitbit-ace-kids-activity-tracker.jsp'
    },
    {
      name: 'Nintendo Switch Console & Joy-Con Controller Set with Bonus Interworks Controller',
      url: 'https://www.KOHLS.com/product/prd-3239600/nintendo-switch-console-joy-con-controller-set-with-bonus-interworks-controller.jsp'
    }
  ],
  async getter(url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('.pdp-product-title').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}