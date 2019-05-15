const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Walmart',
  URLs: [
    /^https?:\/\/www\.walmart\.com\/ip\/[a-z0-9-]*\/\d*(\?.*)?\/?$/i
  ],
  testCases: [
    {
      name: 'LEGO City Town LEGO® City Advent Calendar 60201',
      url: 'https://www.walmart.com/ip/Lego-City-60201-Kid-Children-s-Toy-Set-24-Day-Advent-Calendar-Holiday-Gift-Box/210314543'
    },
    {
      name: 'Nerf Zombie Strike RevReaper Blaster with 10 Zombie Strike Darts',
      url: 'https://www.WALMART.com/ip/Nerf-Zombie-Strike-Revreaper/942349359'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('h1.prod-ProductTitle').attr().content;
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}