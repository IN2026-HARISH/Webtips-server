const fs = require('fs');
const path = require('path');
const { getWeatherData } = require('./get-weather');


function writeWeatherDetails () {
  const data = getWeatherData()
  
  const dataDir = path.join(__dirname, '..', 'data');
  const filePath = path.join(dataDir, 'data.json');

  if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log('Weather data written to data/data.json');

}

module.exports = {
  writeWeatherDetails
};