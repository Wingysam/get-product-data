const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { og } = require('../util')

module.exports = {
  name: "Macy's",
  URLs: [
    /^https:\/\/www\.macys\.com\/shop\/product\/[a-z0-9-]*\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Black & Decker Crisp and Bake Air Fryer Toaster Oven',
      price: '75.99',
      image: 'https://slimages.macys.com/is/image/MCY/products/7/optimized/10414137_fpx.tif?$filterlrg$&wid=327',
      url: 'https://www.macys.com/shop/product/black-decker-crisp-n-bake-air-fry-toaster-oven?ID=6679993'
    },
    {
      name: 'Steve Madden Kimmy Tote',
      price: '39.99',
      image: 'https://slimages.macys.com/is/image/MCY/products/9/optimized/10375479_fpx.tif?$filterlrg$&wid=327',
      url: 'https://www.MACYS.com/shop/product/steve-madden-kimmy-tote?ID=6757298'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        // Returns 403 unauthorized without these headers
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    let res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const html = await res.text()
    const $ = cheerio.load(html);
    let data = {}
    try {
      data = JSON.parse(JSON.parse(html.split('window.__INITIAL_STATE__ = ')[1].split(';\n')[0])._PDP_BOOTSTRAP_DATA)
    } catch {}
    let name, price, image

    name = `${data?.product?.detail?.brand?.name} ${data?.product?.detail?.name}`

    price = data?.utagData?.product_price[0] || undefined

    image = og($, 'image')

    return { name, price, image }
  }
}