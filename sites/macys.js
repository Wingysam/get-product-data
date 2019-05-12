const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (url, proxy) => {
  const options = {
    headers: {
      // Returns 403 unauthorized without these headers
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:63.0) Gecko/20100101 Firefox/63.0',
      Connection: 'keep-alive'
    }
  };
  if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
  const $ = cheerio.load(await res.text());
  const name = `${$('[data-auto="product-brand"]').first().text().trim()} ${$('[data-auto="product-name"]').first().text().trim()}`;
  if (name) return { name };
  throw new Error('Could not find product. Invalid URL?');
};
