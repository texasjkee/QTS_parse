const cheerio = require('cheerio');
const axios = require('axios');

module.exports = async (state, city) => {
  const getHTML = async (url) => {
    const {data} = await axios.get(url);
    return cheerio.load(data);
  }

  const allCityCompanies = [];

  const cityUrlfirstPage =`https://www.quicktransportsolutions.com/carrier/${state}/${city}.php`
  allCityCompanies.push(cityUrlfirstPage)

  const $ = await getHTML(cityUrlfirstPage) 

  const pagination = $('.pagination').text().split('');
  const numberPagnation = pagination.map(el => +el).filter(el => el === Number(el))

  for(let i = 2; i <= numberPagnation.length; ++i) {
    const cityURLotherPage= `${cityUrlfirstPage}?page=${i}` 
    allCityCompanies.push(cityURLotherPage)
  }
  
  return allCityCompanies;
};