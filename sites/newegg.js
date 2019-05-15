const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Newegg',
  URLs: [
    /^https:\/\/www\.newegg\.com\/Product\/Product\.aspx\?Item=[a-z0-9](&.*)?\/?/i
  ],
  testCases: [
    {
      name: 'CORSAIR Vengeance LPX 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model CMK16GX4M2B3000C15R',
      url: 'https://www.newegg.com/Product/Product.aspx?Item=N82E16820233863'
    },
    {
      name: 'GeIL SUPER LUCE RGB SYNC 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model GLWS416GB3000C16ADC',
      url: 'https://www.NEWEGG.com/Product/Product.aspx?Item=N82E16820158637'
    }
  ],
  async getter(url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    const name = $('h1#grpDescrip_h > span[itemprop="name"]').text();
    if (name) return { name };
    throw new Error('Could not find product. Invalid URL?');
  }
}