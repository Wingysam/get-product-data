const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = async url => {
    const res = await snekfetch.get(url, {
        headers: {
          // Returns 403 unauthorized with no user agent
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:63.0) Gecko/20100101 Firefox/63.0'
        }
      });
    if (!res.ok) { throw new Error(`Res not ok. Status: ${res.statusCode} ${res.statusText}`); };
    const $ = cheerio.load(res.body);
    const name = `${$('[data-auto="product-brand"]').text().trim()} ${$('[data-auto="product-name"]').text().trim()}`;
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
};