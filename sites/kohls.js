const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (url, proxy) => {
  const options = {};
  if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
  const $ = cheerio.load(await res.text());
  const name = $('.pdp-product-title').text();
  if (name) return { name };
  throw new Error('Could not find product. Invalid URL?');
};
