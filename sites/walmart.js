const cheerio = require('cheerio');
const request = require('request');

module.exports = url => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) return reject(err);
      if (res.statusCode !== 200) return reject(new Error(`Status code not 200. Status code: ${res.statusCode}`));
      const $ = cheerio.load(body);
      const name = $('h1.prod-ProductTitle').attr().content;
      if (name) return resolve({ name });
      return reject(new Error('Could not find product. Invalid URL?'));
    });
  });
};
