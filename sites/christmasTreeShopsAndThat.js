const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Christmas Tree Shops and That!',
  URLs: [
    /^https:\/\/www\.christmastreeshops\.com\/[a-z0-9-]*\/p\/\d*\/?$/i
  ],
  testCases: [
    {
      name: 'Solid Sheer Textured Grommet Window Curtains, Set of 2',
      url: 'https://www.christmastreeshops.com/solid-sheer-textured-grommet-window-curtains-set-of-2/p/6053032'
    },
    {
      name: 'The Grainhouse™ Scallop End Table',
      url: 'https://www.CHRISTMASTREESHOPS.com/the-grainhouse-scallop-end-table/p/8085224'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('h1.mz-pagetitle').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
