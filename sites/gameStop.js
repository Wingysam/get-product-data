const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'GameStop',
  URLs: [
    /^https:\/\/(www\.)?gamestop\.com\/.*$/i
  ],
  testCases: [
    {
      name: 'Nintendo Switch with Neon Blue and Neon Red Joy-Con',
      price: '269.99',
      image: 'https://media.gamestop.com/i/gamestop/10141887',
      url: 'https://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/153583'
    },
    {
      name: 'Xbox Series X',
      price: '499.99',
      image: 'https://media.gamestop.com/i/gamestop/11108371',
      url: 'https://GAMESTOP.com/video-games/xbox-series-x/consoles/products/xbox-series-x/11108371.html'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.88 Safari/537.36 Vivaldi/2.4.1488.36'
      }
    };
    if (proxy) options.agent = new HttpsProxyAgent(require('url').parse(proxy));
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`);
    const html = await res.text()
    let name, price, image

    const data = JSON.parse(html.split('<script type="application/ld+json">')[1].split('</script>')[0])
    
    name = data.name
    price = data.offers[0]?.price
    image = `https://media.gamestop.com/i/gamestop/${data.url.split('/').reverse()[0].replace('.html', '')}`

    return { name, price, image }
  }
}