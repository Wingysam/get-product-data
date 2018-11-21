const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (url, proxy) => {
  const options = {};
  if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
  let name;
  const $ = cheerio.load(await res.text());
  name = $('#productTitle').text();
  if (name) return { name };
  name = $('div#mobileApplicationSubtitle_feature_div > div#mas-title > div.a-row > span').text();
  if (name) return { name };
  throw new Error('Could not find product. Invalid URL?');
};
