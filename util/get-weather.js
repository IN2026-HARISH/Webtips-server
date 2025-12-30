const { allTimeZones, nextNhoursWeather } = require('../util/time-zone');

function getWeatherData () {
    const  rawData = allTimeZones();
    const formattedData = {};

  rawData.forEach(entry => {
    const key = entry.cityName.toLowerCase();

    const tempClean = entry.temperature
      .replace(/<[^>]+>/g, '')
      .replace(/&#176;/g, '')
      .replace('C', '°C')
      .trim();

    const windSpeed = `${Math.floor(Math.random() * 96 + 5)}km/hr`;

    const cityTdn = `${entry.dateAndTime}, ${entry.cityName}`;
    const forecast = nextNhoursWeather(cityTdn, 5, rawData);
    forecast.temperature.forEach((temp, index) => {
        const cleanedTemp = temp
            .replace(/<[^>]+>/g, '')
            .replace(/&#176;/g, '')
            .replace('C', '°C')
            .trim();
        forecast.temperature[index] = cleanedTemp;
    });

    const nextFiveHrs = forecast.temperature.map(temp =>
        temp.replace(/<[^>]+>/g, '').replace(/&#176;/g, '')
    );

    formattedData[key] = {
      cityName: entry.cityName,
      dateAndTime: entry.dateAndTime,
      timeZone: entry.timeZone,
      temperature: tempClean,
      humidity: entry.humidity,
      windSpeed,
      precipitation: entry.precipitation,
      nextFiveHrs
    };
  });

  return formattedData;
}

module.exports = {
  getWeatherData
};
