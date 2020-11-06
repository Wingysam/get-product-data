const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Bing - Shopping',
  URLs: [
    /^https?:\/\/(www\.)?bing\.com\/shop\/productpage.*$/i
  ],
  testCases: [
    {
      name: "Steak Sampler Gift Boxed Set With 3 Classic Cuts From Kansas City Steaks. An Exception Grill-Lover's Gift",
      price: '$149.85',
      image: 'https://th.bing.com/th?id=OP.BSMQKVh1kYyFtw474C474&w=400&h=400&o=5&pid=21.1',
      url: 'https://www.bing.com/shop/productpage?q=Gifts+for+men&filters=scenario%3A%22GenericShopExpansion%22+gType%3A%22OfferId64%22+gId%3A%2239299133240%22+gIdHash%3A%220%22+gGlobalOfferIds%3A%2239299133240%22+AucContextGuid%3A%22458539C4DC364BE9B64FE40C14C50CFC%22+GroupEntityId%3A%2239299133240%22+NonSponsoredOffer%3A%22False%22&productpage=true&FORM=SHPSHR&shtp=GetUrl&shid=ab9a31cc-cbb8-4629-a65c-c8e04c563072&shth=OSH.7xREo2e7BpX7ijGdTz0cBw'
    },
    {
      name: "Same Day Gift Baskets - Everyone's Favorite Candy Basket - Regular",
      price: '$35.99',
      image: 'https://th.bing.com/th?id=OP.0yGKaj6o%2bjlcSQ474C474&w=400&h=400&o=5&pid=21.1',
      url: 'https://www.bing.com/shop/productpage?q=Gifts+for+men&filters=scenario%3A%22GenericShopExpansion%22+gType%3A%22OfferId64%22+gId%3A%221452500929%22+gIdHash%3A%220%22+gGlobalOfferIds%3A%221452500929%22+AucContextGuid%3A%22458539C4DC364BE9B64FE40C14C50CFC%22+GroupEntityId%3A%221452500929%22+NonSponsoredOffer%3A%22False%22&productpage=true&FORM=SHPSHR&shtp=GetUrl&shid=ab9a31cc-cbb8-4629-a65c-c8e04c563072&shth=OSH.%252FUEgzO46LK8OTseusYdyiQ'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)

    const html = await res.text()
    const $ = cheerio.load(html)

    const name = $('.br-pdTtl').first().text().trim()

    const price = $('.br-pdPrice').first().text().trim()

    const image = $('.pcc-img > .cico > .rms_img').first().attr('src')

    return { name, price, image }
  }
}
