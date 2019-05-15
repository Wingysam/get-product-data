const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Google Express',
  URLs: [
    /^https:\/\/express\.google\.com(\/u\/0)?\/product\/([a-z0-9-]*\/)?\w*\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Google Chromecast (2nd Generation) - 1080p - Wi-Fi - Black',
      url: 'https://express.google.com/u/0/product/Google-Chromecast-2nd-Generation-1080p-Wi-Fi-Black/12201320268068482524_12770536777640250214_102760793'
    },
    {
      name: 'Super Mario Odyssey - Nintendo Switch',
      url: 'https://express.GOOGLE.com/u/0/product/Nintendo-Super-Mario-Odyssey-Switch-Game/4699429706850701365_8691361685679756397_125181302'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('h1.title').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
