const https = require('https');
require('dotenv').config();

function colombianCovidInfoGetter(filter) {

  (function() {
    const options = {
      headers: {},
    };
    
    options.headers['X-App-Token'] = process.env.API_KEY;
    
    let promiseArray = [];
    
    for(let i = 0; i<80; i++) {
      let parsedData = [];
      promiseArray.push(
        new Promise((resolve, reject) => {
          https.get(`https://www.datos.gov.co/resource/gt2j-8ykr.json?$offset=${i}000`, {options}, res => {
            
            let data = '';
            res.on('data', (chunk) => {
                data+=chunk;
            });
            
            res.on('end', () => {
              parsedData = JSON.parse(data)
            });
          }).on('close', () => {
            resolve(parsedData);
          });
        })
      );
    };
  
    return Promise.all(promiseArray)
  })()
    .then(data => {
      let superDuperArray = [];
      data.forEach( e => {
        superDuperArray = [...superDuperArray, ...Object.values(e)]
      })

      console.log(superDuperArray.length);
    });
  

};

colombianCovidInfoGetter()
