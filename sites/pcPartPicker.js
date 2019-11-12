const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'PCPartPicker',
  URLs: [
    /^https:\/\/pcpartpicker\.com\/list\/[a-z0-9]*$/i,
    /^https:\/\/pcpartpicker\.com\/user\/[a-z0-9]*\/saved\/[a-z0-9]*$/i,
    /^https:\/\/pcpartpicker\.com\/guide\/[a-z0-9]*\/[a-z0-9\-]*$/i,
    /^https:\/\/pcpartpicker\.com\/b\/[a-z0-9]*$/i
  ],
  testCases: [
    {
      name: 'Custom PC',
      url: 'https://pcpartpicker.com/list/vcrxkd'
    },
    {
      name: 'Very Cheap APU Gaming PC',
      url: 'https://pcpartpicker.com/user/Wingysam/saved/GXjbXL'
    },
    {
      name: 'Great AMD Gaming/Streaming Build',
      url: 'https://pcpartpicker.com/guide/R3G323/great-amd-gamingstreaming-build'
    },
    {
      name: 'Updated  Clean Gaming Rig',
      url: 'https://pcpartpicker.com/b/JWgwrH'
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
    name = $('.pageTitle').text();
    if (name) {
      if (name === 'System Builder') name = 'Custom PC';
      return { name };
    }
    name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}