const cheerio = require('cheerio');
const axios = require('axios');

module.exports = t = async (pageUrl, state, city) => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  };

  const $ = await getHTML(pageUrl);

  const tinyData = $('address').text();
  
  const phone = tinyData.match(/\d{3}.\d{3}.\d{4}/g)[0];
  const fax = tinyData.match(/\d{3}.\d{3}.\d{4}/g)[1];
  const name = tinyData.split('\n').filter(el => el !== '')[0];

  const validData = {
    state,
    city,
    name,
    phone,
    fax: fax ? fax : null, 
    mc: null,
    since: null,
  }

  const bigData = [];

  $('td').each((_, el) => {
    const data = $(el).text();
    const dataArr = data.split('\n').filter(el => el !== '');
    bigData.push(dataArr);
  });

  bigData.forEach((el, i) => {
    const companySince = el.join().includes('since');

    if(companySince) {
      const since = bigData[i + 1][0];
      const year = since.slice(0, 4);
      const month = since.slice(4, 6);
      const day = since.slice(6, 8);

      validData.since = `${day}.${month}.${year}`;
    };

    if(el == 'MC Number') {
      validData.mc = bigData[i + 1][0];
    };
  });

  return validData;
};