const fs = require('fs'); 

const getPagesNumber = require('./helper/getPegesNumber.js'); 
const getPagesLinks = require('./helper/getPagesLinks.js');  
const getCompanyData = require('./helper/getCompanyData.js');

// const STATE_CITIES = ["alachua","alford","altamonte","altamonte-springs","altha","altoona","alturas","alva"];
const STATE_CITIES = ["alachua"];
const CURRENT_STATE = 'florida';

const parse = async () => {
  for(city of STATE_CITIES) {
    const paginationUrls = await getPagesNumber(CURRENT_STATE, city);    

    for (pageUrl of paginationUrls) {
      const pagesLinks = await getPagesLinks(pageUrl);

      for (link of pagesLinks) {
        const data = await getCompanyData(link, CURRENT_STATE, city);        

        fs.appendFile(`../states/${CURRENT_STATE}/${city}.json`, JSON.stringify(data), err => {
          if (err) console.error(err); 
        });
      };
    };
  };
};

parse();