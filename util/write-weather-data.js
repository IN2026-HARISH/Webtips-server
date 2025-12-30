const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');

function writeWeatherDetails () {
  return new Promise((resolve, reject) => {
    const worker = fork(path.join(__dirname, '../child/weather-worker.js'));

    worker.send('GET_WEATHER');

    worker.on('message', (data) => {
      const dataDir = path.join(__dirname, '..', 'data');
      const filePath = path.join(dataDir, 'data.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      worker.kill();
      resolve();
    });

    worker.on('error', reject);
  });
}

module.exports = {
  writeWeatherDetails
};
