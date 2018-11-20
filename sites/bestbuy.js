const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = async url => {
  const res = await snekfetch.get(url, {
    headers: {
      // Best buy takes 10x longer if no user agent
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:63.0) Gecko/20100101 Firefox/63.0'
    }
  });
  if (!res.ok) { throw new Error(`Res not ok. Status: ${res.statusCode} ${res.statusText}`); };
  const $ = cheerio.load(res.body);
  const name = $('.sku-title > h1').text();
  if (name) return { name };
  else { throw new Error('Could not find product. Invalid URL?'); };
};