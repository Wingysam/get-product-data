module.exports = async (url, proxy) => {
  for (let i = 0; i < sites.length; i++)
    for (let j = 0; j < sites[i].URLs.length; j++)
      if (sites[i].URLs[j].test(url)) {
        const data = await sites[i].getter(url, proxy);
        data.name = data.name.trim();
        return data;
      }
};

const sites = require('./sitesArray');