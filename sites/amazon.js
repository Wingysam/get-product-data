const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

module.exports = async url => {
  const res = await snekfetch.get(url);
  if (!res.ok) throw new Error(`Res not ok. Status: ${res.statusCode} ${res.statusText}`);
  let name;
  const $ = cheerio.load(res.body);
  name = $('#productTitle').text().trim();
  if (name) return { name };
  name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text();
  if (name) return { name };
  throw new Error('Could not find product. Invalid URL?');
};
