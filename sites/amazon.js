const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Amazon',
  URLs: [
    /^https:\/\/www\.amazon\.com\/([a-z0-9-]*\/)?dp\/[a-z0-9]*\/?.*$/i,
    /^https?:\/\/a\.co\/.\/[a-z0-9]*\/? *$/i
  ],
  testCases: [
    {
      name: 'Mini Supermarket Handcart, Shopping Cart Shopping Utility Cart Mode Desk Storage Toy Holder Desk Accessory, Color Random',
      url: 'https://www.amazon.com/Supermarket-Handcart-Shopping-Utility-Accessory/dp/B0722KTW4T/ref=sr_1_8?ie=UTF8'
    },
    {
      name: 'Cube Thing',
      url: 'https://www.AMAZON.com/Luke-Foreman-Cube-Thing/dp/B00NG84JV4/ref=sr_1_7?ie=UTF8'
    },
    {
      name: 'Echo Dot (2nd Generation) - Smart speaker with Alexa - Black',
      url: 'http://a.co/d/7WpDUNl '
    },
    {
      name: 'Seagate Barracuda 4TB Internal Hard Drive HDD – 3.5 Inch SATA 6 Gb/s 5400 RPM 256MB Cache for Computer Desktop PC Laptop (ST4000DM004)',
      url: 'http://A.co/d/3Ed7AM1'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.88 Safari/537.36 Vivaldi/2.4.1488.36'
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    let name;
    const $ = cheerio.load(await res.text());
    name = $('#productTitle').text();
    if (name) return { name };
    name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}