const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'GOAT',
  URLs: [
    /^https:\/\/www.goat.com\/.*\/.*$/i
  ],
  testCases: [
    {
      name: "Air Jordan 1 Retro High OG 'Crimson Tint'",
      price: '$149',
      image: 'https://image.goat.com/1000/attachments/product_template_pictures/images/020/249/059/original/485842_00.png.png',
      url: 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-crimson-tint-555088-081?_branch_match_id=722603302568876625'
    },
    {
      name: "Air Jordan 1 Retro High OG 'Bloodline'",
      price: '$150',
      image: 'https://image.goat.com/1000/attachments/product_template_pictures/images/028/182/432/original/508079_00.png.png',
      url: 'https://www.GOaT.com/sneakers/air-jordan-1-high-retro-og-bred-2019-555088-062'
    },
    {
      name: "Sk8-Hi 'I Heart Vans'",
      price: '$70',
      image: 'https://image.goat.com/1000/attachments/product_template_pictures/images/022/436/551/original/VN0A38GEVP5.png.png',
      url: 'https://www.goat.com/sneakers/sk8-hi-i-heart-vans-vn0a38gevp5'
    },
    {
      name: 'Sk8-Hi Custom iD',
      price: 'Sold Out',
      image: 'https://image.goat.com/1000/attachments/product_template_pictures/images/018/064/320/original/VANS_SK8HI_ID.png.png',
      url: 'https://www.goat.com/sneakers/sk8-hi-custom-id-vans-sk8hi-id'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const html = await res.text()
    const $ = cheerio.load(html)
    if ($('title').text() === 'Access to this page has been denied.') throw new Error('Got CAPTCHA')
    const ldJson = JSON.parse($('script[type="application/ld+json"]').html())
    const context = JSON.parse(html.split('window.__context__ = ')[1].split('</script>')[0])

    const name = ldJson.name

    let price = '$' + context.default_store['product-templates'].slug_map[Object.keys(context.default_store['product-templates'].slug_map)[0]].new_lowest_price_cents / 100
    if (!price) price = $('[data-qa="pdp-out-of-stock-cta-text"]').text().trim()
    if (!price) price = undefined
    if (price === '$0') price = 'Sold Out'

    const image = ldJson.image

    return { name, price, image }
  }
}
