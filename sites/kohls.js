const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = async url => {
    const res = await snekfetch.get(url);
    if (!res.ok) { throw new Error(`Res not ok. Status: ${res.statusCode} ${res.statusText}`); };
    const $ = cheerio.load(res.body);
    const name = $('.pdp-product-title').text().trim();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
};