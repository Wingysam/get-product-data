const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'Kitchen & Company',
  URLs: [
    /^https:\/\/www\.kitchenandcompany\.com\/[a-z0-9-]*\/?$/i
  ],
  testCases: [
    {
      name: 'Breville Smart Oven Air',
      price: '$399.99',
      image: 'https://www.kitchenandcompany.com/media/catalog/product/cache/0f831c1845fc143d00d6d1ebc49f446a/0/2/021614056948.4.jpg',
      url: 'https://www.kitchenandcompany.com/breville-smart-oven-air'
    },
    {
      name: 'YETI Tundra 45 Tan',
      price: '$299.99',
      image: 'https://www.kitchenandcompany.com/media/catalog/product/cache/0f831c1845fc143d00d6d1ebc49f446a/0/1/014394530463.3.jpg',
      url: 'https://www.KITCHENANDCOMPANY.com/yeti-tundra-45-tan'
    }
  ],
  async getter (url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const $ = cheerio.load(await res.text());
    let name, price, image

    name = $('title').text()
    price = $('.price').first().text().trim()
    image = $('meta[property="og:image"]').attr('content')

    return { name, price, image }
  }
}
