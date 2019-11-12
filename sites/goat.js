const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'GOAT',
  URLs: [
    /^https:\/\/www.goat.com\/.*\/.*$/i
  ],
  testCases: [
    {
      name: "Air Jordan 1 Retro High OG 'Crimson Tint'",
      url: 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-crimson-tint-555088-081?_branch_match_id=722603302568876625'
    },
    {
      name: "Air Jordan 1 Retro High OG 'Shattered Backboard 3.0'",
      url: 'https://wwW.GOaT.Com/sneakers/air-jordan-1-retro-high-og-shattered-backboard-3-0-555088-028'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const data = JSON.parse($('script[type="application/ld+json"]').html());
    const name = data.name
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
