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
      name: 'Nest Learning Thermostat 3rd Generation, Works with Google Home & Amazon Alexa',
      url: 'https://www.ebay.com/itm/Nest-Learning-Thermostat-3rd-Generation-Works-with-Google-Home-and-Amazon-Alexa/223103414932'
    },
    {
      name: 'Apple 13.3" MacBook Air 128GB with Retina Display (2018, Silver) MREA2LL/A',
      url: 'https://www.EBAY.com/itm/Apple-13-3-MacBook-Air-128GB-with-Retina-Display-2018-Silver-MREA2LL-A/202501359082'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('#itemTitle').text().replace('Details about  ', '');
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
