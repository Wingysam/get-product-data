const fs = require('fs').promises
const { URL } = require('url')

const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const fetch = require('node-fetch')

module.exports = {
  name: 'Amazon',
  URLs: [
    /^https?:\/\/((www|smile)\.)?amazon\.(com|ca|cn|fr|de|co\.uk)\/([a-z0-9-]*\/)?(d|g)p\/[a-z0-9]*\/?.*$/i,
    /^https:\/\/.*\/dp\/.*$/i,
    /^https?:\/\/a\.co\/.\/[a-z0-9]*\/? *$/i
  ],
  testCases: [
    {
      name: 'Mini Supermarket Handcart, Shopping Cart Shopping Utility Cart Mode Desk Storage Toy Holder Desk Accessory, Color Random',
      price: '$7.99',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61rnQnTcrFL._AC_SX679_.jpg',
      url: 'https://www.amazon.com/Supermarket-Handcart-Shopping-Utility-Accessory/dp/B0722KTW4T/ref=sr_1_8?ie=UTF8'
    },
    {
      name: 'Cube Thing',
      price: undefined,
      image: 'https://images-na.ssl-images-amazon.com/images/I/41w5MjnQEBL.png',
      url: 'https://www.AMAZON.com/Luke-Foreman-Cube-Thing/dp/B00NG84JV4/ref=sr_1_7?ie=UTF8'
    },
    {
      name: 'Echo Dot (2nd Generation) - Smart speaker with Alexa - Black',
      price: 'Currently unavailable.',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61U8ScEenhL._AC_SX679_.jpg',
      url: 'http://a.co/d/7WpDUNl '
    },
    {
      name: 'Seagate BarraCuda 4TB Internal Hard Drive HDD – 3.5 Inch Sata 6 Gb/s 5400 RPM 256MB Cache for Computer Desktop PC Laptop (ST4000DM004)',
      price: undefined,
      image: 'https://images-na.ssl-images-amazon.com/images/I/71ijXHv0jHL._AC_SX679_.jpg',
      url: 'http://A.co/d/3Ed7AM1'
    },
    {
      name: 'Fluent Forever: How to Learn Any Language Fast and Never Forget It',
      price: '$13.99',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51fn1hvM1lL._SX329_BO1,204,203,200_.jpg',
      url: 'https://smile.amazon.com/Fluent-Forever-Learn-Language-Forget/dp/0385348118/ref=sr_1_2?keywords=languages&qid=1573661891&smid=ATVPDKIKX0DER&sr=8-2'
    },
    {
      name: 'KitchenAid KSM150PSAQ Artisan Series Stand Mixer with Pouring Shield, Aqua Sky, 5 Quart',
      price: 'Currently unavailable.',
      image: 'https://images-na.ssl-images-amazon.com/images/I/713gHNUbMML._AC_SX679_.jpg',
      url: 'https://www.amazon.ca/gp/product/B005PMEHBG/ref=s9_acss_bw_cg_test_1a1_w?pf_rd_m=A1IM4EOPHS76S7&pf_rd_s=merchandised-search-2&pf_rd_r=TENVD03KH8MGBFCX8DVJ&pf_rd_t=101&pf_rd_p=aec53367-fe2b-44c0-9980-052d9245050b&pf_rd_i=20510796011'
    },
    {
      name: '神秘瞬间 | Ylang Ylang 香精油 - 100ml',
      price: '￥90.79',
      image: 'https://images-cn.ssl-images-amazon.cn/images/I/81fewD5wEML._AC_SX679_.jpg',
      url: 'https://www.amazon.cn/dp/B0062J987Y?ref_=Oct_DLandingSV2_PC_aeaf0f6a_0&smid=A3TEGLC21NOO5Y'
    },
    {
      name: 'Ordinateur de Bureau - HP ProDesk 600 G1 SFF - Core i3-4130 @ 3,4 GHz - 16Go RAM - 250Go SSD - Win10Home (Reconditionné Certifié)',
      price: '215,00\u00A0€', // NBSP, because amazon.fr has bad devs (/s, please hire me amazon)
      image: 'https://images-na.ssl-images-amazon.com/images/I/61OnhDfflkL._AC_SX679_.jpg',
      url: 'https://www.amazon.fr/gp/product/B072HFFYLY/ref=s9_acsd_al_bw_c_x_1_w?pf_rd_m=A1X6FK5RDHNB96&pf_rd_s=merchandised-search-5&pf_rd_r=FJHXSPN9Y7E2HC9330BS&pf_rd_t=101&pf_rd_p=5893066b-6531-4786-8bdc-89f2c73b08f3&pf_rd_i=17327958031'
    },
    {
      name: 'JAGETRADE 1Pc Mini Bamboo Saucer Succulent Planter Pot Flower Container Bonsai Tray Holder',
      price: '6,08\u00A0€', // another nbsp, maybe in all eu?
      image: 'https://images-na.ssl-images-amazon.com/images/I/61I4sADyxfL._AC_SX679_.jpg',
      url: 'https://www.amazon.de/dp/B07M5WQQWJ/ref=bbp_bb_01a411_st_HCHe_w_0?language=de_DE&psc=1&smid=A318R3EKXK1CC6'
    },
    {
      name: 'Nintendo Switch 本体 (ニンテンドースイッチ) Joy-Con(L) ネオンブルー/(R) ネオンレッド',
      price: '￥40,800',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61gtkPQtgrL._AC_SX679_.jpg',
      url: 'https://www.amazon.co.jp/Nintendo-Switch-%E3%83%8B%E3%83%B3%E3%83%86%E3%83%B3%E3%83%89%E3%83%BC%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81-%E3%83%8D%E3%82%AA%E3%83%B3%E3%83%96%E3%83%AB%E3%83%BC-%E3%83%90%E3%83%83%E3%83%86%E3%83%AA%E3%83%BC%E6%8C%81%E7%B6%9A%E6%99%82%E9%96%93%E3%81%8C%E9%95%B7%E3%81%8F%E3%81%AA%E3%81%A3%E3%81%9F%E3%83%A2%E3%83%87%E3%83%AB/dp/B07WXL5YPW?pf_rd_p=cc17c435-35f6-5801-aeae-5c1f4efad58f&pf_rd_r=ZWHMBEX0G0J3SMQREZJ1&pd_rd_wg=nFk5E&ref_=pd_gw_ri&pd_rd_w=DZ9JX&pd_rd_r=7651edd6-f314-4af9-8e76-4f37cc17ab19'
    },
    {
      name: 'Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal Fabric',
      price: '£39.99',
      image: 'https://images-na.ssl-images-amazon.com/images/I/616NfcPi-zL._AC_SX679_.jpg',
      url: 'https://www.amazon.co.uk/dp/B07PJV3JPR/ref=gw_uk_desk_h1_aucc_cr_TPR15_q4_vac_1119?pf_rd_p=87afd799-1703-462f-b5c5-76c1bef4cec3&pf_rd_r=RM025RV2F7EPFKR29MFA'
    }
  ],
  async getter (url, proxy) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }
    }
    if (proxy) options.agent = new HttpsProxyAgent(new URL(proxy))
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Res not ok. Status: ${res.status} ${res.statusText}`)
    const html = await res.text()
    if (process.env.GPD_AMAZON_HTML) await fs.writeFile(process.env.GPD_AMAZON_HTML, html)
    let name, price, image
    const $ = cheerio.load(html)

    if (!name) name = $('#productTitle').text().trim()
    if (!name) name = $('h1#mas-atf-product-title > span > span').text().trim()

    if (!price) price = $('#priceblock_saleprice').text().trim()
    if (!price) price = $('#priceblock_ourprice').text().trim()
    if (!price) price = $('#availability > .a-size-medium.a-color-price').text().trim()
    if (!price) price = $('#formats .a-button-inner .a-color-secondary > span').first().text().trim()

    try {
      if (!image) {
        image =
        Object.entries(
          JSON.parse(
            $('img#landingImage').attr('data-a-dynamic-image')
          )
        )
          .sort((a, b) => b[1][0] - a[1][0])[0][0]
      }
    } catch (_) {}
    try {
      if (!image) image = $('img#js-masrw-main-image').attr('src')
    } catch (_) {}
    try {
      if (!image) {
        image =
        Object.entries(
          JSON.parse(
            $('#main-image-container img').attr('data-a-dynamic-image')
          )
        )
          .sort((a, b) => b[1][0] - a[1][0])[0][0]
      }
    } catch (_) {}

    // I think Amazon uses RNG or something to decide if you get a CAPTCHA.
    if ($('form[action="/errors/validateCaptcha"]').length) return module.exports.getter(url, proxy)

    if (!name) name = undefined
    if (!price) price = undefined
    if (!image) image = undefined

    return { name, price, image }
  }
}
