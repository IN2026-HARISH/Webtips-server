const { getWeatherData } = require('../util/get-weather');

process.on('message', (msg) => {
    if(msg === 'GET_WEATHER') {
        const data = getWeatherData();
        process.send(data);
    }
})