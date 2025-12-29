const express = require('express');
const { getWeatherDetails } = require('./controller/weather-controller');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Weather API');
});
app.get('/getData', getWeatherDetails)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});