const express = require('express');
const { getWeatherDetails, sendDataFile } = require('./controller/weather-controller');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/getData', getWeatherDetails);
app.get('/getfile', sendDataFile);

app.get('/', (req, res) => {
    console.log("server reached")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((req, res) => {
  res.status(404).json({ error: 'Invalid request' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});