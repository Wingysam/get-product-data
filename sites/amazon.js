const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (url, proxy) => {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.88 Safari/537.36 Vivaldi/2.4.1488.36'
    }
  };
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
