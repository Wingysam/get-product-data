const puppeteer = require('puppeteer');

module.exports = async (url, proxy) => {
  const options = {};
  if (proxy) options.args = [
    `--proxy-server=${proxy}`
  ];
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(url);
  const name = await page.$eval('h1.title', element => {
    return element.textContent;
  });
  await browser.close();
  return { name };
};
