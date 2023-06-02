const cheerio = require('cheerio');
const axios = require('axios');

module.exports  = async (pageUrl) => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  };

  const $ = await getHTML(pageUrl);

  const pagesLinks = [];
  
  $('.well')
    .each((i, el) => {
      const foundMC = ($(el).find('.initialism').text());
      if(foundMC === 'USDOTMC') {
        const foundLink = ($(el).find('a').attr("href"))
        pagesLinks.push(foundLink);
      }
    });
  
  return pagesLinks;
};