const cheerio = require('cheerio');
const request = require('request');

module.exports = url => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) return reject(err);
      if (res.statusCode !== 200) return reject(new Error(`Status code not 200. Status code: ${res.statusCode}`));
      let name;
      const $ = cheerio.load(body);
      name = $('#productTitle').text().trim();
      if (name) return resolve({ name });
      name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text();
      if (name) return resolve({ name });
      return reject(new Error('Could not find product. Invalid URL?'))
    })
  });
};