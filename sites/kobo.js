const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Kobo',
  URLs: [
    /^https?:\/\/[a-z]*\.kobobooks\.com\/(collections\/[a-z]*\/)?products\/.*$/i,
    /^https?:\/\/(www\.)?kobo\.com\/[a-z]*\/[a-z]*\/ebook\/.*$/i
  ],
  testCases: [
    {
      name: 'Kobo Forma',
      url: 'https://us.kobobooks.com/products/kobo-forma?utm_source=Kobo&utm_medium=TopNav&utm_campaign=Forma'
    },
    {
      name: 'Kobo Libra H2O',
      url: 'https://us.kobobooks.com/collections/all/products/kobo-libra-h2o'
    },
    {
      name: 'Blue Moon',
      url: 'https://www.kobo.com/us/en/ebook/blue-moon-94#'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    let name = $('meta[name="twitter:title"]').attr('content');
    if (name) return { name };
    name = $('span.title').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}
