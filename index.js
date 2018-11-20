module.exports = async url => {
  for (let i = 0; i < sites.length; i++) {
    for (let j = 0; j < sites[i].URLs.length; j++) {
      if (sites[i].URLs[j].test(url)) {
        return await sites[i].getter(url);
      }
    }
  }
};

const sites = [
  {
    URLs: [
      /^https:\/\/www\.amazon\.com\//i
    ],
    getter: require('./sites/amazon')
  },
  {
    URLs: [
      /^https:\/\/www\.bestbuy\.com\/site\//i
    ],
    getter: require('./sites/bestbuy')
  },
  {
    URLs: [
      /^https:\/\/www\.ebay\.com\/itm\//i
    ],
    getter: require('./sites/ebay')
  },
  {
    URLs: [
      /^https:\/\/www\.kohls\.com\/product\/prd-/i
    ],
    getter: require('./sites/kohls')
  },
  {
    URLs: [
      /^https:\/\/www\.macys\.com\/shop\/product\//i
    ],
    getter: require('./sites/macys')
  },
  {
    URLs: [
      /^https:\/\/www\.newegg\.com\/Product\/Product\.aspx\?Item=/i
    ],
    getter: require('./sites/newegg')
  },
  {
    URLs: [
      /^https:\/\/www\.target\.com\/p\//i
    ],
    getter: require('./sites/target')
  },
  {
    URLs: [
      /^https:\/\/www\.walmart\.com\/ip\//i
    ],
    getter: require('./sites/walmart')
  }
];