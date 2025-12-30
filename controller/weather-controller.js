const { timeForOneCity} = require('../util/time-zone');
const { getWeatherData } = require('../util/get-weather');
const { writeWeatherDetails } = require('../util/write-weather-data');
const fs = require('fs');
const path = require('path');

const getWeatherDetails = async (req, res) => {
  const data = getWeatherData()
  res.status(200).json(data)
}

const getCityTimeDetails = async (req, res) => {
  const { city } = req.query
  const result = timeForOneCity(city)
  res.status(200).json(result)
}

const sendDataFile = async (req, res) => {
  writeWeatherDetails();
  if(fs.existsSync(path.join(__dirname, '..', 'data', 'data.json'))){
    res.sendFile(path.join(__dirname, '..', 'data', 'data.json'));
  } else {
    res.status(500).json({ error: 'Data file not found' });
  }
}

module.exports = {
  getWeatherDetails,
  getCityTimeDetails,
  sendDataFile,
}
