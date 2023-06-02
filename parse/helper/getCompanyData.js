const cheerio = require('cheerio');
const axios = require('axios');

module.exports  = async (pageUrl, state, city) => {
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
    fax, 
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
    const since = el.join().includes('since');

    if(since) {
      validData.since = Number(bigData[i + 1]);
    };

    if(el == 'MC Number') {
      validData.mc = Number(bigData[i + 1]);
    }
  })

  return validData;
};

// const url = 'https://www.quicktransportsolutions.com/truckingcompany/alabama/cdm-carriers-llc-usdot-3339678.php';
// const url = 'https://www.quicktransportsolutions.com/truckingcompany/idaho/slim-chance-transportation-usdot-1264572.php';