module.exports = company => {
  return `
    State: ${company.state}, 
    City: ${company.city}, 
    Company: ${company.name}, 
    Business since: ${company.since},
    MC Number: ${company.mc},
    Phone: ${company.phone},
    Fax: ${company.fax}
  `
};