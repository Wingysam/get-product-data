const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'GameStop',
  URLs: [
    /^https:\/\/www\.gamestop\.com\/.*$/i
  ],
  testCases: [
    {
      name: 'Nintendo Switch with Neon Blue and Neon Red Joy-Con',
      url: 'https://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/153583'
    },
    {
      name: 'PlayStation 4 Game Drive External Hard Drive 2TB',
      url: 'https://www.GAMESTOP.com/ps4/accessories/seagate-2tb-game-drive-for-ps4/151885'
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
    const $ = cheerio.load(await res.text());
    const name = $('span.product-name').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}