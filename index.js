module.exports = async (url, proxy) => {
  for (let i = 0; i < sites.length; i++)
    for (let j = 0; j < sites[i].URLs.length; j++)
      if (sites[i].URLs[j].test(url)) {
        const data = await sites[i].getter(url, proxy);
        data.name = data.name.trim();
        return data;
      }
};

const sites = [
  {
    URLs: [
      /^https:\/\/www\.amazon\.com\/([a-z0-9-]*\/)?dp\/[a-z0-9]*\/?.*$/i,
      /^https?:\/\/a\.co\/.\/[a-z0-9]*\/? *$/i
    ],
    getter: require('./sites/amazon')
  },
  {
    URLs: [
      /^https:\/\/www\.bestbuy\.com\/site\/[a-z0-9-]*\/\d*\.p\/?(\?skuId=\d*)?\/?$/i
    ],
    getter: require('./sites/bestbuy')
  },
  {
    URLs: [
      /^https:\/\/www\.christmastreeshops\.com\/[a-z0-9-]*\/p\/\d*\/?$/i
    ],
    getter: require('./sites/christmasTreeShopsAndThat')
  },
  {
    URLs: [
      /^https:\/\/www\.ebay\.com\/(itm|p)\/[a-z0-9-]*\/\d*\/?(\?.*)?$/i
    ],
    getter: require('./sites/ebay')
  },
  {
    URLs: [
      /^https:\/\/www\.gamestop\.com\/[a-z0-9-]*\/([a-z0-9-]*\/)?[a-z0-9-]*\/\d*\/?$/i
    ],
    getter: require('./sites/gameStop')
  },
  {
    URLs: [
      /^https:\/\/express\.google\.com(\/u\/0)?\/product\/([a-z0-9-]*\/)?\w*\/?(\?.*)?$/i
    ],
    getter: require('./sites/googleExpress')
  },
  {
    URLs: [
      /^https:\/\/www\.kitchenandcompany\.com\/[a-z0-9-]*\/?$/i
    ],
    getter: require('./sites/kitchenAndCompany')
  },
  {
    URLs: [
      /^https:\/\/www\.kohls\.com\/product\/prd-\d*\/?([a-z0-9-]*\.jsp)?\/?(\?.*)?$/i
    ],
    getter: require('./sites/kohls')
  },
  {
    URLs: [
      /^https:\/\/www\.macys\.com\/shop\/product\/[a-z0-9-]*\/?(\?.*)?$/i
    ],
    getter: require('./sites/macys')
  },
  {
    URLs: [
      /^https:\/\/www\.newegg\.com\/Product\/Product\.aspx\?Item=[a-z0-9](&.*)?\/?/i
    ],
    getter: require('./sites/newegg')
  },
  {
    URLs: [
      /^https:\/\/www\.target\.com\/p\/([a-z0-9-]*\/)?-\/A-\d*(\?.*)?$/i
    ],
    getter: require('./sites/target')
  },
  {
    URLs: [
      /^https?:\/\/www\.walmart\.com\/ip\/[a-z0-9-]*\/\d*(\?.*)?\/?$/i
    ],
    getter: require('./sites/walmart')
  }
];
