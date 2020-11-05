const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: "Kohl's",
  URLs: [
    /^https:\/\/www\.kohls\.com\/product\/prd-\d*\/?([a-z0-9-]*\.jsp)?\/?(\?.*)?$/i
  ],
  testCases: [
    {
      name: 'Fitbit Ace Kids Activity Tracker',
      price: '29.99',
      image: 'https://media.kohlsimg.com/is/image/kohls/3296135_Power_Purple',
      url: 'https://www.kohls.com/product/prd-3296135/fitbit-ace-kids-activity-tracker.jsp'
    },
    {
      name: 'Nintendo Switch Console & Joy-Con Controller Set with Bonus Interworks Controller',
      price: '339.99',
      image: 'https://media.kohlsimg.com/is/image/kohls/3239600',
      url: 'https://www.KOHLS.com/product/prd-3239600/nintendo-switch-console-joy-con-controller-set-with-bonus-interworks-controller.jsp'
    }
  ],
  async getter(url, proxy) {
    const options = {};
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const html = await res.text()
    const $ = cheerio.load(html);
    let jsData = {}
    try {
      jsData = JSON.parse(html.split('var productV2JsonData = ')[1].split(';</script>')[0])
    } catch {}
    let name, price, image

    name = $('.product-title').text().trim()

    price = $('meta[itemprop="price"]').first().attr('content')

    image = (jsData?.images[0]?.url || '').split('?')[0]

    return { name, price, image }
  }
}